using ECommerce.Data;
using ECommerce.Data.Account;
using ECommerce.Data.Products;
using ECommerce.Data.Shared;
using ECommerce.Models;
using ECommerce.Models.Ecommerce;
using ECommerce.Models.EcommerceExtensions;
using Microsoft.AspNet.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;

namespace ECommerce.Controllers.Products
{
    [Route("[controller]")]
    [ApiController]
    [Authorize]
    public class CartController : ControllerBase
    {
        private readonly EcommerceContext ecommerceContext;
        private readonly ILogger<CartController> _logger;
        private readonly IConfiguration configuration;
        private readonly IOptions<ProductFilters> filters;
        private readonly Microsoft.AspNetCore.Identity.UserManager<User> userManager;

        public CartController(EcommerceContext ecommerceContext,
            ILogger<CartController> logger,
            IConfiguration configuration,
            IOptions<ProductFilters> filters,
            Microsoft.AspNetCore.Identity.UserManager<User> userManager)
        {
            this.ecommerceContext = ecommerceContext;
            _logger = logger;
            this.configuration = configuration;
            this.filters = filters;
            this.userManager = userManager;
        }

        [HttpGet]
        public JsonResult Get(int pageNumber=1,bool getAll=false)
        {
            var message = new ResponseMessage();
            try
            {
                var currentUserId = this.User.GetUserId();
                var products=ecommerceContext.Carts
                                    .Include(i => i.Product).DefaultIfEmpty()
                                    .Include(i => i.Product).ThenInclude(i => i.Brand).DefaultIfEmpty()
                                    .Include(i => i.Product).ThenInclude(i => i.Category).DefaultIfEmpty()
                                    .Include(i => i.Product).ThenInclude(i => i.IndividualCategory).DefaultIfEmpty()
                                    .Include(i => i.Product).ThenInclude(i => i.ProductQuantities).ThenInclude(i => i.Size)
                                    .Where(i => i.UserId == currentUserId)
                                    .OrderByDescending(i => i.UpdatedOn)
                                    .Select(i => i.Product).GetProductDtos(this.User);

                var productCount = this.filters.Value.ProductCount;

                if (getAll)
                {
                    message.Data = products;
                }
                else
                {
                    message.Data = products.PaginateData(pageNumber, productCount);
                }
            }
            catch (Exception ex)
            {
                if (getAll)
                {
                    message.Data = Array.Empty<ProductDto>();
                }
                else
                {
                    message.Data=new PaginatedList<ProductDto>();
                }
                message.Message = ex.Message;
                message.StatusCode = ResponseStatus.ERROR;
            }
            return new JsonResult(message);
        }

        [HttpGet("{id}")]
        [Route("[action]")]
        [ActionName("ProductCarts")]
        public async Task<JsonResult> ProductCarts(int productId, int pageNumber = 1)
        {
            var message = new ResponseMessage();
            int productCount = 50;

            try
            {
                var userIds = await ecommerceContext.Carts
                                    .Where(i => i.ProductId == productId)
                                    .OrderByDescending(i=>i.UpdatedOn)
                                    .Select(i => i.UserId)
                                    .ToListAsync();

                var userDetails = new List<UserDetails>();

                foreach (var id in userIds)
                {
                    var usr = await userManager.FindByUserIdAsync(id);
                    var claims = await userManager.GetClaimsAsync(usr);
                    userDetails.Add(UserDetails.GetDetails(claims));
                }

                message.Data = userDetails.AsQueryable().PaginateData(pageNumber, productCount);
                message.StatusCode = ResponseStatus.SUCCESS;
            }
            catch (Exception ex)
            {
                message.Data = new PaginatedList<UserDetails>();
                message.Message = ex.Message;
                message.StatusCode = ResponseStatus.EXCEPTION;
            }
            return new JsonResult(message);
        }

        [HttpPost]
        [Route("[action]")]
        [ActionName("Update")]
        public async Task<IActionResult> Update([FromBody]object obj)
        {
            var message=new ResponseMessage();
            try
            {
                var currentUserId = this.User.GetUserId();
                var cartItem = JsonConvert.DeserializeObject<Cart>(obj.ToString());
                var dbCartItem = ecommerceContext.Carts
                                .Where(i => i.ProductId == cartItem.ProductId && i.UserId == currentUserId);

                if(dbCartItem.Any())
                {
                    ecommerceContext.Carts.Remove(dbCartItem.First());
                }
                else
                {
                    cartItem.UserId = currentUserId;
                    cartItem.UpdatedOn = DateTime.Now;
                    ecommerceContext.Carts.Add(cartItem);
                }

                await ecommerceContext.SaveChangesAsync();

                var product = ecommerceContext.Products
                    .Include(i => i.Brand)
                    .Include(i => i.Category)
                    .Include(i => i.IndividualCategory)
                    .Include(i => i.Favorites)
                    .Include(i => i.Carts)
                    .Where(i => i.ProductId == cartItem.ProductId);

                message.Data = product.First().GetProductDto(this.User);
                message.Message = "Updated Successfully.";
                message.StatusCode = ResponseStatus.SUCCESS;
            }
            catch (Exception ex)
            {
                message.Data = new ProductDto();
                message.Message = ex.Message;
                message.StatusCode = ResponseStatus.ERROR;
            }
            return new JsonResult(message);
        }


    }
}
