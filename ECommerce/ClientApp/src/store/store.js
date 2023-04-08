import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth-slice';
import statusReducer from './status-slice';
import productReducer from './product-slice';
import brandReducer from './brand-slice';
import categoryReducer from './category-slice';
import individualCategoryReducer from './individual-category-slice';
import favouriteReducer from './favourite-slice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        status: statusReducer,
        product: productReducer,
        brand: brandReducer,
        category: categoryReducer,
        individualCategory: individualCategoryReducer,
        favourite: favouriteReducer
    }
})

export default store;

