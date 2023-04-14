
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

export const getCartAsync = createAsyncThunk(
    'favourite/getCartAsync',
    async (_, { dispatch, getState }) => {
        var pageNumber = getState().cart.pageNumber;
        var queryString = ''
        queryString += '&pageNumber=' + pageNumber
        queryString = '?' + queryString.slice(1)

        await fetch('/cart' + queryString)
            .then(result => {
                if (!result.ok) throw result;
                return result.json();
            })
            .then(response => {
                dispatch(cartActions.updateProducts(response.data))
            })
            .catch(error => {
                dispatch(cartActions.updateProducts([{ result: [], pageNumber: 1, totalPages: 1 }]))
                console.log(error)
            })
    }
)


const cartSlice = createSlice({
    name: 'cart',
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
        builder.addCase(getCartAsync.pending, (state, action) => {
            state.status.message = 'Loading cart...';
            state.status.textClass = 'text-warning';
            state.status.alertClass = 'alert-warning';
            state.status.isLoading = true;
        })

        builder.addCase(getCartAsync.fulfilled, (state, action) => {
            state.status.message = '';
            state.status.textClass = 'text-success';
            state.status.alertClass = 'alert-success';
            state.status.isLoading = false;
        })

        builder.addCase(getCartAsync.rejected, (state, action) => {
            state.status.message = '';
            state.status.textClass = 'text-danger';
            state.status.alertClass = 'alert-danger';
            state.status.isLoading = false;
        })
    }
})


export const cartActions = cartSlice.actions

export default cartSlice.reducer;






