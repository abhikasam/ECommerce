using System;
using System.Collections.Generic;

namespace ECommerce.Models.Ecommerce
{
    public partial class Product
    {
        public int ProductId { get; set; }
        public string Description { get; set; }
        public int BrandId { get; set; }
        public int CategoryId { get; set; }
        public int IndividualCategoryId { get; set; }
        public int OriginalPrice { get; set; }
        public int? Discount { get; set; }
        public string SizeOptions { get; set; }
        public double Rating { get; set; }
        public int Reviews { get; set; }
        public string Url { get; set; }

        public virtual Brand Brand { get; set; }
        public virtual Category Category { get; set; }
        public virtual IndividualCategory IndividualCategory { get; set; }
    }
}
