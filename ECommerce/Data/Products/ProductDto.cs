using ECommerce.Models.Ecommerce;
using Microsoft.AspNetCore.Mvc.Rendering;
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
        public int Quantity { get; set; }
        public int OriginalPrice { get; set; }
        public int? FinalPrice { get; set; }
        public double Rating { get; set; }
        public int Reviews { get; set; }
        public string Url { get; set; }
        public string BrandName { get; set; }
        public string CategoryName { get; set; }
        public string IndividualCategoryName { get; set; }
        public ICollection<Favourite> Favourites { get; set; }
        public ICollection<Cart> Carts { get; set; }
        public byte[] Photo { get; set; }
        public int Discount
        {
            get
            {
                return (int)((((OriginalPrice - FinalPrice) * 100) / OriginalPrice));
            }
        }
        public bool IsFavourite { get; set; }
        public CartDto CartItem { get; set; }
        public bool IsInCart
        {
            get
            {
                return CartItem != null;
            }
        }
        public IEnumerable<ProductQuantityDto> ProductQuantities { get; set; }
    }
}
