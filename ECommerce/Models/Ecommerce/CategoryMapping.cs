using System;
using System.Collections.Generic;

namespace ECommerce.Models.Ecommerce
{
    public partial class CategoryMapping
    {
        public int CategoryMappingId { get; set; }
        public int CategoryId { get; set; }
        public int IndividualCategoryId { get; set; }

        public virtual Category Category { get; set; }
        public virtual IndividualCategory IndividualCategory { get; set; }
    }
}
