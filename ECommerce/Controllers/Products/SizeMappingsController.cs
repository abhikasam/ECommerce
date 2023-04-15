using ECommerce.Data.Shared;
using ECommerce.Models.Ecommerce;
using ECommerce.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace ECommerce.Controllers.Products
{
    [Route("[controller]")]
    [ApiController]
    [Authorize]
    public class SizeMappingsController : ControllerBase
    {
        private readonly EcommerceContext ecommerceContext;

        private readonly ILogger<SizeMappingsController> _logger;
        private readonly IConfiguration configuration;

        public SizeMappingsController(EcommerceContext ecommerceContext, ILogger<SizeMappingsController> logger, IConfiguration configuration)
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
                var individualCategorySizeMappings = await ecommerceContext.IndividualCategorySizeMappings
                                        .Include(i => i.Size).DefaultIfEmpty()
                                    .Select(i => new LinkedDropDown()
                                    {
                                        Key = i.IndividualCategorySizeMappingId,
                                        ChildId = i.SizeId,
                                        ChildName = i.Size.SizeName,
                                        ParentId = i.IndividualCategoryId
                                    })
                                    .ToListAsync();
                message.Data = individualCategorySizeMappings;
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
