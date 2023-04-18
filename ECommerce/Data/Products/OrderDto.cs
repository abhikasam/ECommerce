using ECommerce.Data.Account;

namespace ECommerce.Data.Products
{
    public class OrderDto
    {
        public int OrderId { get; set; }
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string ProductName { get; set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        public DateTime PlacedOn { get; set; }
    }

    public class OrderItem
    {
        public string Date { get; set; }
    
        public List<OrderInstanceItem> OrderInstances { get; set; }
    }

    public class OrderInstanceItem
    {
        public int InstanceId { get; set; }
        public int UserId { get; set; }
        public string UserName { get; set; }
        public List<ProductDto> Products { get; set; }
    }
}
