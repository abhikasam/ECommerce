
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
            if (state.brands.includes(action.payload)) {
                state.brands = state.brands.filter(id => id !== action.payload)
            }
            else {
                state.brands.push(action.payload)
            }
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





