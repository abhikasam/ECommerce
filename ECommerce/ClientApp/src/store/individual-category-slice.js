
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





