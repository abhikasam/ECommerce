using ECommerce.Models;
using ECommerce.Data.Account;
using ECommerce.Data.Authentication;
using Microsoft.AspNet.Identity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Configuration;
using System.Security.Claims;

namespace ECommerce.Controllers.Auth
{
    [Route("[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly SignInManager<User> signInManager;
        private readonly Microsoft.AspNetCore.Identity.UserManager<User> userManager;
        private readonly IConfiguration configuration;

        public LoginController(SignInManager<User> signInManager, Microsoft.AspNetCore.Identity.UserManager<User> userManager, IConfiguration configuration)
        {
            this.signInManager = signInManager;
            this.userManager = userManager;
            this.configuration = configuration;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var isAuthenticated = User.Identity.IsAuthenticated;
                if (!isAuthenticated)
                {
                    return new JsonResult(new
                    {
                        IsAuthenticated = false,
                        IsException = false
                    });
                }

                var id = User.Identity.GetUserId();
                var user = await userManager.FindByIdAsync(id);
                var claims = await userManager.GetClaimsAsync(user);
                var expiresAt = claims.Where(i => i.Type == "expires_at").FirstOrDefault().Value;

                var expiresIn = DateTime.Parse(expiresAt);

                var expireTimeSpan = expiresIn.Subtract(DateTime.Now);

                return new JsonResult(new
                {
                    isAuthenticated = true,
                    User = UserDetails.GetDetails(claims),
                    expiresIn = expireTimeSpan.TotalSeconds
                });
            }
            catch (Exception ex)
            {
                return new JsonResult(new
                {
                    IsAuthenticated = false,
                    IsException = true,
                    ex.Message
                });
            }
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
                    var user = await userManager.FindByEmailAsync(login.Email);
                    if (user == null)
                    {
                        message.Message = "User not exists.";
                        message.StatusCode = ResponseStatus.ERROR;
                        return new JsonResult(message);
                    }


                    var result = await signInManager.PasswordSignInAsync(login.Email,
                                        login.Password,
                                        login.RememberMe,
                                        false);

                    if (result.Succeeded)
                    {
                        message.Message = "Login successful." + Environment.NewLine + "You will be redirected to Home Page.";
                        message.StatusCode = ResponseStatus.SUCCESS;
                        var claims = await userManager.GetClaimsAsync(user);
                        if (claims.Any(i => i.Type == "expires_at"))
                        {
                            await userManager.RemoveClaimsAsync(user, claims.Where(i => i.Type == "expires_at"));
                        }

                        var sessionExpiresIn = configuration.GetValue<int>("SessionExpireMinutes");

                        var claim = new Claim("expires_at", DateTime.Now.AddMinutes(sessionExpiresIn).ToString());
                        await userManager.AddClaimAsync(user, claim);
                        claims = await userManager.GetClaimsAsync(user);
                        message.Data = new
                        {
                            User = UserDetails.GetDetails(claims),
                            expiresIn = sessionExpiresIn * 60
                        };
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
