import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth-slice';
import statusReducer from './status-slice';
import productReducer from './product-slice';
import brandReducer from './brand-slice';
import categoryReducer from './category-slice';
import individualCategoryReducer from './individual-category-slice';
import productFilterReducer from './product-filter-slice';


const store = configureStore({
    reducer: {
        auth: authReducer,
        status: statusReducer,
        product: productReducer,
        brand: brandReducer,
        category: categoryReducer,
        individualCategory: individualCategoryReducer,
        productFilter: productFilterReducer
    }
})

export default store;

