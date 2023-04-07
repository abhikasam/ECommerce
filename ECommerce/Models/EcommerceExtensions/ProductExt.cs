﻿using ECommerce.Data.Products;
using ECommerce.Models.EcommerceExtensions;
using Microsoft.AspNetCore.Hosting;

namespace ECommerce.Models.Ecommerce
{
    public partial class Product { }

    public static class ProductExt
    {
        public static IQueryable<ProductDto> GetProductDtos(this IQueryable<Product> products,ProductFilters filters)
        {
            var productDtos = products.Select(i => new ProductDto()
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
                SizeOptions = i.SizeOptions,
                Url = i.Url,
                BrandName = i.Brand.BrandName,
                CategoryName = i.Category.CategoryName,
                IndividualCategoryName = i.IndividualCategory.IndividualCategoryName
            });

            #region brand filter
            if(filters.BrandIds.Count() > 0)
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

        public static IQueryable<ProductDto> PaginateData(this IQueryable<ProductDto> products,int pageNumber,int pageSize)
        {
            var totalRecords =products.Count();

            var skip = (pageNumber - 1) * pageSize;
            var take = pageSize;

            return products.Skip(skip).Take(take);
        }

    }
}
