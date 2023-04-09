using System;
using System.Collections.Generic;

namespace ECommerce.Models.Ecommerce
{
    public partial class Size
    {
        public Size()
        {
            IndividualCategorySizeMappings = new HashSet<IndividualCategorySizeMapping>();
            ProductQuantities = new HashSet<ProductQuantity>();
        }

        public int SizeId { get; set; }
        public string SizeName { get; set; }

        public virtual ICollection<IndividualCategorySizeMapping> IndividualCategorySizeMappings { get; set; }
        public virtual ICollection<ProductQuantity> ProductQuantities { get; set; }
    }
}
