﻿using System;
using System.Collections.Generic;

namespace ECommerce.Models.Ecommerce
{
    public partial class ProductQuantity
    {
        public int ProductQuantityId { get; set; }
        public int ProductId { get; set; }
        public int SizeId { get; set; }
        public int Quantity { get; set; }

        public virtual Product Product { get; set; }
        public virtual Size Size { get; set; }
    }
}
