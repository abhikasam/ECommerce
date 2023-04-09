using ECommerce.Models.Ecommerce;

namespace ECommerce.Data.Products
{
    public class ProductQuantityDto
    {
        public int ProductQuantityId { get; set; }
        public int ProductId { get; set; }
        public int SizeId { get; set; }
        public int Quantity { get; set; }
        public string SizeName { get; set; }
    }
}
