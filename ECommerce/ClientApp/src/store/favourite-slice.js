
import { createSlice } from '@reduxjs/toolkit';

const initialValue = {
    favourites:[]
}


const favouriteSlice = createSlice({
    name: 'favourite',
    initialState: initialValue,
    reducers: {
        update(state, action) {
            state.favourites=action.payload
        },
        add(state, action) {
            state.favourites = [...state.favourites, action.payload]
        },
        remove(state, action) {
            state.favourites = state.favourites.filter(i => i.productId != action.payload)
        }
    }
})

export const favouriteActions = favouriteSlice.actions

export default favouriteSlice.reducer;


