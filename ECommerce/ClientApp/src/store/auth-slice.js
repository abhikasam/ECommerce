
import { createSlice } from '@reduxjs/toolkit';


const initialAuthentication = {
    isAuthenticated: false,
    user: {}
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthentication,
    reducers: {
        login(state, action) {
            state.isAuthenticated = true;
            state.user = action.payload
        },
        logout(state) {
            state.isAuthenticated = false;
            state.user = {}
        }
    }
})

export const authActions = authSlice.actions;

export default authSlice.reducer

