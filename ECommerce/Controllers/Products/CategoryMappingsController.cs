using ECommerce.Models.Ecommerce;
using ECommerce.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ECommerce.Data.Shared;
using Microsoft.AspNetCore.Authorization;

namespace ECommerce.Controllers.Products
{
    [Route("[controller]")]
    [ApiController]
    [Authorize]
    public class CategoryMappingsController : ControllerBase
    {
        private readonly EcommerceContext ecommerceContext;

        private readonly ILogger<CategoryMappingsController> _logger;
        private readonly IConfiguration configuration;

        public CategoryMappingsController(EcommerceContext ecommerceContext, ILogger<CategoryMappingsController> logger, IConfiguration configuration)
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
                var categoryMappings = await ecommerceContext.CategoryMappings
                                        .Include(i=>i.IndividualCategory).DefaultIfEmpty()
                                    .Select(i => new LinkedDropDown()
                                    {
                                        Key=i.CategoryMappingId,
                                        ChildId=i.IndividualCategoryId,
                                        ChildName=i.IndividualCategory.IndividualCategoryName,
                                        ParentId=i.CategoryId
                                    })
                                    .ToListAsync();
                message.Data = categoryMappings;
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
