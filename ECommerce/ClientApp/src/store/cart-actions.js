import { cartActions } from "./cart-slice";


export const addToCart = (productId) => {
    return async (dispatch) => {
        async function add() {

            let cartItem = {
                productId,
                quantity: 1
            }

            await fetch('/cart/add',
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
                    dispatch(cartActions.addProduct(response.data))
                    console.log(response)
                })
                .catch(error => {
                    console.log(error)
                })
        }

        add();
    }
}

export const removeFromCart = (productId) => {
    return async (dispatch) => {
        async function remove() {

            let cartItem = {
                productId,
                quantity: 1
            }

            await fetch('/cart/remove',
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
                    dispatch(cartActions.removeProduct(productId))
                })
                .catch(error => {
                    console.log(error)
                })
        }

        remove();
    }
}

