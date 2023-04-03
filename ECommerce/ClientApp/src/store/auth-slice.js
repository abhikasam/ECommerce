
import { createSlice } from '@reduxjs/toolkit';


const initialAuthentication = {
    isAuthenticated: false,
    user: {},
    expiresIn: 0,
    timeLeft:0
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthentication,
    reducers: {
        login(state, action) {
            state.isAuthenticated = true;
            state.user = action.payload.user
            state.expiresIn = action.payload.expiresIn
            state.timeLeft = action.payload.timeLeft
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

