
import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import { status } from '../data/status';

const initialValue = {
    filters: {
        categoryIds: [],
        individualCategoryIds: [],
        brandIds: [],
        priceRangeIds: [],
        productCount: 50,
        sortBy: 'Search',
        sortOrder: 'asc',
    },
    status: status
}

export const fetchUserProductFiltersAsync = createAsyncThunk(
    'usrProductFilter/fetchUserProductFiltersAsync',
    async (_, { dispatch, getState }) => {
        const response = await fetch('/userproductfilters')
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

export const saveUserProductFilterAsync = createAsyncThunk(
    'usrProductFilter/saveUserProductFilterAsync',
    async (filters, { dispatch, getState }) => {
        const response = await fetch('/userproductfilters',
        {
            method: 'POST',
            body: JSON.stringify(filters),
            headers: {
                'Content-Type': 'application/json;'
            }
        })
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

const userProductFilterSlice = createSlice({
    name: 'usrProductFilter',
    initialState: initialValue,
    reducers: {
        update(state, action) {
            state.filters = action.payload
        },
        clear(state) {
            state.filters = initialValue.filters
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchUserProductFiltersAsync.pending, (state, action) => {
        })

        builder.addCase(fetchUserProductFiltersAsync.fulfilled, (state, action) => {
            let data = action.payload.data
            let hasData = !!data
            state.filters.brandIds = hasData ? data.brandIds : []
            state.filters.categoryIds = hasData ? data.categoryIds : []
            state.filters.individualCategoryIds = hasData ? data.individualCategoryIds : []
            state.filters.priceRangeIds = hasData ? data.priceRangeIds : []
            state.filters.sortBy = hasData ? data.sortBy : ''
            state.filters.sortOrder = hasData ? data.sortOrder : ''
            state.filters.productCount = hasData ? data.productCount : 50
        })

        builder.addCase(fetchUserProductFiltersAsync.rejected, (state, action) => {
            console.log(state, action)
        })

        builder.addCase(saveUserProductFilterAsync.fulfilled, (state, action) => {
            state.filters.brandIds = action.payload.data.brandIds
            state.filters.categoryIds = action.payload.data.categoryIds
            state.filters.individualCategoryIds = action.payload.data.individualCategoryIds
            state.filters.priceRangeIds = action.payload.data.priceRangeIds
            state.filters.sortBy = action.payload.data.sortBy
            state.filters.sortOrder = action.payload.data.sortOrder
            state.filters.productCount = action.payload.data.productCount
        })
    }
})


export const userProductFilterActions = userProductFilterSlice.actions

export default userProductFilterSlice.reducer;





