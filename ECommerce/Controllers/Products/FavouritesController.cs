using ECommerce.Models.Ecommerce;
using ECommerce.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNet.Identity;
using ECommerce.Data.Authentication;
using Newtonsoft.Json;

namespace ECommerce.Controllers.Products
{
    [Route("[controller]")]
    [ApiController]
    public class FavouritesController : ControllerBase
    {
        private readonly EcommerceContext ecommerceContext;

        private readonly ILogger<FavouritesController> _logger;
        private readonly IConfiguration configuration;

        public FavouritesController(EcommerceContext ecommerceContext, ILogger<FavouritesController> logger, IConfiguration configuration)
        {
            this.ecommerceContext = ecommerceContext;
            _logger = logger;
            this.configuration = configuration;
        }

        [HttpGet]
        public async Task<JsonResult> Get()
        {
            var message = new ResponseMessage();

            try
            {
                var userId = this.User.Identity.GetUserId();
                var favourites = await ecommerceContext.Favourites
                                    .Where(i=>i.UserId==userId)
                                    .ToListAsync();
                message.Data = favourites;
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
        [ActionName("Add")]
        public async Task<JsonResult> AddFavourite([FromBody]object obj)
        {
            var message = new ResponseMessage();
            try
            {
                var productId = JsonConvert.DeserializeObject<int>(obj.ToString());
                var userId = this.User.Identity.GetUserId();
                if (!ecommerceContext.Products.Any(i=>i.ProductId==productId))
                {
                    message.Message = "Product not found to add to favourites.";
                    message.StatusCode = ResponseStatus.ERROR;
                    return new JsonResult(message);
                }
                else  if(ecommerceContext.Favourites.Any(i=>i.ProductId==productId && i.UserId == userId))
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
                    message.Data=favourite;
                    message.StatusCode = ResponseStatus.SUCCESS;
                    return new JsonResult(message);

                }
            }
            catch(Exception ex)
            {
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

                var userId=this.User.Identity.GetUserId();
                var favourite = ecommerceContext.Favourites.Where(i => i.ProductId == productId && i.UserId==userId);
                if (!favourite.Any())
                {
                    message.Message = "Product not found to remove from favourites.";
                    message.StatusCode = ResponseStatus.ERROR;
                    return new JsonResult(message);
                }
                else
                {   ecommerceContext.Favourites.Remove(favourite.First());
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