
import { createSlice } from '@reduxjs/toolkit';

const initialValue = {
    brands: []
}

const brandSlice = createSlice({
    name: 'brand',
    initialState: initialValue,
    reducers: {
        update(state, action) {
            state.brands = action.payload
        }
    }
})


export const brandActions = brandSlice.actions

export default brandSlice.reducer;





