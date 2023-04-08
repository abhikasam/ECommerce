using ECommerce.Models.Ecommerce;

namespace ECommerce.Data.Products
{
    public class FavouriteDto
    {
        public int FavouriteId { get; set; }
        public int ProductId { get; set; }
        public string UserId { get; set; }
        public DateTime AddedOn { get; set; }
        public ProductDto Product { get; set; }
    }
}
