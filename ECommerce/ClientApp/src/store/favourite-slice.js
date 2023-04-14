
import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';

const initialValue = {
    products: [],
    pageNumber: 1,
    totalPages: '',
    status: {
        isLoading: false,
        message: '',
        textClass: '',
        alertClass: ''
    }
}

export const getFavouritesAsync = createAsyncThunk(
    'favourite/getFavouritesAsync',
    async (_, { dispatch, getState }) => {
        var pageNumber = getState().favourite.pageNumber;
        var queryString = ''
        queryString += '&pageNumber=' + pageNumber
        queryString = '?' + queryString.slice(1)

        await fetch('/favourites' + queryString)
            .then(result => {
                if (!result.ok) throw result;
                return result.json();
            })
            .then(response => {
                dispatch(favouriteActions.updateProducts(response.data))
            })
            .catch(error => {
                dispatch(favouriteActions.updateProducts([{ result: [], pageNumber: 1, totalPages: 1 }]))
                console.log(error)
            })
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
            state.status.textClass = 'text-warning';
            state.status.alertClass = 'alert-warning';
            state.status.isLoading = true;
        })

        builder.addCase(getFavouritesAsync.fulfilled, (state, action) => {
            state.status.message = '';
            state.status.textClass = 'text-success';
            state.status.alertClass = 'alert-success';
            state.status.isLoading = false;
        })

        builder.addCase(getFavouritesAsync.rejected, (state, action) => {
            state.status.message = '';
            state.status.textClass = 'text-danger';
            state.status.alertClass = 'alert-danger';
            state.status.isLoading = false;
        })
    }
})

export const favouriteActions = favouriteSlice.actions

export default favouriteSlice.reducer;


