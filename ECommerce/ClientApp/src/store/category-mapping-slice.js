

import { createSlice } from '@reduxjs/toolkit';

const initialValue = {
    categoryMappings: []
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







