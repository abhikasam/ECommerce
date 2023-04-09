﻿
import { createSlice } from '@reduxjs/toolkit';

const initialValue = {
    products: [],
    pageNumber: 1,
    totalPages: '',
    filters: {
        productCount: '',
        sortBy: null,
        sortOrder: null,
        brands: [],
        categories: [],
        priceRanges:[],
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
            state.pageNumber = 1
        },
        updateCategories(state, action) {
            state.filters.categories = action.payload
            state.pageNumber = 1
        },
        updateIndividualCategories(state, action) {
            state.filters.individualCategories = action.payload
            state.pageNumber = 1
        },
        updatePriceRanges(state, action) {
            state.filters.priceRanges = action.payload
            state.pageNumber = 1
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


