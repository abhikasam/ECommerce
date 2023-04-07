using ECommerce.Models;
using ECommerce.Models.Ecommerce;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace ECommerce.Controllers.Products
{
    [Route("[controller]")]
    [ApiController]
    public class IndividualCategoriesController : ControllerBase
    {
        private readonly EcommerceContext ecommerceContext;

        private readonly ILogger<IndividualCategoriesController> _logger;
        private readonly IConfiguration configuration;

        public IndividualCategoriesController(EcommerceContext ecommerceContext, ILogger<IndividualCategoriesController> logger, IConfiguration configuration)
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
                var individualCategories = await ecommerceContext.IndividualCategories
                                    .Select(i => new KeyValuePair<int, string>(i.IndividualCategoryId, i.IndividualCategoryName))
                                    .ToListAsync();
                message.Data = individualCategories;
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
