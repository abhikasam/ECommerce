﻿using System;
using System.Collections.Generic;

namespace ECommerce.Models.Ecommerce
{
    public partial class Category
    {
        public Category()
        {
            CategoryMappings = new HashSet<CategoryMapping>();
            Products = new HashSet<Product>();
        }

        public int CategoryId { get; set; }
        public string CategoryName { get; set; }

        public virtual ICollection<CategoryMapping> CategoryMappings { get; set; }
        public virtual ICollection<Product> Products { get; set; }
    }
}
