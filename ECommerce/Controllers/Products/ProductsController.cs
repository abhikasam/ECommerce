using DealManager.Models;
using ECommerce.Data.Products;
using ECommerce.Models.Ecommerce;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace ECommerce.Controllers.Products
{
    [Authorize]
    [Route("[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly EcommerceContext ecommerceContext;

        private readonly ILogger<ProductsController> _logger;

        public ProductsController(EcommerceContext ecommerceContext, ILogger<ProductsController> logger)
        {
            this.ecommerceContext = ecommerceContext;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var message = new ResponseMessage();

            try
            {
                var products= await ecommerceContext.Products
                                .Include(i => i.Brand).DefaultIfEmpty()
                                .Include(i => i.Category).DefaultIfEmpty()
                                .Include(i => i.IndividualCategory).DefaultIfEmpty()
                                .Take(100).ToListAsync();

                message.Data= products.GetProductDtos();
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
