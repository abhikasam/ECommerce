using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ECommerce.Models.Ecommerce
{
    public partial class Favourite
    {
        [NotMapped]
        public virtual Product Product { get; set; }
    }   
}
