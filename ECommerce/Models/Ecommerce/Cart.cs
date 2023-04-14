using System;
using System.Collections.Generic;

namespace ECommerce.Models.Ecommerce
{
    public partial class Cart
    {
        public int CartItemId { get; set; }
        public string UserId { get; set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        public DateTime UpdatedOn { get; set; }

        public virtual Product Product { get; set; }
    }
}
