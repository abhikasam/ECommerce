using ECommerce.Data.Products;
using ECommerce.Models.Ecommerce;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace ECommerce.Data.Account
{
    public class UserDetails
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string FullName { get; set; }
        public string UserId { get; set; }
        public bool IsAdmin { get; set; }
        public string ExpiresAt { get; set; }
        public List<ProductDto> Favourites { get; set; } = new List<ProductDto>();
        public List<ProductDto> Carts { get; set; }=new List<ProductDto>();
        public List<OrderItem> Orders { get; set; }=new List<OrderItem>();

        public static UserDetails GetDetails(IEnumerable<Claim> claims)
        {
            return new UserDetails()
            {
                FirstName=claims.FirstOrDefault(i=>i.Type=="FirstName")?.Value,
                LastName= claims.FirstOrDefault(i => i.Type == "LastName")?.Value,
                FullName= claims.FirstOrDefault(i => i.Type == "FullName")?.Value,
                Email= claims.FirstOrDefault(i => i.Type == "Email")?.Value,
                UserId= claims.FirstOrDefault(i => i.Type == "UserId")?.Value,
                IsAdmin=claims.Any(i => i.Type == "Admin"),
                ExpiresAt= claims.FirstOrDefault(i => i.Type == "expires_at")?.Value
            };
        }
    }

    public static class UserDetailsExt
    {
        public static async Task<UserDetails> GetUser(this UserManager<User> userManager,int userId,EcommerceContext ecommerceContext)
        {
            var user=await userManager.FindByUserIdAsync(userId);
            var claims=await userManager.GetClaimsAsync(user);
            var userdetails=UserDetails.GetDetails(claims);

            var userFavourites=await ecommerceContext.Favourites
                                .Where(i=>i.UserId==userId)
                                .Select(i=>i.ProductId)
                                .ToListAsync();
            var favourites = ecommerceContext.Products
                                .Include(i => i.Brand).DefaultIfEmpty()
                                .Include(i => i.Category).DefaultIfEmpty()
                                .Include(i => i.IndividualCategory).DefaultIfEmpty()
                                .Include(i => i.Favorites).DefaultIfEmpty()
                                .Include(i => i.ProductQuantities).ThenInclude(i => i.Size).DefaultIfEmpty()
                                .Include(i => i.Carts)
                                .Where(i=> userFavourites.Contains(i.ProductId));

            var userCart = await ecommerceContext.Carts
                                .Where(i => i.UserId == userId)
                                .Select(i => i.ProductId)
                                .ToListAsync();

            var cartProducts= ecommerceContext.Products
                                .Include(i => i.Brand).DefaultIfEmpty()
                                .Include(i => i.Category).DefaultIfEmpty()
                                .Include(i => i.IndividualCategory).DefaultIfEmpty()
                                .Include(i => i.Favorites).DefaultIfEmpty()
                                .Include(i => i.ProductQuantities).ThenInclude(i => i.Size).DefaultIfEmpty()
                                .Include(i => i.Carts)
                                .Where(i => userCart.Contains(i.ProductId));

            var userOrders= await ecommerceContext.Orders
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

            userdetails.Favourites = favourites.GetProductDtos().ToList();
            userdetails.Carts=cartProducts.GetProductDtos().ToList();
            userdetails.Orders =await orderedProducts.GetOrderDtos(userManager,null,new int[] {userId});
            return userdetails;
        }
    }

}
