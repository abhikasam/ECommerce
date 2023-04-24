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
        public async Task<IActionResult> Get(int? pageNumber, string search)
        {
            var message = new ResponseMessage();
            var productCount = 50;
            search = !string.IsNullOrWhiteSpace(search) ? search.ToLowerInvariant() : string.Empty;
            try
            {
                var names = search.Split(new string[] { " " }, StringSplitOptions.RemoveEmptyEntries);
                pageNumber = pageNumber ?? 1;
                var isAdmin = this.User.Claims.Any(i => i.Type == "Admin");
                var userDetails = new List<UserDetails>();
                if (isAdmin)
                {
                    var users = userManager.Users;
                    foreach (var user in users)
                    {
                        var userClaims = await userManager.GetClaimsAsync(user);
                        var userDetail = UserDetails.GetDetails(userClaims);
                        if (!userClaims.Any(i => i.Type == "Admin") &&
                            (names.Length == 0 || names.Any(name => userDetail.FullName.ToLowerInvariant().Contains(name))))
                        {
                            userDetails.Add(userDetail);
                        }
                    }
                }
                else
                {
                    var user = await userManager.FindByUserIdAsync(this.User.GetUserId());
                    var claims = await userManager.GetClaimsAsync(user);
                    var userDetail = UserDetails.GetDetails(claims);
                    if (names.Length == 0 || names.Any(name => userDetail.FullName.ToLowerInvariant().Contains(name)))
                    {
                        userDetails.Add(userDetail);
                    }
                }
                message.Data = userDetails.AsQueryable().PaginateData(pageNumber.Value, productCount);
                message.StatusCode = ResponseStatus.SUCCESS;
            }
            catch (Exception ex)
            {
                message.Data = new PaginatedList<UserDetails>();
                message.Message = ex.Message;
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
                var claims = await userManager.GetClaimsAsync(user);
                message.Data = UserDetails.GetDetails(claims);
                message.StatusCode = ResponseStatus.SUCCESS;
            }
            catch (Exception ex)
            {
                message.Message = ex.Message;
                message.StatusCode = ResponseStatus.EXCEPTION;
            }
            return new JsonResult(message);
        }

        [HttpGet]
        [Route("[action]")]
        [ActionName("Favourites")]
        public async Task<IActionResult> GetFavourites(int userId, int pageNumber)
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

                message.Data = favourites.GetProductDtos().PaginateData(pageNumber, productCount);
                message.StatusCode = ResponseStatus.SUCCESS;
            }
            catch (Exception ex)
            {
                message.Data = new PaginatedList<ProductDto>(productCount);
                message.Message = ex.Message;
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
        public async Task<IActionResult> GetOrders(int userId, string dateFilter = null, int? productId = null)
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
                        .GetOrderDtos(userManager, productId, dateFilter, new int[] { userId });

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


        [HttpGet]
        [Route("[action]")]
        [ActionName("AdminDashboard")]

        public async Task<IActionResult> GetAdminDashboard()
        {
            var message = new ResponseMessage();
            try
            {
                var orders = ecommerceContext.Orders
                                .Include(i => i.Product).ThenInclude(i => i.Brand).DefaultIfEmpty()
                                .Include(i => i.Product).ThenInclude(i => i.Category).DefaultIfEmpty()
                                .Include(i => i.Product).ThenInclude(i => i.IndividualCategory).DefaultIfEmpty();

                var favourites = ecommerceContext.Favourites
                                    .Include(i => i.Product).DefaultIfEmpty()
                                    .Include(i => i.Product).ThenInclude(i => i.Brand).DefaultIfEmpty()
                                    .Include(i => i.Product).ThenInclude(i => i.Category).DefaultIfEmpty()
                                    .Include(i => i.Product).ThenInclude(i => i.IndividualCategory).DefaultIfEmpty()
                                    .Include(i => i.Product).ThenInclude(i => i.ProductQuantities).ThenInclude(i => i.Size)
                                    .Include(i => i.Product).ThenInclude(i => i.Carts).DefaultIfEmpty()
                                    .OrderByDescending(i => i.AddedOn);

                var carts = ecommerceContext.Carts
                    .Include(i => i.Product).DefaultIfEmpty()
                    .Include(i => i.Product).ThenInclude(i => i.Brand).DefaultIfEmpty()
                    .Include(i => i.Product).ThenInclude(i => i.Category).DefaultIfEmpty()
                    .Include(i => i.Product).ThenInclude(i => i.IndividualCategory).DefaultIfEmpty()
                    .Include(i => i.Product).ThenInclude(i => i.ProductQuantities).ThenInclude(i => i.Size)
                    .OrderByDescending(i => i.UpdatedOn);

                var ordersData = orders
                .GroupBy(i => i.UserId)
                .OrderByDescending(i => i.Count())
                .Take(3)
                .Select(i=>i.Key);

                var favData = favourites
                .GroupBy(i => i.UserId)
                .OrderByDescending(i => i.Count())
                .Take(3).Select(i => i.Key);


                var cartData = carts
                .GroupBy(i => i.UserId)
                .OrderByDescending(i => i.Count())
                .Take(3).Select(i => i.Key);

                message.Data = new
                {
                    BrandsFromFavourites = GetTopThreeBrands(favourites.Select(i => i.Product)),
                    BrandsFromCart = GetTopThreeBrands(carts.Select(i => i.Product)),
                    BrandsFromOrders = GetTopThreeBrands(orders.Select(i => i.Product)),
                    CategoriesFromFavourites = GetTopThreeCategories(favourites.Select(i => i.Product)),
                    CategoriesFromCart = GetTopThreeCategories(carts.Select(i => i.Product)),
                    CategoriesFromOrders = GetTopThreeCategories(orders.Select(i => i.Product)),
                    IndividualCategoriesFromFavourites = GetTopThreeIndividualCategories(favourites.Select(i => i.Product)),
                    IndividualCategoriesFromCart = GetTopThreeIndividualCategories(carts.Select(i => i.Product)),
                    IndividualCategoriesFromOrders = GetTopThreeIndividualCategories(orders.Select(i => i.Product)),
                    MostOrderedUsers = await GetTopThreeUsers(ordersData),
                    MostFavouritedUsers = await GetTopThreeUsers(favData),
                    MostCartedUsers = await GetTopThreeUsers(cartData)
                };
                message.StatusCode = ResponseStatus.SUCCESS;
            }
            catch (Exception ex)
            {
                message.Message = ex.Message;
                message.StatusCode = ResponseStatus.EXCEPTION;
            }
            return new JsonResult(message);
        }

        public List<KeyValuePair<int, string>> GetTopThreeBrands(IQueryable<Product> products)
        {
            var brandIds = products.Select(i => i.BrandId).Distinct().ToList();

            var top3BrandIds = new int[3, 2];

            foreach (var brandId in brandIds)
            {
                int currentBrandCount = products.Where(i => i.BrandId == brandId).Count();
                if (currentBrandCount > top3BrandIds[0, 1])
                {
                    top3BrandIds[2, 0] = top3BrandIds[1, 0];
                    top3BrandIds[2, 1] = top3BrandIds[1, 1];
                    top3BrandIds[1, 0] = top3BrandIds[0, 0];
                    top3BrandIds[1, 1] = top3BrandIds[0, 1];
                    top3BrandIds[0, 0] = brandId;
                    top3BrandIds[0, 1] = currentBrandCount;
                }
                else if (currentBrandCount < top3BrandIds[0, 1] && currentBrandCount > top3BrandIds[1, 1])
                {
                    top3BrandIds[2, 0] = top3BrandIds[1, 0];
                    top3BrandIds[2, 1] = top3BrandIds[1, 1];
                    top3BrandIds[1, 0] = brandId;
                    top3BrandIds[1, 1] = currentBrandCount;
                }
                else if (currentBrandCount < top3BrandIds[1, 1] && currentBrandCount > top3BrandIds[2, 1])
                {
                    top3BrandIds[2, 0] = brandId;
                    top3BrandIds[2, 1] = currentBrandCount;
                }
            }

            var top3Brands = new List<KeyValuePair<int, string>>();

            for (int i = 0; i < top3BrandIds.GetLength(0); i++)
            {
                var brand = ecommerceContext.Brands.Where(x => x.BrandId == top3BrandIds[i, 0]).FirstOrDefault();
                if (brand != null)
                {
                    top3Brands.Add(new KeyValuePair<int, string>(brand.BrandId, brand.BrandName));
                }
            }
            return top3Brands;
        }
        public List<KeyValuePair<int, string>> GetTopThreeCategories(IQueryable<Product> products)
        {
            var categoryIds = products.Select(i => i.CategoryId).Distinct().ToList();
            var top3CategoryIds = new int[3, 2];

            foreach (var categoryId in categoryIds)
            {
                int currentCategoryCount = products.Where(i => i.CategoryId == categoryId).Count();
                if (currentCategoryCount > top3CategoryIds[0, 1])
                {
                    top3CategoryIds[2, 0] = top3CategoryIds[1, 0];
                    top3CategoryIds[2, 1] = top3CategoryIds[1, 1];
                    top3CategoryIds[1, 0] = top3CategoryIds[0, 0];
                    top3CategoryIds[1, 1] = top3CategoryIds[0, 1];
                    top3CategoryIds[0, 0] = categoryId;
                    top3CategoryIds[0, 1] = currentCategoryCount;
                }
                else if (currentCategoryCount < top3CategoryIds[0, 1] && currentCategoryCount > top3CategoryIds[1, 1])
                {
                    top3CategoryIds[2, 0] = top3CategoryIds[1, 0];
                    top3CategoryIds[2, 1] = top3CategoryIds[1, 1];
                    top3CategoryIds[1, 0] = categoryId;
                    top3CategoryIds[1, 1] = currentCategoryCount;
                }
                else if (currentCategoryCount < top3CategoryIds[1, 1] && currentCategoryCount > top3CategoryIds[2, 1])
                {
                    top3CategoryIds[2, 0] = categoryId;
                    top3CategoryIds[2, 1] = currentCategoryCount;
                }
            }

            var top3Categories = new List<KeyValuePair<int, string>>();

            for (int i = 0; i < top3CategoryIds.GetLength(0); i++)
            {
                var category = ecommerceContext.Categories.Where(x => x.CategoryId == top3CategoryIds[i, 0]).FirstOrDefault();
                if (category != null)
                {
                    top3Categories.Add(new KeyValuePair<int, string>(category.CategoryId, category.CategoryName));
                }
            }

            return top3Categories;
        }

        public List<KeyValuePair<int, string>> GetTopThreeIndividualCategories(IQueryable<Product> products)
        {
            var individualCategoryIds = products.Select(i => i.IndividualCategoryId).Distinct().ToList();

            var top3IndividualCategoryIds = new int[3, 2];

            foreach (var individualCategoryId in individualCategoryIds)
            {
                int currentIndividualCategoryCount = products.Where(i => i.IndividualCategoryId == individualCategoryId).Count();
                if (currentIndividualCategoryCount > top3IndividualCategoryIds[0, 1])
                {
                    top3IndividualCategoryIds[2, 0] = top3IndividualCategoryIds[1, 0];
                    top3IndividualCategoryIds[2, 1] = top3IndividualCategoryIds[1, 1];
                    top3IndividualCategoryIds[1, 0] = top3IndividualCategoryIds[0, 0];
                    top3IndividualCategoryIds[1, 1] = top3IndividualCategoryIds[0, 1];
                    top3IndividualCategoryIds[0, 0] = individualCategoryId;
                    top3IndividualCategoryIds[0, 1] = currentIndividualCategoryCount;
                }
                else if (currentIndividualCategoryCount < top3IndividualCategoryIds[0, 1] && currentIndividualCategoryCount > top3IndividualCategoryIds[1, 1])
                {
                    top3IndividualCategoryIds[2, 0] = top3IndividualCategoryIds[1, 0];
                    top3IndividualCategoryIds[2, 1] = top3IndividualCategoryIds[1, 1];
                    top3IndividualCategoryIds[1, 0] = individualCategoryId;
                    top3IndividualCategoryIds[1, 1] = currentIndividualCategoryCount;
                }
                else if (currentIndividualCategoryCount < top3IndividualCategoryIds[1, 1] && currentIndividualCategoryCount > top3IndividualCategoryIds[2, 1])
                {
                    top3IndividualCategoryIds[2, 0] = individualCategoryId;
                    top3IndividualCategoryIds[2, 1] = currentIndividualCategoryCount;
                }
            }

            var top3IndividualCategories = new List<KeyValuePair<int, string>>();

            for (int i = 0; i < top3IndividualCategoryIds.GetLength(0); i++)
            {
                var individualCategory = ecommerceContext.IndividualCategories.Where(x => x.IndividualCategoryId == top3IndividualCategoryIds[i, 0]).FirstOrDefault();
                if (individualCategory != null)
                {
                    top3IndividualCategories.Add(new KeyValuePair<int, string>(individualCategory.IndividualCategoryId, individualCategory.IndividualCategoryName));
                }
            }
            return top3IndividualCategories;
        }

        public async Task<List<UserDetails>> GetTopThreeUsers(IQueryable<int> users)
        {
            var top3Users=new List<UserDetails>();
            foreach(var userId in users)
            {
                var user = await userManager.FindByUserIdAsync(userId);
                if (user != null)
                {
                    var claims = await userManager.GetClaimsAsync(user);
                    top3Users.Add(UserDetails.GetDetails(claims));
                }
            }
            return top3Users;
        }

    }
}
