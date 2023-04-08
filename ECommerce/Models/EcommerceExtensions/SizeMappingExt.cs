using ECommerce.Data.Products;
using ECommerce.Models.Ecommerce;

namespace ECommerce.Models.EcommerceExtensions
{
    public static class SizeMappingExt
    {
        public static IEnumerable<SizeMappingDto> GetSizeMappingDtos(this ICollection<SizeMapping> sizeMappings)
        {
            return sizeMappings.Select(i => new SizeMappingDto()
            {
                ProductId = i.ProductId,
                Quantity = i.Quantity,
                SizeId = i.SizeId,
                SizeMappingId = i.SizeMappingId,
                SizeName = i.Size.SizeName
            });
        }
    }
}
