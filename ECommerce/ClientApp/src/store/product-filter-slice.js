
import { createSlice } from '@reduxjs/toolkit';

const initialValue = {
    productCount: '',
    sortBy: null,
    sortOrder: null,
    brands: [],
    categories: [],
    individualCategories:[]
}

const productFilterSlice = createSlice({
    name: 'product-filter',
    initialState: initialValue,
    reducers: {
        updateBrands(state, action) {
            state.brands = action.payload
        },
        updateCategories(state, action) {
            state.categories = action.payload
        },
        updateIndividualCategories(state, action) {
            state.individualCategories = action.payload
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





