
import { createSlice } from '@reduxjs/toolkit';

const initialValue = {
    products: [],
    pageNumber: 1,
    totalPages:''
}


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
    }
})

export const favouriteActions = favouriteSlice.actions

export default favouriteSlice.reducer;


