using ECommerce.Data.Shared;
using ECommerce.Models.Ecommerce;
using ECommerce.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNet.Identity;
using Newtonsoft.Json;
using ECommerce.Data;

namespace ECommerce.Controllers.Products
{
    [Route("[controller]")]
    [ApiController]
    [Authorize]
    public class UserProductFiltersController : ControllerBase
    {
        private readonly EcommerceContext ecommerceContext;

        private readonly ILogger<UserProductFiltersController> _logger;
        private readonly IConfiguration configuration;

        public UserProductFiltersController(EcommerceContext ecommerceContext, ILogger<UserProductFiltersController> logger, IConfiguration configuration)
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
                var userProductFilter = await ecommerceContext.UserProductFilters
                                    .Where(i=>i.UserId==this.User.GetUserId())
                                    .FirstOrDefaultAsync();
                message.Data = userProductFilter;
            }
            catch (Exception ex)
            {
                message.Data = Array.Empty<UserProductFilter>();
                message.Message = ex.Message;
                message.StatusCode = ResponseStatus.EXCEPTION;
            }
            return new JsonResult(message);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] object obj)
        {
            var message = new ResponseMessage();
            try
            {
                var userProductFilters = JsonConvert.DeserializeObject<UserProductFilter>(obj.ToString());

                var currentUserId = this.User.GetUserId();
                var dbUserProductFilters = await ecommerceContext
                                    .UserProductFilters.Where(i => i.UserId == currentUserId)
                                    .FirstOrDefaultAsync();

                if (dbUserProductFilters != null)
                {
                    dbUserProductFilters.Brands = userProductFilters.Brands;
                    dbUserProductFilters.Categories = userProductFilters.Categories;
                    dbUserProductFilters.IndividualCategories = userProductFilters.IndividualCategories;
                    dbUserProductFilters.PriceRanges = userProductFilters.PriceRanges;
                    dbUserProductFilters.SortBy = userProductFilters.SortBy;
                    dbUserProductFilters.SortOrder = userProductFilters.SortOrder;
                    dbUserProductFilters.ProductCount = userProductFilters.ProductCount;
                    dbUserProductFilters.PageNumber = userProductFilters.PageNumber;
                    dbUserProductFilters.UpdatedOn = DateTime.Now;
                }
                else
                {
                    userProductFilters.UserId = currentUserId;
                    userProductFilters.UpdatedOn = DateTime.Now;
                    await ecommerceContext.UserProductFilters.AddAsync(userProductFilters);
                }
                await ecommerceContext.SaveChangesAsync();
                message.Data = userProductFilters;
            }
            catch (Exception ex)
            {

                message.Data = Array.Empty<UserProductFilter>();
                message.Message = ex.Message;
                message.StatusCode = ResponseStatus.EXCEPTION;
            }
            return new JsonResult(message);
        }
    }
}
