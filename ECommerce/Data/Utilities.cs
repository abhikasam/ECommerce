using ECommerce.Data.Account;
using ECommerce.Data.Products;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace ECommerce.Data
{
    public class Utilities
    {
        public static string GetFullName(ClaimsPrincipal claimsPrincipal)
        {
            return claimsPrincipal.Claims.Where(i => i.Type == "FullName").FirstOrDefault().Value;
        }

        public static string GetFullName(IList<Claim> claims)
        {
            return claims.Where(i => i.Type == "FullName").FirstOrDefault().Value;
        }
    }

    public static class CommonUtilites
    {
        public static string GetFullName(this ClaimsPrincipal claimsPrincipal)
        {
            return claimsPrincipal.Claims.Where(i => i.Type == "FullName").FirstOrDefault().Value;
        }

        public static int GetUserId(this ClaimsPrincipal claimsPrincipal)
        {
            var userId=claimsPrincipal.Claims.FirstOrDefault(i => i.Type == "UserId").Value;
            return Convert.ToInt32(userId);
        }

        public static async Task<User> FindByUserIdAsync(this UserManager<User> manager, int userId)
        {
            return await manager.Users.Where(i => i.UserId == userId).FirstOrDefaultAsync();
        }
    }
}
