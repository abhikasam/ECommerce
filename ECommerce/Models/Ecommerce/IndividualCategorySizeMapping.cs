using System;
using System.Collections.Generic;

namespace ECommerce.Models.Ecommerce
{
    public partial class IndividualCategorySizeMapping
    {
        public int IndividualCategorySizeMappingId { get; set; }
        public int IndividualCategoryId { get; set; }
        public int SizeId { get; set; }

        public virtual IndividualCategory IndividualCategory { get; set; }
        public virtual Size Size { get; set; }
    }
}
