using ECommerce.Models;
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
using ECommerce.Data.Shared;

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
            string search,
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
                search=search??string.Empty;

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
                    Search=search,
                    Brands= brands.GetArray(","),
                    Categories= categories.GetArray(","),
                    IndividualCategories= individualCategories.GetArray(","),
                    PriceRanges=priceRangeFilters
                };

                var products = ecommerceContext.Products
                                .Include(i => i.Brand).DefaultIfEmpty()
                                .Include(i => i.Category).DefaultIfEmpty()
                                .Include(i => i.IndividualCategory).DefaultIfEmpty()
                                .Include(i=>i.Favorites).DefaultIfEmpty()
                                .Include(i=>i.ProductQuantities).ThenInclude(i=>i.Size).DefaultIfEmpty()
                                .Include(i=>i.Carts);


                var productDtos = products.GetProductDtos(this.User, filters);

                message.Data = new
                {
                    Products= productDtos.PaginateData(filters.PageNumber, filters.ProductCount),
                    Filters=filters
                };
            }
            catch (Exception ex)
            {
                message.Data = new {
                    Products= new PaginatedList<ProductDto>(productCount.GetValueOrDefault(0)),
                    Filters= new ProductFilters()
                };
                message.Message = ex.Message;
                message.StatusCode = ResponseStatus.EXCEPTION;
            }
            return new JsonResult(message);
        }


        [HttpGet]
        [Route("[action]")]
        [ActionName("OutOfStock")]
        public JsonResult GetOutOfStackProducts(int? productCount,int? pageNumber)
        {
            var message = new ResponseMessage();

            try
            {
                productCount = productCount ?? this.filters.Value.ProductCount;
                pageNumber=pageNumber?? this.filters.Value.PageNumber;  

                var products = ecommerceContext.Products
                                .Include(i => i.Brand).DefaultIfEmpty()
                                .Include(i => i.Category).DefaultIfEmpty()
                                .Include(i => i.IndividualCategory).DefaultIfEmpty()
                                .Include(i => i.Favorites).DefaultIfEmpty()
                                .Include(i => i.ProductQuantities).ThenInclude(i => i.Size).DefaultIfEmpty()
                                .Include(i => i.Carts)
                                .Where(i=>i.Quantity==0);

                var productDtos = products.GetProductDtos(this.User);

                message.Data=productDtos.PaginateData(pageNumber.Value, productCount.Value);
            }
            catch (Exception ex)
            {
                message.Data = new PaginatedList<ProductDto>(productCount.Value);
                message.Message = ex.Message;
                message.StatusCode = ResponseStatus.EXCEPTION;
            }
            return new JsonResult(message);
        }

        [HttpGet("{id}")]
        public JsonResult Get(int id)
        {
            var message = new ResponseMessage();
            try
            {
                var product = ecommerceContext.Products
                .Include(i => i.Brand).DefaultIfEmpty()
                .Include(i => i.Category).DefaultIfEmpty()
                .Include(i => i.IndividualCategory).DefaultIfEmpty()
                .Include(i => i.Favorites).DefaultIfEmpty()
                .Include(i => i.ProductQuantities).ThenInclude(i => i.Size).DefaultIfEmpty()
                .Include(i => i.Carts)
                .Where(i => i.ProductId == id)
                .FirstOrDefault();

                if (product == null)
                {
                    message.Message = "Product not found";
                    message.StatusCode = ResponseStatus.ERROR;
                }
                else
                {
                    message.Data= product.GetProductDto(this.User);
                }
            }
            catch (Exception ex)
            {
                message.Data = new ProductDto();
                message.Message=ex.Message;
                message.StatusCode=ResponseStatus.EXCEPTION;
            }
            return new JsonResult(message);
        }

        [HttpPost]
        public async Task<JsonResult> Post([FromBody] object obj)
        {
            var message = new ResponseMessage();
            try
            {
                var product = JsonConvert.DeserializeObject<Product>(obj.ToString());
                if (product.ProductId == 0)
                {
                    if (!ModelState.IsValid)
                    {
                        message.Message = string.Join("; ", ModelState.Values
                                                .SelectMany(x => x.Errors)
                                                .Select(x => x.ErrorMessage));
                        message.StatusCode = ResponseStatus.ERROR;
                        return new JsonResult(message);
                    }
                    else
                    {
                        product.Quantity = product.ProductQuantities.Sum(x => x.Quantity);
                        product.FinalPrice = product.FinalPrice ?? product.OriginalPrice;

                        await ecommerceContext.Products.AddAsync(product);
                        await ecommerceContext.SaveChangesAsync();

                        message.Message = "Product added successfully." + Environment.NewLine + "You will be redirected to Products Page.";
                        message.StatusCode = ResponseStatus.SUCCESS;
                    }
                }
                else
                {
                    var dbProduct = await ecommerceContext.Products
                        .Include(i => i.ProductQuantities).ThenInclude(i => i.Size)
                .FirstOrDefaultAsync(x => x.ProductId == product.ProductId);

                    if (dbProduct == null)
                    {
                        ModelState.AddModelError("", "Product not found.");
                    }

                    if (!ModelState.IsValid)
                    {
                        message.Message = string.Join("; ", ModelState.Values
                                                .SelectMany(x => x.Errors)
                                                .Select(x => x.ErrorMessage));
                        message.StatusCode = ResponseStatus.ERROR;
                        return new JsonResult(message);
                    }
                    else
                    {
                        dbProduct.BrandId = product.BrandId;
                        dbProduct.CategoryId = product.CategoryId;
                        dbProduct.IndividualCategoryId = product.IndividualCategoryId;
                        dbProduct.Description = product.Description;
                        dbProduct.OriginalPrice = product.OriginalPrice;
                        dbProduct.FinalPrice = product.FinalPrice;
                        dbProduct.Photo = product.Photo;

                        var existingProductSizes = dbProduct.ProductQuantities.Select(i => i.SizeId).ToList();
                        foreach (var productQuantity in product.ProductQuantities)
                        {
                            if (existingProductSizes.Contains(productQuantity.SizeId))
                            {
                                var dbProductQuantity = dbProduct.ProductQuantities.FirstOrDefault(x => x.SizeId == productQuantity.SizeId);
                                dbProductQuantity.Quantity = productQuantity.Quantity;
                            }
                            else
                            {
                                dbProduct.ProductQuantities.Add(productQuantity);
                            }
                        }

                        dbProduct.Quantity = product.ProductQuantities.Sum(x => x.Quantity);
                       
                        //dbProduct.FinalPrice = product.FinalPrice ?? product.OriginalPrice;

                        await ecommerceContext.SaveChangesAsync();

                        message.Message = "Product added successfully." + Environment.NewLine + "You will be redirected to Products Page.";
                        message.StatusCode = ResponseStatus.SUCCESS;
                    }
                }
            }
            catch (Exception ex)
            {
                message.Message = ex.Message;
                message.StatusCode = ResponseStatus.EXCEPTION;
            }
            return new JsonResult(message);
        }


        [HttpPost]
        [Route("[action]")]
        [ActionName("UpdateQuantities")]
        public async Task<JsonResult> UpdateQuantities([FromBody]object obj)
        {
            var message = new ResponseMessage();
            try
            {
                var productQuantities = JsonConvert.DeserializeObject<ProductQuantity[]>(obj.ToString());  

                foreach(var productQuantity in productQuantities)
                {
                    var dbProductQuantity=await ecommerceContext.ProductQuantities
                                .FirstOrDefaultAsync(i=>i.ProductId== productQuantity.ProductId && i.SizeId==productQuantity.SizeId);                    
                    dbProductQuantity.Quantity = productQuantity.Quantity;
                }

                var product = await ecommerceContext.Products.FindAsync(productQuantities.First().ProductId);
                product.Quantity = productQuantities.Sum(i=>i.Quantity);

                await ecommerceContext.SaveChangesAsync();
                message.Data = productQuantities.First().ProductId;
                message.StatusCode= ResponseStatus.SUCCESS;
            }
            catch (Exception ex)
            {
                message.Message = ex.Message;
                message.StatusCode = ResponseStatus.EXCEPTION;
            }
            return new JsonResult(message);
        }

    }
}
