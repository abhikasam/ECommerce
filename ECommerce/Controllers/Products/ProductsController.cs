﻿using ECommerce.Models;
using ECommerce.Data;
using ECommerce.Data.Authentication;
using ECommerce.Data.Products;
using ECommerce.Models.Ecommerce;
using ECommerce.Models.EcommerceExtensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Microsoft.AspNet.Identity;

namespace ECommerce.Controllers.Products
{
    [Authorize]
    [Route("[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly EcommerceContext ecommerceContext;
        private readonly ILogger<ProductsController> _logger;
        private readonly IConfiguration configuration;
        private readonly IOptions<ProductFilters> filters;

        public ProductsController(EcommerceContext ecommerceContext, 
            ILogger<ProductsController> logger,
            IConfiguration configuration,
            IOptions<ProductFilters> filters)
        {
            this.ecommerceContext = ecommerceContext;
            _logger = logger;
            this.configuration = configuration;
            this.filters = filters;
        }

        [HttpGet]
        public JsonResult Get(
            int? productCount,
            int? pageNumber,
            string sortBy,
            string sortOrder, 
            string brands=null,
            string categories=null,
            string priceRanges=null,
            string individualCategories=null)
        {
            var message = new ResponseMessage();
            try
            {
                productCount = productCount ?? this.filters.Value.ProductCount;
                pageNumber= pageNumber ?? this.filters.Value.PageNumber;
                sortBy = sortBy ?? this.filters.Value.SortBy;
                sortOrder = sortOrder ?? this.filters.Value.SortOrder;
                var priceRangeFilters = new string[] { };
                if(!string.IsNullOrWhiteSpace(priceRanges))
                {
                    priceRangeFilters=priceRanges.Split(',');
                }

                var filters = new ProductFilters()
                {
                    ProductCount=productCount.Value,
                    PageNumber=pageNumber.Value,
                    SortBy=sortBy,
                    SortOrder=sortOrder,
                    BrandIds= Utilities.GetArray(brands,","),
                    CategoryIds=Utilities.GetArray(categories,","),
                    IndividualCategoryIds=Utilities.GetArray(individualCategories,","),
                    PriceRange=priceRangeFilters
                };

                var products = ecommerceContext.Products
                                .Include(i => i.Brand).DefaultIfEmpty()
                                .Include(i => i.Category).DefaultIfEmpty()
                                .Include(i => i.IndividualCategory).DefaultIfEmpty()
                                .Include(i=>i.Favorites).DefaultIfEmpty()
                                .Include(i=>i.ProductQuantities).ThenInclude(i=>i.Size).DefaultIfEmpty();


                var productDtos = products.GetProductDtos(this.User, filters);

                var totalRecords=productDtos.Count();
                var totalPages=(totalRecords+filters.ProductCount)/filters.ProductCount;

                message.Data = new
                {
                    Result=productDtos.PaginateData(filters.PageNumber,filters.ProductCount),
                    TotalPages=totalPages,
                    PageNumber=filters.PageNumber,
                    Filters=filters
                };
            }
            catch (Exception ex)
            {
                message.Message = ex.Message;
                message.StatusCode = ResponseStatus.EXCEPTION;
            }
            return new JsonResult(message);
        }

        [HttpPost]
        public async Task<JsonResult> Post([FromBody]object obj)
        {
            var message = new ResponseMessage();
            try
            {
                var product = JsonConvert.DeserializeObject<Product>(obj.ToString());

                if(!ModelState.IsValid)
                {
                    message.Message = string.Join("; ", ModelState.Values
                                            .SelectMany(x => x.Errors)
                                            .Select(x => x.ErrorMessage));
                    message.StatusCode = ResponseStatus.ERROR;
                    return new JsonResult(message);
                }
                else
                {
                    product.Quantity=product.ProductQuantities.Sum(x => x.Quantity);
                    product.Available = product.Quantity;

                    product.FinalPrice = product.FinalPrice ?? product.OriginalPrice;

                    await ecommerceContext.Products.AddAsync(product);
                    await ecommerceContext.SaveChangesAsync();

                    message.Message = "Product added successfully." + Environment.NewLine + "You will be redirected to Products Page.";
                    message.StatusCode = ResponseStatus.SUCCESS;
                }
            }
            catch(Exception ex)
            {
                message.Message = ex.Message;
                message.StatusCode = ResponseStatus.EXCEPTION;
            }
            return new JsonResult(message);
        }




    }
}
