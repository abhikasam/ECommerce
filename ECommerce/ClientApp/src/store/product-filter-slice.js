
import { createSlice } from '@reduxjs/toolkit';

const initialValue = {
    productCount: '',
    sortBy: null,
    sortOrder: null,
    brands: []
}

const productFilterSlice = createSlice({
    name: 'product-filter',
    initialState: initialValue,
    reducers: {
        updateBrands(state, action) {
            state.brands = action.payload
        },
        removeBrand(state, action) {
            state.brands = action.payload
        },
        updateProductCount(state, action) {
            state.productCount = action.payload
        },
        updateSortBy(state, action) {
            state.sortBy = action.payload
        },
        updateSortOrder(state, action) {
            state.sortOrder = action.payload
        }
    }
})


export const productFilterActions = productFilterSlice.actions

export default productFilterSlice.reducer;





