
import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import { status } from '../shared/status';

const initialValue = {
    products: [],
    pageNumber: 1,
    totalPages: '',
    status: status
}

export const getFavouritesAsync = createAsyncThunk(
    'favourite/getFavouritesAsync',
    async (_, { dispatch, getState }) => {
        var pageNumber = getState().favourite.pageNumber;
        var queryString = ''
        queryString += '&pageNumber=' + pageNumber
        queryString = '?' + queryString.slice(1)

        const response=
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
                console.log(error)
                return error;
            })
        return response;
    }
)

export const getUsersAddedFavourites = createAsyncThunk(
    'favourite/getUsersAddedFavourites',
    async (productId, { dispatch, getState }) => {
        const response =
            await fetch('/favourites/productfavourites?productId=' + productId)
            .then(data => {
                if (!data.ok) throw data;
                return data.json();
            })
            .then(result => {
                return result;
            })
            .catch(error => {
                console.log(error)
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
                dispatch(favouriteActions.addProduct(result.data))
                return result;
            })
            .catch(error => {
                console.log(error)
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
                dispatch(favouriteActions.removeProduct(result.data))
                return result;
            })
            .catch(error => {
                console.log(error)
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
            state.products = action.payload.result
            state.pageNumber = action.payload.pageNumber
            state.totalPages = action.payload.totalPages
        },
        updatePageNumber(state, action) {
            state.pageNumber = action.payload
        },
        updateProduct(state, action) {
            let productIds = state.products.map(i => i.productId)
            if (productIds.includes(action.payload.productId)) {
                let index = state.products.findIndex(x => x.productId == action.payload.productId)
                state.products[index] = action.payload
            }
        },
        addProduct(state, action) {
            state.products = [...state.products, action.payload]
        },
        removeProduct(state, action) {
            state.products = state.products.filter(i => i.productId != action.payload)
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


