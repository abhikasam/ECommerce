import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth-slice';
import statusReducer from './status-slice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        status: statusReducer
    }
})

export default store;

