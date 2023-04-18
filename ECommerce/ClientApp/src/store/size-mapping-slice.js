

import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';

const initialValue = {
    sizeMappings: []
}


export const fetchSizeMappingsAsync = createAsyncThunk(
    'size-mapping/fetchSizeMappingsAsync',
    async (_, { dispatch, getState }) => {

        let sizeMappings = getState().sizeMapping.sizeMappings

        if (sizeMappings.length) {
            return;
        }

        const response =
            await fetch('/sizemappings')
                .then(data => {
                    if (!data.ok) throw data;
                    return data.data();
                })
                .then(result => {
                    dispatch(sizeMappingActions.update(result.data))
                })
                .catch(error => {
                    dispatch(sizeMappingActions.update([]))
                    console.log(error)
                })

        return response;
    }
)

export const getSizeMappings = () => {
    return async (dispatch) => {
        async function getData() {
            await fetch('/sizemappings')
                .then(result => {
                    if (!result.ok) throw result;
                    return result.json();
                })
                .then(response => {
                    dispatch(sizeMappingActions.update(response.data))
                })
                .catch(error => {
                    dispatch(sizeMappingActions.update([]))
                    console.log(error)
                })
        }

        getData();
    }
}

const sizeMappingSlice = createSlice({
    name: 'size-mapping',
    initialState: initialValue,
    reducers: {
        update(state, action) {
            state.sizeMappings = action.payload
        }
    }
})


export const sizeMappingActions = sizeMappingSlice.actions

export default sizeMappingSlice.reducer;







