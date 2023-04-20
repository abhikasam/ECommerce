using ECommerce.Models;
using ECommerce.Models.Ecommerce;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace ECommerce.Controllers.Products
{
    [Route("[controller]")]
    [ApiController]
    [Authorize]
    public class CategoriesController : ControllerBase
    {
        private readonly EcommerceContext ecommerceContext;

        private readonly ILogger<CategoriesController> _logger;
        private readonly IConfiguration configuration;

        public CategoriesController(EcommerceContext ecommerceContext, ILogger<CategoriesController> logger, IConfiguration configuration)
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
                var categories = await ecommerceContext.Categories
                                    .Select(i => new KeyValuePair<int, string>(i.CategoryId, i.CategoryName))
                                    .ToListAsync();
                message.Data = categories;
            }
            catch (Exception ex)
            {
                message.Data = Array.Empty<Category>();
                message.Message = ex.Message;
                message.StatusCode = ResponseStatus.EXCEPTION;
            }
            return new JsonResult(message);
        }

    }
}
