
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





