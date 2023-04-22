using ECommerce.Data.Products;
using ECommerce.Data.Shared;
using ECommerce.Models.Ecommerce;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace ECommerce.Data.Account
{
    public class UserStats
    {
        public UserDetails UserDetails { get; set; }
        public PaginatedList<ProductDto> Favourites { get; set; } = new PaginatedList<ProductDto>();
        public PaginatedList<ProductDto> Carts { get; set; } = new PaginatedList<ProductDto>();
        public List<OrderItem> Orders { get; set; } = new List<OrderItem>();
    }


    public static class UserStatsExt
    {
        public static async Task<UserStats> GetUser(this UserManager<User> userManager, 
            int userId,
            int favPageNumber,
            int cartPageNumber,
            int ordersPageNumber,
            EcommerceContext ecommerceContext)
        {
            int productCount = 50;
            var user = await userManager.FindByUserIdAsync(userId);
            var claims = await userManager.GetClaimsAsync(user);

            var userStats=new UserStats();
            userStats.UserDetails= UserDetails.GetDetails(claims);

            return userStats;
        }
    }
}
