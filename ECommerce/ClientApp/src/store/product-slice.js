
import { createSlice } from '@reduxjs/toolkit';

const initialValue = {
    products: [],
}

const productSlice = createSlice({
    name: 'product',
    initialState: initialValue,
    reducers: {
        update(state, action) {
            state.products = action.payload.result
        },
        updatePageNumber(state, action) {
            state.pageNumber = action.payload
        }
    }
})


export const productActions = productSlice.actions

export default productSlice.reducer;


