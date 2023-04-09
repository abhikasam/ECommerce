

import { createSlice } from '@reduxjs/toolkit';

const initialValue = {
    sizeMappings: []
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







