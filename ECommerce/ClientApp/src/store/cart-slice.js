
import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import { favouriteActions } from "./favourite-slice";
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
    async ({ pageNumber = 1,getAll=false }, { dispatch, getState }) => {
        var queryString = ''
        queryString += '&pageNumber=' + pageNumber
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
                dispatch(cartActions.updateProduct(result.data))
                dispatch(favouriteActions.updateProduct(result.data))
                dispatch(productActions.updateProduct(result.data))
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
        updateProduct(state, action) {
            let productIds = state.products.result.map(i => i.productId)
            if (productIds.includes(action.payload.productId)) {
                state.products.result = state.products.result.filter(i => i.productId !== action.payload.productId)
            }
            else {
                state.products.result.push(action.payload)
            }
        },
        removeProduct(state, action) {
            state.products.result = state.products.result.filter(i => i.productId !== action.payload)
        },
        removeProducts(state, action) {
            state.products.result = state.products.result.filter(i => !action.payload.includes(i.productId))
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






