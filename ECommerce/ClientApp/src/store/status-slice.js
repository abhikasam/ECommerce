
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { status } from '../shared/status';
import { authActions } from './auth-slice';

const initialValue = {
    status: status
}

const statusSlice = createSlice({
    name: 'status',
    initialState: initialValue,
    reducers: {
        clear(state) {
            state.status.message = ''
            state.status.type = ''
        },
        add(state, action) {
            state.status = action.payload
        }
    }
})


export const statusActions = statusSlice.actions;

export default statusSlice.reducer;



