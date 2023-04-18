

import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';

const initialValue = {
    categoryMappings: []
}

export const fetchCategoryMappingsAsync = createAsyncThunk(
    'categoryMapping/fetchCategoryMappingsAsync',
    async (_, { dispatch, getState }) => {

        let categoryMappings = getState().categoryMapping.categoryMappings

        if (categoryMappings.length) {
            return;
        }

        const response =
            await fetch('/categorymappings')
                .then(data => {
                    if (!data.ok) throw data;
                    return data.json();
                })
                .then(result => {
                    dispatch(categoryMappingActions.update(result.data))
                })
                .catch(error => {
                    dispatch(categoryMappingActions.update([]))
                    console.log(error)
                })

        return response;

    }
)

export const getCategoryMappings = () => {
    return async (dispatch) => {
        async function getData() {
            await fetch('/categorymappings')
                .then(result => {
                    if (!result.ok) throw result;
                    return result.json();
                })
                .then(response => {
                    dispatch(categoryMappingActions.update(response.data))
                })
                .catch(error => {
                    dispatch(categoryMappingActions.update([]))
                    console.log(error)
                })
        }

        getData();
    }
}

const categoryMappingSlice = createSlice({
    name: 'category-mapping',
    initialState: initialValue,
    reducers: {
        update(state, action) {
            state.categoryMappings = action.payload
        }
    }
})


export const categoryMappingActions = categoryMappingSlice.actions

export default categoryMappingSlice.reducer;







