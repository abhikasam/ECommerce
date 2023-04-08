using ECommerce.Models.Ecommerce;

namespace ECommerce.Data.Products
{
    public class SizeMappingDto
    {
        public int SizeMappingId { get; set; }
        public int ProductId { get; set; }
        public int SizeId { get; set; }
        public int Quantity { get; set; }
        public string SizeName { get; set; }
    }
}
