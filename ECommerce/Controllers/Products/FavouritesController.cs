using ECommerce.Models.Ecommerce;
using ECommerce.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNet.Identity;
using ECommerce.Data.Authentication;
using Newtonsoft.Json;
using ECommerce.Models.EcommerceExtensions;
using Microsoft.Extensions.Options;
using ECommerce.Data.Products;
using ECommerce.Data;
using Microsoft.AspNetCore.Authorization;
using ECommerce.Data.Account;
using ECommerce.Data.Shared;

namespace ECommerce.Controllers.Products
{
    [Route("[controller]")]
    [ApiController]
    [Authorize]
    public class FavouritesController : ControllerBase
    {
        private readonly EcommerceContext ecommerceContext;

        private readonly ILogger<FavouritesController> _logger;
        private readonly IConfiguration configuration;
        private readonly IOptions<ProductFilters> filters;
        private readonly Microsoft.AspNetCore.Identity.UserManager<User> userManager;

        public FavouritesController(EcommerceContext ecommerceContext, ILogger<FavouritesController> logger, IConfiguration configuration, IOptions<ProductFilters> filters, Microsoft.AspNetCore.Identity.UserManager<User> userManager)
        {
            this.ecommerceContext = ecommerceContext;
            _logger = logger;
            this.configuration = configuration;
            this.filters = filters;
            this.userManager = userManager;
        }

        [HttpGet]
        public JsonResult Get(int? pageNumber = null)
        {
            pageNumber = pageNumber ?? 1;
            var message = new ResponseMessage();

            try
            {
                var userId = this.User.GetUserId();
                var products = ecommerceContext.Favourites
                                    .Include(i=>i.Product).DefaultIfEmpty()
                                    .Include(i => i.Product).ThenInclude(i => i.Brand).DefaultIfEmpty()
                                    .Include(i => i.Product).ThenInclude(i => i.Category).DefaultIfEmpty()
                                    .Include(i => i.Product).ThenInclude(i => i.IndividualCategory).DefaultIfEmpty()
                                    .Include(i=>i.Product).ThenInclude(i => i.ProductQuantities).ThenInclude(i => i.Size)
                                    .Include(i=>i.Product).ThenInclude(i=>i.Carts).DefaultIfEmpty()
                                    .Where(i => i.UserId == userId)
                                    .OrderByDescending(i => i.AddedOn)
                                    .Select(i => i.Product).GetProductDtos(this.User);

                
                var productCount = this.filters.Value.ProductCount;

                message.Data = products.PaginateData(pageNumber.Value, productCount);
            }
            catch (Exception ex)
            {
                message.Data = new 
                {
                    Result=Array.Empty<ProductDto>(),
                    TotalPages=1,
                    PageNumber=1
                };
                message.Message = ex.Message;
                message.StatusCode = ResponseStatus.EXCEPTION;
            }
            return new JsonResult(message);
        }

        [HttpGet("{id}")]
        [Route("[action]")]
        [ActionName("ProductFavourites")]
        public async Task<JsonResult> ProductFavourites(int productId)
        {
            var message = new ResponseMessage();

            try
            {
                var product = await ecommerceContext.Products
                                .Include(i => i.Brand).DefaultIfEmpty()
                                .Include(i => i.Category).DefaultIfEmpty()
                                .Include(i => i.IndividualCategory).DefaultIfEmpty()
                                .Include(i => i.Favorites).DefaultIfEmpty()
                                .Include(i => i.ProductQuantities).ThenInclude(i => i.Size).DefaultIfEmpty()
                                .Include(i => i.Carts)
                                .Where(i => i.ProductId == productId)
                                .FirstOrDefaultAsync();

                var userIds=await ecommerceContext.Favourites
                                    .Where(i => i.ProductId == productId)
                                    .Select(i=> i.UserId)
                                    .ToListAsync();

                var userDetails=new List<UserDetails>();

                foreach(var id in userIds)
                {
                    var usr = await userManager.FindByUserIdAsync(id);
                    var claims = await userManager.GetClaimsAsync(usr);
                    userDetails.Add(UserDetails.GetDetails(claims));
                }

                message.Data = new
                {
                    UserDetails= userDetails,
                    Product=product.GetProductDto(this.User)
                };
                message.StatusCode=ResponseStatus.SUCCESS;
            }
            catch(Exception ex)
            {
                message.Message= ex.Message;
                message.StatusCode = ResponseStatus.EXCEPTION;
            }
            return new JsonResult(message);
        }

        [HttpPost]
        [Route("[action]")]
        [ActionName("Add")]
        public async Task<JsonResult> AddFavourite([FromBody] object obj)
        {
            var message = new ResponseMessage();
            try
            {
                var productId = JsonConvert.DeserializeObject<int>(obj.ToString());
                var userId = this.User.GetUserId();
                var product = ecommerceContext.Products
                                    .Include(i => i.Brand)
                                    .Include(i => i.Category)
                                    .Include(i => i.IndividualCategory)
                                    .Include(i => i.Favorites)
                                    .Include(i=>i.Carts)
                                    .Where(i => i.ProductId == productId);
                if (!product.Any())
                {
                    message.Message = "Product not found to add to favourites.";
                    message.StatusCode = ResponseStatus.ERROR;
                    return new JsonResult(message);
                }
                else if (ecommerceContext.Favourites.Any(i => i.ProductId == productId && i.UserId == userId))
                {
                    message.Message = "Product already added to favourites.";
                    message.StatusCode = ResponseStatus.ERROR;
                    return new JsonResult(message);
                }
                else
                {
                    var favourite = new Favourite()
                    {
                        ProductId = productId,
                        UserId = userId,
                        AddedOn = DateTime.Now
                    };
                    await ecommerceContext.Favourites.AddAsync(favourite);
                    await ecommerceContext.SaveChangesAsync();
                    message.Message = "Added to favourites.";

                    message.Data = product.First().GetProductDto(this.User);
                    message.StatusCode = ResponseStatus.SUCCESS;
                    return new JsonResult(message);

                }
            }
            catch (Exception ex)
            {
                message.Data = new ProductDto();
                message.Message = ex.Message;
                message.StatusCode = ResponseStatus.EXCEPTION;
            }
            return new JsonResult(message);
        }

        [HttpPost]
        [Route("[action]")]
        [ActionName("Remove")]
        public async Task<JsonResult> RemoveFavourite([FromBody] object obj)
        {
            var message = new ResponseMessage();
            try
            {
                var productId = JsonConvert.DeserializeObject<int>(obj.ToString());

                var userId = this.User.GetUserId();
                var favourite = ecommerceContext.Favourites.Where(i => i.ProductId == productId && i.UserId == userId);
                if (!favourite.Any())
                {
                    message.Message = "Product not found to remove from favourites.";
                    message.StatusCode = ResponseStatus.ERROR;
                    return new JsonResult(message);
                }
                else
                {
                    ecommerceContext.Favourites.Remove(favourite.First());
                    await ecommerceContext.SaveChangesAsync();
                    message.Message = "Removed from favourites.";
                    message.StatusCode = ResponseStatus.SUCCESS;
                    return new JsonResult(message);

                }
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