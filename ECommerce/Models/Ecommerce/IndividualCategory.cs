using System;
using System.Collections.Generic;

namespace ECommerce.Models.Ecommerce
{
    public partial class IndividualCategory
    {
        public IndividualCategory()
        {
            CategoryMappings = new HashSet<CategoryMapping>();
            IndividualCategorySizeMappings = new HashSet<IndividualCategorySizeMapping>();
            Products = new HashSet<Product>();
        }

        public int IndividualCategoryId { get; set; }
        public string IndividualCategoryName { get; set; }

        public virtual ICollection<CategoryMapping> CategoryMappings { get; set; }
        public virtual ICollection<IndividualCategorySizeMapping> IndividualCategorySizeMappings { get; set; }
        public virtual ICollection<Product> Products { get; set; }
    }
}
