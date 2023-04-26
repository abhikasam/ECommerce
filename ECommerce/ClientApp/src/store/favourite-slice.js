
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { status } from '../data/status';
import { paginatedList } from '../data/paginatedList';
import { productActions } from './product-slice';
import { cartActions, getCartAsync } from './cart-slice';

const initialValue = {
    products: paginatedList,
    status: status
}

export const getFavouritesAsync = createAsyncThunk(
    'favourite/getFavouritesAsync',
    async (pageNumber, { dispatch, getState }) => {

        let products = getState().favourite.products.result;

        if (!pageNumber && products.length) {
            return products;
        }

        var queryString = ''
        if (pageNumber) {
            queryString += '&pageNumber=' + pageNumber
        }
        queryString = '?' + queryString.slice(1)

        const response =
            await fetch('/favourites' + queryString)
                .then(data => {
                    if (!data.ok) throw data;
                    return data.json();
                })
                .then(result => {
                    dispatch(favouriteActions.updateProducts(result.data))
                    return result;
                })
                .catch(error => {
                    dispatch(favouriteActions.updateProducts([{ result: [], pageNumber: 1, totalPages: 1 }]))
                    return error;
                })
        return response;
    }
)

export const getUsersAddedFavourites = createAsyncThunk(
    'favourite/getUsersAddedFavourites',
    async ({ productId, pageNumber = 1 }, { dispatch, getState }) => {
        var queryString = ''
        queryString += '&productId=' + productId
        queryString += '&pageNumber=' + pageNumber
        queryString = '?' + queryString.slice(1)

        const response =
            await fetch('/favourites/productfavourites' + queryString)
                .then(data => {
                    if (!data.ok) throw data;
                    return data.json();
                })
                .then(result => {
                    dispatch(productActions.updateSelectedProductFavourites(result.data))
                    return result;
                })
                .catch(error => {
                    return error;
                })
        return response;
    }
)

export const addFavouriteAsync = createAsyncThunk(
    'favourite/addFavouriteAsync',
    async (productId, { dispatch, getState }) => {

        const response =
            await fetch('/favourites/add', {
                method: 'POST',
                body: JSON.stringify(productId),
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
                    let products = getState().product.products

                    if (cartProducts.result.map(i => i.productId).includes(productId)) {
                        dispatch(cartActions.addFavourite(productId))
                    }

                    dispatch(getFavouritesAsync(1))

                    if (products.result.map(i => i.productId).includes(productId)) {
                        dispatch(productActions.addFavourite(productId))
                    }

                    return result;
                })
                .catch(error => {
                    return error;
                })

        return response;
    }
)

export const removeFavouriteAsync = createAsyncThunk(
    'favourite/removeFavouriteAsync',
    async (productId, { dispatch, getState }) => {

        const response =
            await fetch('/favourites/remove', {
                method: 'POST',
                body: JSON.stringify(productId),
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

                    if (cartProducts.result.map(i => i.productId).includes(productId)) {
                        dispatch(cartActions.removeFavourite(productId))
                    }
                    if (favouriteProducts.result.map(i => i.productId).includes(productId)) {
                        dispatch(getFavouritesAsync(favouriteProducts.pageNumber))
                    }
                    else {
                        dispatch(getFavouritesAsync(1))
                    }
                    if (products.result.map(i => i.productId).includes(productId)) {
                        dispatch(productActions.removeFavourite(productId))
                    }

                    return result;
                })
                .catch(error => {
                    return error;
                })

        return response;

    }
)


const favouriteSlice = createSlice({
    name: 'favourite',
    initialState: initialValue,
    reducers: {
        updateProducts(state, action) {
            state.products = action.payload
        },
        updatePageNumber(state, action) {
            state.products.pageNumber = action.payload
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
            state.status = status
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getFavouritesAsync.pending, (state, action) => {
            state.status.message = 'Loading favourites...';
            state.status.type = 'warning';
        })

        builder.addCase(getFavouritesAsync.fulfilled, (state, action) => {
            state.status.message = '';
            state.status.type = '';
        })

        builder.addCase(getFavouritesAsync.rejected, (state, action) => {
            state.status.message = '';
            state.status.type = 'danger';
        })
    }
})

export const favouriteActions = favouriteSlice.actions

export default favouriteSlice.reducer;


