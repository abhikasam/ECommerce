import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth-slice';
import statusReducer from './status-slice';
import productReducer from './product-slice';
import brandReducer from './brand-slice';
import categoryReducer from './category-slice';
import individualCategoryReducer from './individual-category-slice';
import favouriteReducer from './favourite-slice';
import categoryMappingReducer from './category-mapping-slice'
import sizeMappingReducer from './size-mapping-slice'
import cartReducer from './cart-slice';
import userProductFilterReducer from './user-product-filter-slice';
import orderReducer from './order-slice';
import outofstockReducer from './outofstock-slice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        status: statusReducer,
        product: productReducer,
        brand: brandReducer,
        category: categoryReducer,
        individualCategory: individualCategoryReducer,
        favourite: favouriteReducer,
        categoryMapping: categoryMappingReducer,
        sizeMapping: sizeMappingReducer,
        cart: cartReducer,
        userProductFilter: userProductFilterReducer,
        order: orderReducer,
        outofstock: outofstockReducer
    }
})

export default store;

