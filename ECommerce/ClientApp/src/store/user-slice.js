import { datedOrderList, paginatedList } from "../data/paginatedList";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialValue = {
    users: paginatedList,
    selectedUser: {
        user: {},
        favourites: paginatedList,
        cart: paginatedList,
        orders: datedOrderList
    }
}


const userSlice = createSlice(
    {
        name: 'user',
        initialState: initialValue,
        reducer: {
            updateUsers(state, action){
                state.users=action.payload
            }
        }
    }
)

export const userActions = userSlice.actions;

export default userSlice.reducer;


