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
    public class BrandsController : ControllerBase
    {
        private readonly EcommerceContext ecommerceContext;

        private readonly ILogger<BrandsController> _logger;
        private readonly IConfiguration configuration;

        public BrandsController(EcommerceContext ecommerceContext, ILogger<BrandsController> logger, IConfiguration configuration)
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
                var brands=await ecommerceContext.Brands
                                    .Select(i=> new KeyValuePair<int,string>(i.BrandId,i.BrandName))
                                    .ToListAsync();
                message.Data = brands;
            }
            catch (Exception ex)
            {
                message.Data =Array.Empty<Brand>();
                message.Message = ex.Message;
                message.StatusCode = ResponseStatus.EXCEPTION;
            }
            return new JsonResult(message);
        }

    }
}
