
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { sortBrands } from './brand-slice';
import { sortCategories } from './category-slice';
import { sortIndividualCategories } from './individual-category-slice';
import { status } from '../shared/status';

const initialValue = {
    products: [],
    totalPages: '',
    filters: {
        search:'',
        productCount: '',
        pageNumber:1,
        sortBy: '',
        sortOrder: '',
        brands: [],
        categories: [],
        priceRanges:[],
        individualCategories: []
    },
    status: status
}


export const getProductsAsync = createAsyncThunk(
    'product/getProductsAsync',
    async (filters, { dispatch, getState }) => {
        var queryString = ''
        if (filters.productCount)
            queryString += '&productCount=' + filters.productCount
        if (filters.pageNumber)
            queryString += '&pageNumber=' + filters.pageNumber
        if (filters.search)
            queryString += '&search=' + filters.search
        if (filters.sortBy)
            queryString += '&sortBy=' + filters.sortBy
        if (filters.sortOrder)
            queryString += '&sortOrder=' + filters.sortOrder
        if (filters.brands)
            queryString += '&brands=' + filters.brands.join(',')
        if (filters.categories)
            queryString += '&categories=' + filters.categories.join(',')
        if (filters.individualCategories)
            queryString += '&individualCategories=' + filters.individualCategories.join(',')
        if (filters.priceRanges)
            queryString += '&priceRanges=' + filters.priceRanges.join(',')
        queryString = '?' + queryString.slice(1)

        const response = await fetch('/products' + queryString)
            .then(result => {
                if (!result.ok) throw result;
                return result.json();
            })
        return response;
    }
)

export const updateFiltersAsync = createAsyncThunk(
    'product/updateFiltersAsync',
    async (response, { dispatch, getState }) => {
        response
            .then(response => {
            dispatch(productActions.update(response.payload.data))
            dispatch(productActions.updateFilters(response.payload.data.filters))
            dispatch(productActions.updateTotalPages(response.payload.data.totalPages))
            dispatch(sortBrands())
            dispatch(sortCategories())
            dispatch(sortIndividualCategories())
        })
        .catch(error => {
            dispatch(productActions.clear())
        })
    }
)

export const getProductAsync = createAsyncThunk(
    'product/getProductAsync',
    async (productId, { dispatch, getState }) => {
        const response =
            await fetch('/products/' + productId)
            .then(result => {
                if (!result.ok) throw result;
                return result.json();
            })
            .then(response => {
                return response;
            })
            .catch(error => {
                return error;
            })
        return response;
    }
)


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
            state.filters.pageNumber = action.payload
        },
        updateSearch(state, action) {
            state.filters.search = action.payload
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
        updateFilters(state, action) {
            state.filters = action.payload
        },
        clear(state) {
            state.products = initialValue.products
            state.filters = initialValue.filters
            state.totalPages = initialValue.totalPages
            state.status = initialValue.status
        },
        updateProduct(state, action) {
            let productIds = state.products.map(i => i.productId)
            if (productIds.includes(action.payload.productId)) {
                let index = state.products.findIndex(x => x.productId == action.payload.productId)
                state.products[index] = action.payload
            }
            else {
                state.products.push(action.payload)
            }
        }
    },
    extraReducers:(builder) => {
        builder.addCase(getProductsAsync.pending, (state, action) => {
            state.status.message = 'Loading products...';
            state.status.type = 'warning';
        })

        builder.addCase(getProductsAsync.fulfilled, (state, action) => {
            state.status.message = '';
            state.status.type = '';
        })

        builder.addCase(getProductsAsync.rejected, (state, action) => {
            state.status.message = 'Unable to fetch products';
            state.status.type = 'danger';
        })
    }
})


export const productActions = productSlice.actions

export default productSlice.reducer;


