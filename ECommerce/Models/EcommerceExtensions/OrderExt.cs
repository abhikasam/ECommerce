using ECommerce.Data;
using ECommerce.Data.Account;
using ECommerce.Data.Products;
using Microsoft.AspNetCore.Identity;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.EntityFrameworkCore;
using OfficeOpenXml.Style;
using System.Security.Claims;

namespace ECommerce.Models.Ecommerce
{
    public partial class Order
    {
    }

    public static class OrderExt
    {
        public static async Task<List<OrderItem>> GetOrderDtos(
            this IQueryable<Order> orders,
            UserManager<User> userManager,
            int? productId=null,
            string dateFilter=null,
            int[] filterUsers=null)
        {

            if (filterUsers!=null && filterUsers.Count() > 0)
            {
                orders = orders.Where(i => filterUsers.Contains(i.UserId));
            }

            if(productId!=null)
            {
                orders = orders.Where(i => i.ProductId == productId);
            }

            if(dateFilter!=null)
            {
                var dates=dateFilter.Split('-');
                var startDate = dates[0].Split('/');
                var endDate = dates[1].Split('/');

                if (startDate[0] != "dd")
                {
                    var day = Convert.ToInt32(startDate[0]);
                    orders = orders.Where(i => i.PlacedOn.Date.Day >= day);
                }

                if (startDate[1] != "MM")
                {
                    var month = Convert.ToInt32(startDate[1]);
                    orders = orders.Where(i => i.PlacedOn.Date.Month >= month+1);
                }

                if (startDate[2] != "yy")
                {
                    var year = Convert.ToInt32(startDate[2]);
                    orders = orders.Where(i => i.PlacedOn.Date.Year >= year);
                }
                if (endDate[0] != "dd")
                {
                    var day = Convert.ToInt32(endDate[0]);
                    orders = orders.Where(i => i.PlacedOn.Date.Day <= day);
                }

                if (endDate[1] != "MM")
                {
                    var month = Convert.ToInt32(endDate[1]);
                    orders = orders.Where(i => i.PlacedOn.Date.Month <= month+1);
                }

                if (endDate[2] != "yy")
                {
                    var year = Convert.ToInt32(endDate[2]);
                    orders = orders.Where(i => i.PlacedOn.Date.Year <= year);
                }
            }

            var allOrderedDates = orders.Select(i => i.PlacedOn.Date).Distinct().ToList();

            var orderItems = new List<OrderItem>();

            foreach (var date in allOrderedDates.OrderByDescending(i=>i))
            {
                var currentDateOrders = orders.Where(i => i.PlacedOn.Date == date).OrderByDescending(i=>i.PlacedOn).ToList();

                var orderItem = new OrderItem() 
                { 
                    Date=date.ToLongDateString(),
                    OrderInstances=new List<OrderInstanceItem>()
                };

                var instances=currentDateOrders.Select(i=>i.OrderInstanceId).Distinct().ToList();

                var orderInstances = new List<OrderInstanceItem>();
                foreach (var instance in instances)
                {
                    var currentInstances = currentDateOrders.Where(i => i.OrderInstanceId == instance);
                    var currentInstanceFirstOrderItem = currentInstances.FirstOrDefault();

                    var user = await userManager.FindByUserIdAsync(currentInstanceFirstOrderItem.UserId);
                    var claims = await userManager.GetClaimsAsync(user);

                    var orderInstance = new OrderInstanceItem()
                    {
                        InstanceId=instance,
                        UserId= currentInstanceFirstOrderItem.UserId,
                        UserName=Utilities.GetFullName(claims),
                        Products=new List<ProductDto>()
                    };

                    foreach (var order in currentInstances)
                    {
                        var productDto = order.Product.GetProductDto();
                        productDto.Quantity = order.Quantity;
                        productDto.SizeId = order.SizeId;
                        productDto.SizeName = order.Size.SizeName;
                        orderInstance.Products.Add(productDto);
                    }

                    orderInstances.Add(orderInstance);
                }

                orderItem.OrderInstances = orderInstances;
                orderItems.Add(orderItem);
            }

            return orderItems;
        }
    }

}
