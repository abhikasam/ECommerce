using ECommerce.Models;
using ECommerce.Data.Account;
using Microsoft.AspNet.Identity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace ECommerce.Controllers.Auth
{
    [Route("[controller]")]
    [ApiController]
    public class LogoutController : ControllerBase
    {
        private readonly Microsoft.AspNetCore.Identity.UserManager<User> userManager;
        private readonly SignInManager<User> signInManager;

        public LogoutController(SignInManager<User> signInManager, Microsoft.AspNetCore.Identity.UserManager<User> userManager)
        {
            this.signInManager = signInManager;
            this.userManager = userManager;
        }


        [HttpPost]
        public async Task<IActionResult> Post()
        {
            var message = new ResponseMessage();
            try
            {
                var id = User.Identity.GetUserId();
                var user = await userManager.FindByIdAsync(id);
                var claims = await userManager.GetClaimsAsync(user);
                await userManager.RemoveClaimsAsync(user, claims.Where(i => i.Type == "expires_at"));
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
