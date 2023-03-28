using System.Security.Claims;

namespace ECommerce.Data
{
    public class Utilities
    {
        public static string GetFullName(ClaimsPrincipal claimsPrincipal)
        {
            return claimsPrincipal.Claims.Where(i => i.Type == "FullName").FirstOrDefault().Value;
        }
    }
}
