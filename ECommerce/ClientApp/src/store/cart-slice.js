
import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import { favouriteActions, getFavouritesAsync } from "./favourite-slice";
import { productActions } from "./product-slice";
import { status } from '../data/status';
import { paginatedList } from '../data/paginatedList';

const initialValue = {
    products: paginatedList,
    allProducts:[],
    status: status
}

export const getCartAsync = createAsyncThunk(
    'cart/getCartAsync',
    async ({ pageNumber, getAll = false }, { dispatch, getState }) => {

        let products = getState().cart.products.result;

        if (!pageNumber && products.length) {
            return products;
        }
        
        var queryString = ''
        if (pageNumber) {
            queryString += '&pageNumber=' + pageNumber
        }
        queryString += '&getAll=' + getAll
        queryString = '?' + queryString.slice(1)

        const response=await fetch('/cart' + queryString)
            .then(data => {
                if (!data.ok) throw data;
                return data.json();
            })
            .then(result => {
                if (getAll) {
                    dispatch(cartActions.updateAllProducts(result.data))
                }
                else{
                    dispatch(cartActions.updateProducts(result.data))
                }
            })
            .catch(error => {
                if (getAll) {
                    dispatch(cartActions.updateAllProducts([]))
                }
                else {
                    dispatch(cartActions.updateProducts([{ result: [], pageNumber: 1, totalPages: 1 }]))
                }
                console.log(error)
            })
        return response;
    }
)

export const getUsersAddedToCart = createAsyncThunk(
    'cart/getUsersAddedToCart',
    async ({ productId, pageNumber = 1 }, { dispatch, getState }) => {
        var queryString = ''
        queryString += '&productId=' + productId
        queryString += '&pageNumber=' + pageNumber
        queryString = '?' + queryString.slice(1)

        const response =
            await fetch('/cart/productcarts' + queryString)
                .then(data => {
                    if (!data.ok) throw data;
                    return data.json();
                })
                .then(result => {
                    dispatch(productActions.updateSelectedProductCarts(result.data))
                    return result;
                })
                .catch(error => {
                    return error;
                })
        return response;
    }
)


export const updateProductCartAsync = createAsyncThunk(
    'cart/updateProductCartAsync',
    async (productId, { dispatch, getState }) => {
        let cartItem = {
            productId
        }

        const response=
        await fetch('/cart/update',
            {
                method: 'POST',
                body: JSON.stringify(cartItem),
                headers: {
                    'Content-Type': 'application/json;'
                }
            })
                .then(data => {
                if (!data.ok) throw data;
                    return data.json();
            })
                .then(result => {
                    let cartProducts = getState().cart.products
                    let favouriteProducts = getState().favourite.products
                    let products = getState().product.products

                    if (result.data.isInCart) {

                        dispatch(getCartAsync({ pageNumber: 1 }))

                        if (favouriteProducts.result.map(i => i.productId).includes(productId)) {
                            dispatch(favouriteActions.addCart(productId))
                        }
                        if (products.result.map(i => i.productId).includes(productId)) {
                            dispatch(productActions.addCart(productId))
                        }
                    }
                    else {
                        if (cartProducts.result.map(i => i.productId).includes(productId)) {
                            dispatch(getCartAsync({ pageNumber: cartProducts.pageNumber }))
                        }
                        else {
                            dispatch(getCartAsync({ pageNumber: 1 }))
                        }
                        if (favouriteProducts.result.map(i => i.productId).includes(productId)) {
                            dispatch(favouriteActions.removeCart(productId))
                        }
                        if (products.result.map(i => i.productId).includes(productId)) {
                            dispatch(productActions.removeCart(productId))
                        }
                    }

                return result;
            })
            .catch(error => {
                console.log(error)
                return error;
            })
        return response;
    }
)

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialValue,
    reducers: {
        updateProducts(state, action) {
            state.products = action.payload
        },
        updatePageNumber(state, action) {
            state.products.pageNumber = action.payload
        },
        updateAllProducts(state, action) {
            state.allProducts = action.payload
        },
        addFavourite(state, action) {
            let index = state.products.result.findIndex(i => i.productId == action.payload)
            state.products.result[index].isFavourite = true
        },
        removeFavourite(state, action) {
            let index = state.products.result.findIndex(i => i.productId == action.payload)
            state.products.result[index].isFavourite = false
        },
        addCart(state, action) {
            let index = state.products.result.findIndex(i => i.productId == action.payload)
            state.products.result[index].isInCart = true
        },
        removeCart(state, action) {
            let index = state.products.result.findIndex(i => i.productId == action.payload)
            state.products.result[index].isInCart = false
        },
        clear(state, action) {
            state.products = paginatedList
            state.allProducts=[]
            state.status = status
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getCartAsync.pending, (state, action) => {
            state.status.message = 'Loading cart...';
            state.status.type = 'warning';
        })

        builder.addCase(getCartAsync.fulfilled, (state, action) => {
            state.status.message = '';
            state.status.type = '';
        })

        builder.addCase(getCartAsync.rejected, (state, action) => {
            state.status.message = 'Unable to fetch cart';
            state.status.type = 'danger';
        })
    }
})


export const cartActions = cartSlice.actions

export default cartSlice.reducer;






