
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
        },
        sort(state, action) {
            state.brands = state.brands.sort(function (a, b) {
                return action.payload.includes(a.key) > action.payload.includes(b.key) ? 1 :-1
            }).reverse()
        },
        clear(state) {
            state.brands=[]
        }
    }
})


export const brandActions = brandSlice.actions

export default brandSlice.reducer;





