using ECommerce.Data;
using ECommerce.Data.Account;
using ECommerce.Models;
using ECommerce.Models.Ecommerce;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using NuGet.Packaging;
using System.Security.Claims;

namespace ECommerce.Controllers.Auth
{
    [Route("[controller]")]
    [ApiController]
    //[Authorize(policy:"Admin")]
    public class UsersController : ControllerBase
    {
        private readonly SignInManager<User> signInManager;
        private readonly Microsoft.AspNetCore.Identity.UserManager<User> userManager;
        private readonly EcommerceContext ecommerceContext;
        private readonly IConfiguration configuration;

        public UsersController(SignInManager<User> signInManager, UserManager<User> userManager, IConfiguration configuration, EcommerceContext ecommerceContextcontext)
        {
            this.signInManager = signInManager;
            this.userManager = userManager;
            this.configuration = configuration;
            this.ecommerceContext = ecommerceContextcontext;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var message = new ResponseMessage();

            try
            {
                var isAdmin= this.User.Claims.Any(i=>i.Type=="Admin");
                var userDetails = new List<KeyValuePair<int,string>>();
                if (isAdmin)
                {
                    var users = userManager.Users;
                    foreach (var user in users)
                    {
                        var userClaims = await userManager.GetClaimsAsync(user);
                        if(!userClaims.Any(i=>i.Type=="Admin"))
                            userDetails.Add(new KeyValuePair<int, string>(user.UserId,user.Email+" ( "+Utilities.GetFullName(userClaims)+" )"));
                    }
                }
                else
                {
                    var name = this.User.Claims.FirstOrDefault(i => i.Type == "Email").Value+this.User.GetFullName();
                    userDetails.Add(new KeyValuePair<int, string>(this.User.GetUserId(),name));
                }
                message.Data = userDetails;
                message.StatusCode = ResponseStatus.SUCCESS;
            }
            catch(Exception ex)
            {
                message.Data=Array.Empty<UserDetails>();
                message.Message= ex.Message;
                message.StatusCode = ResponseStatus.EXCEPTION;
            }

            return new JsonResult(message);
        }


        [HttpGet("{userid}")]
        public async Task<IActionResult> Get(int userId)
        {
            var message = new ResponseMessage();
            try
            {
                var userDetails = await userManager.GetUser(userId,ecommerceContext);
                message.Data=userDetails;
                message.StatusCode = ResponseStatus.SUCCESS;
            }
            catch(Exception ex)
            {
                message.Message= ex.Message;
                message.StatusCode = ResponseStatus.EXCEPTION;
            }
            return new JsonResult(message);
        }

    }
}
