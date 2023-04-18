
import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';

const initialValue = {
    individualCategories: []
}

export const fetchIndividualCategoriesAsync = createAsyncThunk(
    'individual-category/fetchIndividualCategoriesAsync',
    async (_, { dispatch, getState }) => {

        let individualCategories = getState().individualCategory.individualCategories

        if (individualCategories.length) {
            return;
        }

        const response =
            await fetch('/individualCategories')
                .then(data => {
                    if (!data.ok) throw data;
                    return data.json();
                })
                .then(result => {
                    dispatch(individualCategoryActions.update(result.data))
                })
                .catch(error => {
                    dispatch(individualCategoryActions.update([]))
                    console.log(error)
                })
        return response;
    }
)


export const sortIndividualCategories = () => {
    return async (dispatch, getState) => {
        var store = getState()
        var selectedIndividualCategories = store.product.filters.individualCategories.map(i => parseInt(i))
        if (selectedIndividualCategories.length) {
            dispatch(individualCategoryActions.sort(selectedIndividualCategories))
        }
    }
}

const individualCategorySlice = createSlice({
    name: 'individual-category',
    initialState: initialValue,
    reducers: {
        update(state, action) {
            state.individualCategories = action.payload
        },
        sort(state, action) {
            state.individualCategories = state.individualCategories.sort(function (a, b) {
                return action.payload.includes(a.key) > action.payload.includes(b.key) ? 1 : -1
            }).reverse()
        },
        clear(state) {
            state.individualCategories=[]
        }
    }
})

export const individualCategoryActions = individualCategorySlice.actions

export default individualCategorySlice.reducer;





