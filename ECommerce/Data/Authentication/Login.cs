using System.ComponentModel.DataAnnotations;

namespace ECommerce.Data.Authentication
{
    public class Login
    {
        [Required]
        [EmailAddress(ErrorMessage = "Invalid email address.")]
        public string Email { get; set; }

        [Required]
        [DataType(dataType: DataType.Password)]
        public string Password { get; set; }

        public bool RememberMe { get; set; }

    }
}
