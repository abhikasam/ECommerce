
import { createSlice } from '@reduxjs/toolkit';

const initialValue = {
    individualCategories: []
}

const individualCategorySlice = createSlice({
    name: 'individual-category',
    initialState: initialValue,
    reducers: {
        update(state, action) {
            state.individualCategories = action.payload
        }
    }
})

export const individualCategoryActions = individualCategorySlice.actions

export default individualCategorySlice.reducer;





