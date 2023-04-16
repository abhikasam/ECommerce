using System;
using System.Collections.Generic;

namespace ECommerce.Models.Ecommerce
{
    public partial class UserProductFilter
    {
        public int UserProductFilterId { get; set; }
        public string UserId { get; set; }
        public string Brands { get; set; }
        public string Categories { get; set; }
        public string IndividualCategories { get; set; }
        public string PriceRanges { get; set; }
        public int ProductCount { get; set; }
        public string SortBy { get; set; }
        public string SortOrder { get; set; }
        public int PageNumber { get; set; }
        public DateTime UpdatedOn { get; set; }
    }
}
