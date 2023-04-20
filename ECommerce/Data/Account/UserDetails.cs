using Microsoft.AspNetCore.Identity;
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
}
