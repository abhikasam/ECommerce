using DealManager.Models;
using ECommerce.Data.Account;
using ECommerce.Data.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace ECommerce.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly SignInManager<User> signInManager;
        private readonly UserManager<User> userManager;

        public LoginController(SignInManager<User> signInManager,UserManager<User> userManager)
        {
            this.signInManager = signInManager;
            this.userManager = userManager;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] object obj)
        {
            var message = new ResponseMessage();

            try
            {
                var login = JsonConvert.DeserializeObject<Login>(obj.ToString());

                if (!ModelState.IsValid)
                {
                    message.Message = string.Join("; ", ModelState.Values
                                            .SelectMany(x => x.Errors)
                                            .Select(x => x.ErrorMessage));
                    message.StatusCode = ResponseStatus.ERROR;
                    return new JsonResult(message);
                }
                else
                {
                    var result = await signInManager.PasswordSignInAsync(login.Email,
                                        login.Password,
                                        login.RememberMe,
                                        false);

                    if (result.Succeeded)
                    {
                        message.Message = "Login successful." + Environment.NewLine + "You will be redirected to Home Page.";
                        message.StatusCode = ResponseStatus.SUCCESS;
                        message.Data=await userManager.FindByEmailAsync(login.Email);
                    }
                    else
                    {
                        if (result.IsLockedOut)
                        {
                            message.Message = "You are locked out.";
                        }
                        else
                        {
                            message.Message = "Please check your credentials.";
                        }
                        message.StatusCode = ResponseStatus.ERROR;
                    }
                }
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
