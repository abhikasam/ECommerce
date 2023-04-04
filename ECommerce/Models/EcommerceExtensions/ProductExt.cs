using ECommerce.Data.Products;

namespace ECommerce.Models.Ecommerce
{
    public partial class Product { }

    public static class ProductExt
    {
        public static IEnumerable<ProductDto> GetProductDtos(this List<Product> products)
        {
            return products.Select(i => new ProductDto()
            {
                ProductId = i.ProductId,
                BrandId = i.BrandId,
                CategoryId = i.CategoryId,
                IndividualCategoryId = i.IndividualCategoryId,
                Description = i.Description,
                OriginalPrice = i.OriginalPrice,
                Discount = i.Discount,
                Rating = i.Rating,
                Reviews = i.Reviews,
                SizeOptions = i.SizeOptions,
                Url = i.Url,
                BrandName = i.Brand.BrandName,
                CategoryName = i.Category.CategoryName,
                IndividualCategoryName = i.IndividualCategory.IndividualCategoryName
            });
        }
    }
}
