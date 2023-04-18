using System;
using System.Collections.Generic;

namespace ECommerce.Models.Ecommerce
{
    public partial class Order
    {
        public int OrderId { get; set; }
        public int UserId { get; set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        public DateTime PlacedOn { get; set; }
        public int OrderInstanceId { get; set; }

        public virtual Product Product { get; set; }
    }
}
