namespace ECommerce.Models.EcommerceExtensions
{
    public class ProductFilters
    {
        public int ProductCount { get; set; }
        public int[] Brands { get; set; }
        public int[] Categories { get; set; }
        public int[] IndividualCategories { get; set; }
        public string[] PriceRanges { get; set; }
        public string[] SizeOptions { get; set; }
        public int[] Discounts { get; set; }
        public int[] Rating { get; set; }
        public string SortBy { get; set; }
        public string SortOrder { get; set; }
        public string Search { get; set; }
    }
}
