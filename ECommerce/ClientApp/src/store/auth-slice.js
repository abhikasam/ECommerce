
import { createSlice } from '@reduxjs/toolkit';


const initialAuthentication = {
    isAuthenticated: false,
    user: {},
    expiresIn: 0
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthentication,
    reducers: {
        login(state, action) {
            state.isAuthenticated = true;
            state.user = action.payload.user
            state.expiresIn = action.payload.expiresIn
        },
        logout(state) {
            state.isAuthenticated = false;
            state.user = {};
            state.expiresIn = 0
        }
    }
})


export const authActions = authSlice.actions;

export default authSlice.reducer

