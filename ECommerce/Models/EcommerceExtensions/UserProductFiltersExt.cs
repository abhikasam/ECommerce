using System.ComponentModel.DataAnnotations.Schema;

namespace ECommerce.Models.Ecommerce
{
    public partial class UserProductFilter
    {
        [NotMapped]
        public int[] BrandIds 
        {
            get
            {
                return string.IsNullOrWhiteSpace(Brands) ? new int[0] : Brands.Split(",").Select(i => Convert.ToInt32(i)).ToArray();
            }
            set
            {
                Brands = string.Join(",",value);
            }
        }

        [NotMapped]
        public int[] CategoryIds
        {
            get
            {
                return string.IsNullOrWhiteSpace(Categories) ? new int[0] : Categories.Split(",").Select(i => Convert.ToInt32(i)).ToArray();
            }
            set
            {
                Categories = string.Join(",", value);
            }
        }
        [NotMapped]
        public int[] IndividualCategoryIds
        {
            get
            {
                return string.IsNullOrWhiteSpace(IndividualCategories) ? new int[0] : IndividualCategories.Split(",").Select(i => Convert.ToInt32(i)).ToArray();
            }
            set
            {
                IndividualCategories = string.Join(",", value);
            }
        }
        [NotMapped]
        public string[] PriceRangeIds
        {
            get
            {
                return string.IsNullOrWhiteSpace(PriceRanges) ? new string[0] : PriceRanges.Split(",").ToArray();
            }
            set
            {
                PriceRanges = string.Join(",", value);
            }
        }
    }
}
