
import { createSlice } from '@reduxjs/toolkit';

const initialValue = {
    categories: []
}

const categorySlice = createSlice({
    name: 'category',
    initialState: initialValue,
    reducers: {
        update(state, action) {
            state.categories = action.payload
        }
    }
})

export const categoryActions = categorySlice.actions

export default categorySlice.reducer;





