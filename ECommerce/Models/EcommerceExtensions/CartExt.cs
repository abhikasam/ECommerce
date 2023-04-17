using ECommerce.Data.Products;

namespace ECommerce.Models.Ecommerce
{
    public partial class Cart
    {
    }

    public static partial class CartExt
    {
        public static CartDto GetCartDto(this Cart cart)
        {
            if (cart == null) return null;

            return new CartDto()
            {
                CartItemId = cart.CartItemId,
                ProductId = cart.ProductId,
                UserId = cart.UserId,
                UpdatedOn = cart.UpdatedOn
            };
        }
    }

}
