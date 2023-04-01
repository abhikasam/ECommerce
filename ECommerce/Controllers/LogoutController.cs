using DealManager.Models;
using ECommerce.Data.Account;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace ECommerce.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class LogoutController : ControllerBase
    {

        private readonly Microsoft.AspNetCore.Identity.SignInManager<User> signInManager;

        public LogoutController(SignInManager<User> signInManager)
        {
            this.signInManager = signInManager;
        }


        [HttpPost]
        public async Task<IActionResult> Post()
        {
            var message = new ResponseMessage();
            try
            {
                await signInManager.SignOutAsync();
                message.Message = "Session expired!";
                message.StatusCode = ResponseStatus.SUCCESS;
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
