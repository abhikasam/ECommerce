
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { sortBrands } from './brand-slice';
import { sortCategories } from './category-slice';
import { sortIndividualCategories } from './individual-category-slice';
import { status } from '../data/status';
import { statusActions } from './status-slice';
import { paginatedList } from '../data/paginatedList';

const initialValue = {
    products: paginatedList,
    filters: {
        search: '',
        productCount: '',
        sortBy: '',
        sortOrder: '',
        brands: [],
        categories: [],
        priceRanges: [],
        individualCategories: []
    },
    selectedProduct: {
        favourites: paginatedList,
        carts: paginatedList,
        orders:[]
    },
    status: status
}


export const getProductsAsync = createAsyncThunk(
    'product/getProductsAsync',
    async ({ filters, pageNumber }, { dispatch, getState }) => {

        let products = getState().product.products.result;

        if (!pageNumber && products.length) {
            return products;
        }

        var queryString = ''
        if (filters.productCount)
            queryString += '&productCount=' + filters.productCount
        if (pageNumber)
            queryString += '&pageNumber=' + pageNumber
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
            .then(result => {
                dispatch(productActions.update(result.data))
                dispatch(sortBrands())
                dispatch(sortCategories())
                dispatch(sortIndividualCategories())
                return result;
            })
            .catch(error=>error)
        return response;
    }
)

export const updateFiltersAsync = createAsyncThunk(
    'product/updateFiltersAsync',
    async ({ filters, pageNumber }, { dispatch, getState }) => {
        dispatch(productActions.updateFilters(filters))
        dispatch(sortBrands())
        dispatch(sortCategories())
        dispatch(sortIndividualCategories())
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

export const saveProductAsync = createAsyncThunk(
    'product/saveProductAsync',
    async (form, { dispatch, getState }) => {
        const response =
            await fetch('products'
                , {
                    method: 'POST',
                    body: JSON.stringify(form),
                    headers: {
                        'Content-Type': 'application/json;'
                    }
                }
            )
                .then(data => {
                    if (!data.ok) throw data;
                    return data.json();
                })
                .then(result => {
                    dispatch(statusActions.add(result))
                    return result;
                })
                .catch(error => {
                    dispatch(statusActions.add(error))
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
            state.products = action.payload.products
            state.filters = action.payload.filters
        },
        updateSelectedProductFavourites(state, action) {
            state.selectedProduct.favourites = action.payload;
        },
        updateSelectedProductCarts(state, action) {
            state.selectedProduct.carts = action.payload;
        },
        updateSelectedProductOrders(state, action) {
            state.selectedProduct.orders = action.payload;
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
        addFavourite(state, action) {
            let index = state.products.result.findIndex(i => i.productId == action.payload)
            state.products.result[index].isFavourite = true
        },
        removeFavourite(state, action) {
            let index = state.products.result.findIndex(i => i.productId == action.payload)
            state.products.result[index].isFavourite = false
        },
        addCart(state, action) {
            let index = state.products.result.findIndex(i => i.productId == action.payload)
            state.products.result[index].isInCart = true
        },
        removeCart(state, action) {
            let index = state.products.result.findIndex(i => i.productId == action.payload)
            state.products.result[index].isInCart = false
        },
        updateFilters(state, action) {
            state.filters = action.payload
        },
        clear(state) {
            state.products = initialValue.products
            state.filters = initialValue.filters
            state.status = initialValue.status
        },
        updateProduct(state, action) {
            let productIds = state.products.result.map(i => i.productId)
            if (productIds.includes(action.payload.productId)) {
                let index = state.products.result.findIndex(x => x.productId == action.payload.productId)
                state.products.result[index] = action.payload
            }
            else {
                state.products.result.push(action.payload)
            }
        }
    },
    extraReducers: (builder) => {
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


