using ECommerce.Data.Products;
using ECommerce.Models.Ecommerce;

namespace ECommerce.Models.EcommerceExtensions
{
    public static class ProductQuantityExt
    {
        public static IEnumerable<ProductQuantityDto> GetSizeMappingDtos(this ICollection<ProductQuantity> productQuantities)
        {
            return productQuantities.Select(i => new ProductQuantityDto()
            {
                ProductId = i.ProductId,
                Quantity = i.Quantity,
                SizeId = i.SizeId,
                ProductQuantityId = i.ProductQuantityId,
                SizeName = i.Size.SizeName
            });
        }
    }
}
