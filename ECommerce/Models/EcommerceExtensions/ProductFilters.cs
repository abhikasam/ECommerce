namespace ECommerce.Models.EcommerceExtensions
{
    public class ProductFilters
    {
        public int ProductCount { get; set; }
        public int PageNumber { get; set; }
        public int[] BrandIds { get; set; }
        public int[] CategoryIds { get; set; }
        public int[] IndividualCategoryIds { get; set; }
        public string[] PriceRange { get; set; }
        public string[] SizeOptions { get; set; }
        public int[] Discounts { get; set; }
        public int[] Rating { get; set; }
        public string SortBy { get; set; }
        public string SortOrder { get; set; }
    }
}
