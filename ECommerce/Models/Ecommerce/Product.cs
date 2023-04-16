using System;
using System.Collections.Generic;

namespace ECommerce.Models.Ecommerce
{
    public partial class Product
    {
        public Product()
        {
            Carts = new HashSet<Cart>();
            Orders = new HashSet<Order>();
            ProductQuantities = new HashSet<ProductQuantity>();
        }

        public int ProductId { get; set; }
        public string Description { get; set; }
        public int BrandId { get; set; }
        public int CategoryId { get; set; }
        public int IndividualCategoryId { get; set; }
        public int OriginalPrice { get; set; }
        public int? FinalPrice { get; set; }
        public double Rating { get; set; }
        public int Reviews { get; set; }
        public string Url { get; set; }
        public byte[] Photo { get; set; }
        public int Quantity { get; set; }
        public int Available { get; set; }

        public virtual Brand Brand { get; set; }
        public virtual Category Category { get; set; }
        public virtual IndividualCategory IndividualCategory { get; set; }
        public virtual ICollection<Cart> Carts { get; set; }
        public virtual ICollection<Order> Orders { get; set; }
        public virtual ICollection<ProductQuantity> ProductQuantities { get; set; }
    }
}
