using ECommerce.Data.Products;
using ECommerce.Models.EcommerceExtensions;
using Microsoft.AspNet.Identity;
using Microsoft.AspNetCore.Hosting;
using System.ComponentModel.DataAnnotations.Schema;
using System.Security.Claims;
using System.Web;

namespace ECommerce.Models.Ecommerce
{
    public partial class Product
    {
        [NotMapped]
        public virtual ICollection<Favourite> Favorites { get; set; }

        [NotMapped]
        public bool IsFavourite { get; set; }
    }

    public static class ProductExt
    {
        public static bool IsFavorite(this ICollection<Favourite> favourites,ClaimsPrincipal claimsPrincipal)
        {
            return favourites != null && favourites.Any(i => i.UserId == claimsPrincipal.Identity.GetUserId());
        }

        public static IQueryable<ProductDto> GetProductDtos(this IQueryable<Product> products, 
            ClaimsPrincipal claimsPrincipal, ProductFilters filters=null)
        {
            var noImage = @"D:\project\ECommerce\ECommerce\ClientApp\src\images\no-image.png";
            byte[] bytes = System.IO.File.ReadAllBytes(noImage);

            var productDtoList = products.Select(i => new ProductDto()
            {
                ProductId = i.ProductId,
                BrandId = i.BrandId,
                CategoryId = i.CategoryId,
                IndividualCategoryId = i.IndividualCategoryId,
                Description = i.Description,
                OriginalPrice = i.OriginalPrice,
                FinalPrice = i.FinalPrice,
                Rating = i.Rating,
                Reviews = i.Reviews,
                Url = i.Url,
                BrandName = i.Brand.BrandName,
                CategoryName = i.Category.CategoryName,
                IndividualCategoryName = i.IndividualCategory.IndividualCategoryName,
                IsFavourite= i.Favorites.IsFavorite(claimsPrincipal),
                Photo= bytes,
                SizeMappings=i.SizeMappings.GetSizeMappingDtos()
            });

            if(filters != null)
            {
                var productDtos = productDtoList.Where(i => false);
                if (filters.PriceRange.Count() > 0)
                {
                    if (filters.PriceRange.Contains("0-500"))
                    {
                        productDtos = productDtos.Union(productDtoList.Where(i => i.FinalPrice >= 0 && i.FinalPrice < 500));
                    }

                    if (filters.PriceRange.Contains("500-1000"))
                    {
                        productDtos = productDtos.Union(productDtoList.Where(i => i.FinalPrice >= 500 && i.FinalPrice < 1000));
                    }

                    if (filters.PriceRange.Contains("1000-5000"))
                    {
                        productDtos = productDtos.Union(productDtoList.Where(i => i.FinalPrice >= 1000 && i.FinalPrice < 5000));
                    }

                    if (filters.PriceRange.Contains("5000-10000"))
                    {
                        productDtos = productDtos.Union(productDtoList.Where(i => i.FinalPrice >= 5000 && i.FinalPrice < 10000));
                    }

                    if (filters.PriceRange.Contains("10000-15000"))
                    {
                        productDtos = productDtos.Union(productDtoList.Where(i => i.FinalPrice >= 10000 && i.FinalPrice < 15000));
                    }

                    if (filters.PriceRange.Contains("15000-50000"))
                    {
                        productDtos = productDtos.Union(productDtoList.Where(i => i.FinalPrice >= 15000 && i.FinalPrice < 50000));
                    }
                }
                else
                {
                    productDtos = productDtoList;
                }

                #region brand filter
                if (filters.BrandIds.Count() > 0)
                {
                    productDtos = productDtos.Where(i => filters.BrandIds.Contains(i.BrandId));
                }
                #endregion

                #region category filter
                if (filters.CategoryIds.Count() > 0)
                {
                    productDtos = productDtos.Where(i => filters.CategoryIds.Contains(i.CategoryId));
                }
                #endregion

                #region individual category filter
                if (filters.IndividualCategoryIds.Count() > 0)
                {
                    productDtos = productDtos.Where(i => filters.IndividualCategoryIds.Contains(i.IndividualCategoryId));
                }
                #endregion

                #region sorting
                if (filters.SortOrder == "asc")
                {
                    switch (filters.SortBy)
                    {
                        case "Description":
                            productDtos = productDtos.OrderBy(i => i.Description).AsQueryable(); break;
                        case "Price":
                            productDtos = productDtos.OrderBy(i => i.FinalPrice).AsQueryable(); break;
                        case "Brand":
                            productDtos = productDtos.OrderBy(i => i.BrandName).AsQueryable(); break;
                        case "Category":
                            productDtos = productDtos.OrderBy(i => i.CategoryName).AsQueryable(); break;
                        case "IndividualCategory":
                            productDtos = productDtos.OrderBy(i => i.IndividualCategoryName).AsQueryable(); break;
                        default:
                            productDtos = productDtos.OrderBy(i => i.Description); break;
                    }
                }
                else
                {
                    switch (filters.SortBy)
                    {
                        case "Description":
                            productDtos = productDtos.OrderByDescending(i => i.Description).AsQueryable(); break;
                        case "Price":
                            productDtos = productDtos.OrderByDescending(i => i.FinalPrice).AsQueryable(); break;
                        case "Brand":
                            productDtos = productDtos.OrderByDescending(i => i.BrandName).AsQueryable(); break;
                        case "Category":
                            productDtos = productDtos.OrderByDescending(i => i.CategoryName).AsQueryable(); break;
                        case "IndividualCategory":
                            productDtos = productDtos.OrderByDescending(i => i.IndividualCategoryName).AsQueryable(); break;
                        default:
                            productDtos = productDtos.OrderByDescending(i => i.Description); break;
                    }
                }
                #endregion
                
                return productDtos;
            }

            return productDtoList;
        }

        public static ProductDto GetProductDto(this Product product,ClaimsPrincipal claimsPrincipal)
        {
            var productDto = new ProductDto()
            {
                ProductId = product.ProductId,
                BrandId = product.BrandId,
                CategoryId = product.CategoryId,
                IndividualCategoryId = product.IndividualCategoryId,
                Description = product.Description,
                OriginalPrice = product.OriginalPrice,
                FinalPrice = product.FinalPrice,
                Rating = product.Rating,
                Reviews = product.Reviews,
                Url = product.Url,
                BrandName = product.Brand.BrandName,
                CategoryName = product.Category.CategoryName,
                IndividualCategoryName = product.IndividualCategory.IndividualCategoryName,
                IsFavourite = product.Favorites.IsFavorite(claimsPrincipal)
            };

            return productDto;
        }

    }
}
