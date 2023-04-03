
import { createSlice } from '@reduxjs/toolkit';

const initialValue = {
    hasStatus:false,
    message: '',
    alertClass: '',
    textClass: ''
}

const statusSlice = createSlice({
    name: 'error',
    initialState: initialValue,
    reducers: {
        clear(state) {
            state.hasStatus = false;
            state.message = '';
            state.alertClass = '';
            state.textClass = '';
        },
        add(state, action) {
            state.hasStatus = true;
            state.message = action.payload.message;
            state.alertClass = action.payload.alertClass;
            state.textClass = action.payload.textClass;
        }
    }
})


export const statusActions = statusSlice.actions;

export default statusSlice.reducer;



