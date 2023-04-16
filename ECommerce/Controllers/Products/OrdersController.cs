using ECommerce.Models.Ecommerce;
using ECommerce.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Microsoft.EntityFrameworkCore;

namespace ECommerce.Controllers.Products
{
    [Route("[controller]")]
    [ApiController]
    [Authorize]
    public class OrdersController : ControllerBase
    {
        private readonly EcommerceContext ecommerceContext;

        private readonly ILogger<OrdersController> _logger;
        private readonly IConfiguration configuration;

        public OrdersController(EcommerceContext ecommerceContext, ILogger<OrdersController> logger, IConfiguration configuration)
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
                var orders = await ecommerceContext.Orders
                                    .Include(i=>i.Product).DefaultIfEmpty()
                                    .Where(i => i.UserId == this.User.Identity.GetUserId())
                                    .ToListAsync();
                message.Data = orders;
            }
            catch (Exception ex)
            {
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
                var orderItems = JsonConvert.DeserializeObject<Order[]>(obj.ToString());

                var currentUserId = this.User.Identity.GetUserId();
                
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
