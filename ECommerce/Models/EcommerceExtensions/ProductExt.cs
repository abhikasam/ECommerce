using ECommerce.Data.Products;
using ECommerce.Models.EcommerceExtensions;
using Microsoft.AspNet.Identity;
using Microsoft.AspNetCore.Hosting;
using System.ComponentModel.DataAnnotations.Schema;
using System.Security.Claims;
using System.Web;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

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
        public static Cart GetCart(this ICollection<Cart> carts,ClaimsPrincipal claimsPrincipal)
        {
            return carts != null ? carts.FirstOrDefault(i=>i.UserId==claimsPrincipal.Identity.GetUserId()) : null;
        }
        public static bool IsFavorite(this ICollection<Favourite> favourites,ClaimsPrincipal claimsPrincipal)
        {
            return favourites != null && favourites.Any(i => i.UserId == claimsPrincipal.Identity.GetUserId());
        }

        public static IQueryable<ProductDto> GetProductDtos(this IQueryable<Product> products, 
            ClaimsPrincipal claimsPrincipal, ProductFilters filters=null)
        {
            var noImage = @"D:\project\ECommerce\ECommerce\ClientApp\src\images\no-image.png";
            byte[] bytes = System.IO.File.ReadAllBytes(noImage);

            var hasPriceRangesFilers = filters != null && filters.PriceRanges.Count() > 0;
            var filteredProducts = products.Where(i => !hasPriceRangesFilers );
            if (hasPriceRangesFilers)
            {
                if (filters.PriceRanges.Contains("0-500"))
                {
                    filteredProducts = filteredProducts.Union(products.Where(i => i.FinalPrice >= 0 && i.FinalPrice < 500));
                }

                if (filters.PriceRanges.Contains("500-1000"))
                {
                    filteredProducts = filteredProducts.Union(products.Where(i => i.FinalPrice >= 500 && i.FinalPrice < 1000));
                }

                if (filters.PriceRanges.Contains("1000-5000"))
                {
                    filteredProducts = filteredProducts.Union(products.Where(i => i.FinalPrice >= 1000 && i.FinalPrice < 5000));
                }

                if (filters.PriceRanges.Contains("5000-10000"))
                {
                    filteredProducts = filteredProducts.Union(products.Where(i => i.FinalPrice >= 5000 && i.FinalPrice < 10000));
                }

                if (filters.PriceRanges.Contains("10000-15000"))
                {
                    filteredProducts = filteredProducts.Union(products.Where(i => i.FinalPrice >= 10000 && i.FinalPrice < 15000));
                }

                if (filters.PriceRanges.Contains("15000-50000"))
                {
                    filteredProducts = filteredProducts.Union(products.Where(i => i.FinalPrice >= 15000 && i.FinalPrice < 50000));
                }
            }

            #region search
            if (filters!=null && filters.Search.Length > 0)
            {
                var keywords = filters.Search.Split(new string[] { " " }, StringSplitOptions.RemoveEmptyEntries);
                //var searchFilteredProducts = filteredProducts.Where(i => keywords.Length == 0);

                //foreach (var keyword in keywords)
                //{
                //    searchFilteredProducts = searchFilteredProducts.Union(filteredProducts.Where(i => i.Description.Contains(keyword)));
                //}

                //filteredProducts = searchFilteredProducts;

                var searchFilters = filteredProducts.Select(i => new
                {
                    Product = i,
                    Matched = 0
                });

                foreach(var keyword in keywords)
                {
                    searchFilters = (from i in searchFilters
                                     let isMatched = EF.Functions.Like(i.Product.Description, "%" + keyword + "%")
                                     select new
                                     {
                                         Product = i.Product,
                                         Matched = i.Matched + (isMatched?1:0)
                                     });
                }

                filteredProducts = searchFilters
                    .Where(i => i.Matched > 0)
                    .OrderByDescending(i => i.Matched)
                    .Select(i => i.Product);        
            }
            #endregion


            var productDtos = filteredProducts.Select(i => new ProductDto()
            {
                ProductId = i.ProductId,
                BrandId = i.BrandId,
                CategoryId = i.CategoryId,
                IndividualCategoryId = i.IndividualCategoryId,
                Description = i.Description.ToLower(),
                OriginalPrice = i.OriginalPrice,
                FinalPrice = i.FinalPrice,
                Quantity= i.Quantity,
                Rating = i.Rating,
                Reviews = i.Reviews,
                Url = i.Url,
                BrandName = i.Brand.BrandName,
                CategoryName = i.Category.CategoryName,
                IndividualCategoryName = i.IndividualCategory.IndividualCategoryName,
                IsFavourite= i.Favorites.IsFavorite(claimsPrincipal),
                CartItem=i.Carts.GetCart(claimsPrincipal).GetCartDto(),
                Photo= i.Photo??bytes,
                ProductQuantities =i.ProductQuantities.GetSizeMappingDtos()
            });

            if(filters != null)
            {
                #region brand filter
                if (filters.Brands.Count() > 0)
                {
                    productDtos = productDtos.Where(i => filters.Brands.Contains(i.BrandId));
                }
                #endregion

                #region category filter
                if (filters.Categories.Count() > 0)
                {
                    productDtos = productDtos.Where(i => filters.Categories.Contains(i.CategoryId));
                }
                #endregion

                #region individual category filter
                if (filters.IndividualCategories.Count() > 0)
                {
                    productDtos = productDtos.Where(i => filters.IndividualCategories.Contains(i.IndividualCategoryId));
                }
                #endregion

                #region sorting
                if (filters.SortOrder.Equals("asc",StringComparison.InvariantCultureIgnoreCase))
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
                        case "Search":
                            break;
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
                        case "Search":
                            break;
                    }
                }
                #endregion
                
                return productDtos;
            }

            return productDtos;
        }

        public static ProductDto GetProductDto(this Product product,ClaimsPrincipal claimsPrincipal)
        {
            var noImage = @"D:\project\ECommerce\ECommerce\ClientApp\src\images\no-image.png";
            byte[] bytes = System.IO.File.ReadAllBytes(noImage);
            var productDto = new ProductDto()
            {
                ProductId = product.ProductId,
                BrandId = product.BrandId,
                CategoryId = product.CategoryId,
                IndividualCategoryId = product.IndividualCategoryId,
                Description = product.Description,
                OriginalPrice = product.OriginalPrice,
                FinalPrice = product.FinalPrice,
                Quantity= product.Quantity,
                Rating = product.Rating,
                Reviews = product.Reviews,
                Photo= product.Photo??bytes,
                Url = product.Url,
                BrandName = product.Brand.BrandName,
                CategoryName = product.Category.CategoryName,
                IndividualCategoryName = product.IndividualCategory.IndividualCategoryName,
                IsFavourite = product.Favorites.IsFavorite(claimsPrincipal),
                CartItem=product.Carts.GetCart(claimsPrincipal).GetCartDto(),
                ProductQuantities=product.ProductQuantities.GetSizeMappingDtos()
            };

            return productDto;
        }

    }
}
