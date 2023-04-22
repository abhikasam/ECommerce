using ECommerce.Data;
using ECommerce.Data.Account;
using ECommerce.Data.Products;
using ECommerce.Data.Shared;
using ECommerce.Models;
using ECommerce.Models.Ecommerce;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
        public async Task<IActionResult> Get(int? pageNumber)
        {
            var message = new ResponseMessage();
            var productCount = 50;

            try
            {
                pageNumber= pageNumber ?? 1;
                var isAdmin= this.User.Claims.Any(i=>i.Type=="Admin");
                var userDetails = new List<UserDetails>();
                if (isAdmin)
                {
                    var users = userManager.Users;
                    foreach (var user in users)
                    {
                        var userClaims = await userManager.GetClaimsAsync(user);
                        if(!userClaims.Any(i=>i.Type=="Admin"))
                            userDetails.Add(UserDetails.GetDetails(userClaims));
                    }
                }
                else
                {
                    var user = await userManager.FindByUserIdAsync(this.User.GetUserId());
                    var claims=await userManager.GetClaimsAsync(user);
                    userDetails.Add(UserDetails.GetDetails(claims));
                }
                message.Data = userDetails.AsQueryable().PaginateData(pageNumber.Value,productCount);
                message.StatusCode = ResponseStatus.SUCCESS;
            }
            catch(Exception ex)
            {
                message.Data=new PaginatedList<UserDetails>();
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
                var user = await userManager.FindByUserIdAsync(userId);
                var claims= await userManager.GetClaimsAsync(user);
                message.Data=UserDetails.GetDetails(claims);
                message.StatusCode = ResponseStatus.SUCCESS;
            }
            catch(Exception ex)
            {
                message.Message= ex.Message;
                message.StatusCode = ResponseStatus.EXCEPTION;
            }
            return new JsonResult(message);
        }

        [HttpGet]
        [Route("[action]")]
        [ActionName("Favourites")]
        public async Task<IActionResult> GetFavourites(int userId,int pageNumber)
        {
            var message = new ResponseMessage();
            int productCount = 50;
            try
            {

                var userFavourites = await ecommerceContext.Favourites
                                    .Where(i => i.UserId == userId)
                                    .Select(i => i.ProductId)
                                    .ToListAsync();

                var favourites = ecommerceContext.Products
                    .Include(i => i.Brand).DefaultIfEmpty()
                    .Include(i => i.Category).DefaultIfEmpty()
                    .Include(i => i.IndividualCategory).DefaultIfEmpty()
                    .Include(i => i.Favorites).DefaultIfEmpty()
                    .Include(i => i.ProductQuantities).ThenInclude(i => i.Size).DefaultIfEmpty()
                    .Include(i => i.Carts)
                    .Where(i => userFavourites.Contains(i.ProductId));

                message.Data= favourites.GetProductDtos().PaginateData(pageNumber, productCount);
                message.StatusCode = ResponseStatus.SUCCESS;
            }
            catch (Exception ex)
            {
                message.Data= new PaginatedList<ProductDto>(productCount);
                message.Message=ex.Message;
                message.StatusCode = ResponseStatus.EXCEPTION;
            }
            return new JsonResult(message);
        }

        [HttpGet]
        [Route("[action]")]
        [ActionName("Cart")]
        public async Task<IActionResult> GetCart(int userId, int pageNumber)
        {
            var message = new ResponseMessage();
            int productCount = 50;
            try
            {
                var userCart = await ecommerceContext.Carts
                    .Where(i => i.UserId == userId)
                    .Select(i => i.ProductId)
                    .ToListAsync();

                var cartProducts = ecommerceContext.Products
                                    .Include(i => i.Brand).DefaultIfEmpty()
                                    .Include(i => i.Category).DefaultIfEmpty()
                                    .Include(i => i.IndividualCategory).DefaultIfEmpty()
                                    .Include(i => i.Favorites).DefaultIfEmpty()
                                    .Include(i => i.ProductQuantities).ThenInclude(i => i.Size).DefaultIfEmpty()
                                    .Include(i => i.Carts)
                                    .Where(i => userCart.Contains(i.ProductId));

                message.Data = cartProducts.GetProductDtos().PaginateData(pageNumber, productCount);
                message.StatusCode = ResponseStatus.SUCCESS;
            }
            catch (Exception ex)
            {
                message.Data = new PaginatedList<CartDto>(productCount);
                message.Message = ex.Message;
                message.StatusCode = ResponseStatus.EXCEPTION;
            }
            return new JsonResult(message);
        }

        [HttpGet]
        [Route("[action]")]
        [ActionName("orders")]
        public async Task<IActionResult> GetOrders(int userId, string dateFilter=null)
        {
            var message = new ResponseMessage();
            try
            {
                var userOrders = await ecommerceContext.Orders
                    .Where(i => i.UserId == userId)
                    .Select(i => i.ProductId)
                    .ToListAsync();

                var orderedProducts = ecommerceContext.Orders
                                        .Include(i => i.Product).ThenInclude(i => i.Brand).DefaultIfEmpty()
                                        .Include(i => i.Product).ThenInclude(i => i.Category).DefaultIfEmpty()
                                        .Include(i => i.Product).ThenInclude(i => i.IndividualCategory).DefaultIfEmpty()
                                        .Include(i => i.Product).ThenInclude(i => i.ProductQuantities).ThenInclude(i => i.Size)
                                        .Include(i => i.Product).ThenInclude(i => i.Carts).DefaultIfEmpty()
                                        .Where(i => userOrders.Contains(i.ProductId));

                message.Data = await orderedProducts
                        .GetOrderDtos(userManager, dateFilter, new int[] { userId });

                message.StatusCode = ResponseStatus.SUCCESS;
            }
            catch (Exception ex)
            {
                message.Data = Array.Empty<CartDto>();
                message.Message = ex.Message;
                message.StatusCode = ResponseStatus.EXCEPTION;
            }
            return new JsonResult(message);
        }
    }
}
