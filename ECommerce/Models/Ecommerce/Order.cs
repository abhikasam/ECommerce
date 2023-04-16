using System;
using System.Collections.Generic;

namespace ECommerce.Models.Ecommerce
{
    public partial class Order
    {
        public int OrderId { get; set; }
        public string UserId { get; set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; }

        public virtual Product Product { get; set; }
    }
}
