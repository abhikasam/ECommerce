﻿using ECommerce.Models.Ecommerce;
using ECommerce.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Microsoft.EntityFrameworkCore;
using ECommerce.Data;
using Microsoft.IdentityModel.Tokens;
using ECommerce.Data.Account;

namespace ECommerce.Controllers.Products
{
    [Route("[controller]")]
    [ApiController]
    [Authorize]
    public class OrdersController : ControllerBase
    {
        private readonly EcommerceContext ecommerceContext;

        private readonly ILogger<OrdersController> _logger;
        private readonly IConfiguration configuration;
        private readonly Microsoft.AspNetCore.Identity.UserManager<User> userManager;

        public OrdersController(EcommerceContext ecommerceContext, ILogger<OrdersController> logger, IConfiguration configuration, Microsoft.AspNetCore.Identity.UserManager<User> userManager)
        {
            this.ecommerceContext = ecommerceContext;
            _logger = logger;
            this.configuration = configuration;
            this.userManager = userManager;
        }

        [HttpGet]
        public async Task<JsonResult> Get()
        {
            var message = new ResponseMessage();

            try
            {
                var orders = ecommerceContext.Orders
                                    .Include(i => i.Product).ThenInclude(i => i.Brand).DefaultIfEmpty()
                                    .Include(i => i.Product).ThenInclude(i => i.Category).DefaultIfEmpty()
                                    .Include(i => i.Product).ThenInclude(i => i.IndividualCategory).DefaultIfEmpty()
                                    .Include(i => i.Product).ThenInclude(i => i.ProductQuantities).ThenInclude(i => i.Size)
                                    .Include(i => i.Product).ThenInclude(i => i.Carts).DefaultIfEmpty();

                if (!this.User.Claims.Any(i => i.Type == "Admin"))
                {
                    orders = orders.Where(i => i.UserId == this.User.Identity.GetUserId());
                }

                orders = orders.OrderByDescending(i => i.ProductId);

                var paginatedOrders = orders.PaginateData(1, 50);

                var orderDtos = await paginatedOrders.GetOrderDtos(userManager,this.User);
                message.Data = orderDtos;
            }
            catch (Exception ex)
            {
                message.Message = ex.Message;
                message.StatusCode = ResponseStatus.EXCEPTION;
            }
            return new JsonResult(message);
        }

        [HttpPost]
        [Route("[action]")]
        [ActionName("place")]
        public async Task<IActionResult> Post([FromBody] object obj)
        {
            var message = new ResponseMessage();
            try
            {
                var orderItems = JsonConvert.DeserializeObject<Order[]>(obj.ToString());

                var currentUserId = this.User.Identity.GetUserId();

                var orderedProducts = orderItems.Select(i => i.ProductId).ToArray();

                var products = await ecommerceContext.Products
                            .Where(i => orderedProducts.Contains(i.ProductId))
                            .ToListAsync();

                var orderInstanceId = ecommerceContext.Orders.Select(i => i.OrderInstanceId).Max();

                if (products.Count() != orderedProducts.Length)
                {
                    var notFoundProducts = products.Where(p => !orderedProducts.Contains(p.ProductId)).Select(i => i.ProductId);
                    orderItems.ToList().RemoveAll(x => notFoundProducts.Contains(x.ProductId));
                }

                var productNotAvailables = products.Where(i => orderItems.Any(o => o.ProductId == i.ProductId && o.Quantity > i.Quantity));
                if (productNotAvailables.Any())
                {
                    var incorrectProducts = productNotAvailables.Select(i => i.ProductId).ToList();
                    orderItems.ToList().RemoveAll(x => incorrectProducts.Contains(x.ProductId));
                }

                if (orderItems.Length > 0)
                {
                    orderItems.ToList().ForEach(o =>
                    {
                        o.UserId = currentUserId;
                        o.OrderInstanceId = orderInstanceId + 1;
                        o.PlacedOn = DateTime.Now;
                    });

                    await ecommerceContext.Orders.AddRangeAsync(orderItems);

                    var cartItems = await ecommerceContext.Carts.Where(i => i.UserId == currentUserId && orderedProducts.Contains(i.ProductId)).ToListAsync();
                    ecommerceContext.Carts.RemoveRange(cartItems);

                    foreach (var product in products)
                    {
                        product.Quantity = product.Quantity - orderItems.Where(i => i.ProductId == product.ProductId).First().Quantity;
                    }

                    await ecommerceContext.SaveChangesAsync();
                }

                message.Data = orderItems.Select(i => i.ProductId);
                message.Message = "Products ordered";
                message.StatusCode = ResponseStatus.SUCCESS;
            }
            catch (Exception ex)
            {
                message.Message = ex.Message;
                message.StatusCode = ResponseStatus.EXCEPTION;
            }
            return new JsonResult(message);
        }
    }
}
