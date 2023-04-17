namespace ECommerce.Data.Products
{
    public class CartDto
    {
        public int CartItemId { get; set; }
        public int ProductId { get; set; }
        public string UserId { get; set; }
        public DateTime UpdatedOn { get; set; }
    }
}
