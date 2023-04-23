
import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import { status } from '../data/status';
import { statusActions } from './status-slice';
import { brandActions } from './brand-slice';
import { categoryActions } from './category-slice';
import { individualCategoryActions } from './individual-category-slice';
import { productActions } from './product-slice';
import { userProductFilterActions } from './user-product-filter-slice';
import { orderActions } from './order-slice';

const initialAuthentication = {
    isAuthenticated: false,
    user: {},
    expiresIn: 0,
    userId:0,
    status: status    
}

export const fetchUserAsync = createAsyncThunk(
    'auth/fetchUserAsync',
    async (_, { dispatch, getState }) => {
        const response =
            await fetch('/login')
                .then(data => {
                    if (!data.ok) throw data;
                    return data.json();
                })
                .then(result => {
                    if (result.isAuthenticated) {
                        dispatch(setUser(result))
                    }
                    return result;
                })
                .catch(error => {
                    return error;
                })
        return response;
    }
)


export const loginUserAsync = createAsyncThunk(
    'auth/loginUserAsync',
    async (formData, { dispatch, getState }) => {
        const response =
            await fetch('login'
                , {
                    method: 'POST',
                    body: JSON.stringify(formData),
                    headers: {
                        'Content-Type': 'application/json;'
                    }
                }
            )
                .then(data => {
                    if (!data.ok) throw data;
                    return data.json();
                })
                .then(result => {
                    dispatch(statusActions.add(result))

                    if (result.statusCode === 1) {
                        dispatch(setUser(result.data));
                    }
                })
                .catch(error =>
                    dispatch(statusActions.add(error))
                )

        return response;
    }
)

export const logoutUserAsync = createAsyncThunk(
    'auth/logoutUserAsync',
    async (_, { dispatch, getState }) => {
        dispatch(authActions.logout())
        dispatch(brandActions.clear())
        dispatch(categoryActions.clear())
        dispatch(individualCategoryActions.clear())
        dispatch(productActions.clear())
        dispatch(statusActions.clear())
        dispatch(userProductFilterActions.clear())
        dispatch(orderActions.update([]))

        const response =
        await fetch('logout'
            , {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;'
                }
            }
        )
        .then(data => {
            if (!data.ok) throw data;
            return data.json();
        })
        .then(result => {
            return result;
        })
        .catch(error =>
            error
        )

        return response;
    }
)

export const setUser = (data) => {
    return async (dispatch) => {

        async function login() {
            dispatch(authActions.login(data))

            setTimeout(function () {
                dispatch(logoutUserAsync())
            }, data.expiresIn * 1000);
        }

        login();
    }
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthentication,
    reducers: {
        login(state, action) {
            state.isAuthenticated = true;
            state.user = action.payload.user
            state.expiresIn = action.payload.expiresIn
            state.userId = action.payload.user.userId
        },
        logout(state) {
            state.isAuthenticated = false;
            state.user = {};
            state.expiresIn = 0
            state.userId=0
        },
        clearStatus(state) {
            state.status = { message:'',type:'' }
        }
    },
    extraReducers: (builder) => {
    }
})


export const authActions = authSlice.actions;

export default authSlice.reducer

