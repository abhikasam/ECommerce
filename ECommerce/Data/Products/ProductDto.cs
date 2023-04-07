using ECommerce.Models.Ecommerce;
using System;

namespace ECommerce.Data.Products
{
    public class ProductDto
    {
        public int ProductId { get; set; }
        public string Description { get; set; }
        public int BrandId { get; set; }
        public int CategoryId { get; set; }
        public int IndividualCategoryId { get; set; }
        public int OriginalPrice { get; set; }
        public int? FinalPrice { get; set; }
        public string SizeOptions { get; set; }
        public double Rating { get; set; }
        public int Reviews { get; set; }
        public string Url { get; set; }
        public string BrandName { get; set; }
        public string CategoryName { get; set; }
        public string IndividualCategoryName { get; set; }
        public int Discount
        {
            get
            {
                return (int)((((OriginalPrice - FinalPrice)*100) / OriginalPrice));
            }
        }

        private static Random random = new Random();
        public string Background
        {
            get
            {
                var colors = new string[] { "#c2185b", "#33691e", "#01579b", "#fe6700", "#d01c1f", "#d73c26", "#65318e", "#eb5406" };
                var number=random.Next(0, colors.Length);
                return colors[number];
            }
        }

        public string Alphabet
        {
            get
            {
                int num = random.Next(0, 26); 
                char let = (char)('A' + num);
                return ""+let;
            }
        }

    }
}
