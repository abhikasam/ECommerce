import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth-slice';
import statusReducer from './status-slice';
import productReducer from './product-slice';


const store = configureStore({
    reducer: {
        auth: authReducer,
        status: statusReducer,
        product:productReducer
    }
})

export default store;

