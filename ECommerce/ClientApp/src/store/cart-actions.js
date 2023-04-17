import { cartActions } from "./cart-slice";
import { favouriteActions } from "./favourite-slice";
import { productActions } from "./product-slice";

export const upadteProductCart = (productId) => {
    return async (dispatch) => {
        async function update() {

            let cartItem = {
                productId
            }

            await fetch('/cart/update',
                {
                    method: 'POST',
                    body: JSON.stringify(cartItem),
                    headers: {
                        'Content-Type': 'application/json;'
                    }
                })
                .then(result => {
                    if (!result.ok) throw result;
                    return result.json();
                })
                .then(response => {
                    dispatch(cartActions.updateProduct(response.data))
                    dispatch(favouriteActions.updateProduct(response.data))
                    dispatch(productActions.updateProduct(response.data))
                })
                .catch(error => {
                    console.log(error)
                })
        }

        update();
    }
}

