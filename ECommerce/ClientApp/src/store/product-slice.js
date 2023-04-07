﻿
import { createSlice } from '@reduxjs/toolkit';

const initialValue = {
    products: [],
    pageNumber: '',
    totalPages: '',
    filters: {
        productCount: '',
        sortBy: null,
        sortOrder: null,
        brands: [],
        categories: [],
        individualCategories: []
    }
}

const productSlice = createSlice({
    name: 'product',
    initialState: initialValue,
    reducers: {
        update(state, action) {
            state.products = action.payload.result
        },
        updateTotalPages(state, action) {
            state.totalPages = action.payload
        },
        updatePageNumber(state, action) {
            state.pageNumber = action.payload
        },
        updateBrands(state, action) {
            state.filters.brands = action.payload
        },
        updateCategories(state, action) {
            state.filters.categories = action.payload
        },
        updateIndividualCategories(state, action) {
            state.filters.individualCategories = action.payload
        },
        updateProductCount(state, action) {
            state.filters.productCount = action.payload
            state.pageNumber = 1
        },
        updateSortBy(state, action) {
            state.filters.sortBy = action.payload
        },
        updateSortOrder(state, action) {
            state.filters.sortOrder = action.payload
        }
    }
})


export const productActions = productSlice.actions

export default productSlice.reducer;


