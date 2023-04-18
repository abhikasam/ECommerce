
import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';

const initialValue = {
    categories: []
}


export const fetchCategoriesAsync = createAsyncThunk(
    'category/fetchCategoriesAsync',
    async (_, { dispatch, getState }) => {

        let categories = getState().category.categories

        if (categories.length) {
            return;
        }

        const response =
            await fetch('/categories')
                .then(data => {
                    if (!data.ok) throw data;
                    return data.json();
                })
                .then(result => {
                    dispatch(categoryActions.update(result.data))
                })
                .catch(error => {
                    dispatch(categoryActions.update([]))
                    console.log(error)
                })
        return response;
    }
)

export const sortCategories = () => {
    return async (dispatch, getState) => {
        var store = getState()
        var selectedCategories = store.product.filters.categories.map(i => parseInt(i))
        if (selectedCategories.length) {
            dispatch(categoryActions.sort(selectedCategories))
        }
    }
}


const categorySlice = createSlice({
    name: 'category',
    initialState: initialValue,
    reducers: {
        update(state, action) {
            state.categories = action.payload
        },
        sort(state, action) {
            state.categories = state.categories.sort(function (a, b) {
                return action.payload.includes(a.key) > action.payload.includes(b.key) ? 1 : -1
            }).reverse()
        },
        clear(state) {
            state.categories=[]
        }
    }
})

export const categoryActions = categorySlice.actions

export default categorySlice.reducer;





