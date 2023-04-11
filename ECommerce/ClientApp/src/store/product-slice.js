
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
        },
        updateCategories(state, action) {
            state.filters.categories = action.payload
        },
        updateIndividualCategories(state, action) {
            state.filters.individualCategories = action.payload
        },
        updatePriceRanges(state, action) {
            state.filters.priceRanges = action.payload
        },
        updateProductCount(state, action) {
            state.filters.productCount = action.payload
        },
        updateSortBy(state, action) {
            state.filters.sortBy = action.payload
        },
        updateSortOrder(state, action) {
            state.filters.sortOrder = action.payload
        },
        clar(state) {
            state.products = []
            state.filters = {}
            state.pageNumber = 1
            state.totalPages=''
        }
    }
})


export const productActions = productSlice.actions

export default productSlice.reducer;


