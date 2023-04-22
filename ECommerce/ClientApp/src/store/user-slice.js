import { datedOrderList, paginatedList } from "../data/paginatedList";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialValue = {
    users: paginatedList,
    selectedUser: {
        user: {},
        favourites: paginatedList,
        cart: paginatedList,
        orders: datedOrderList
    }
}

export const fetchUsersAsync = createAsyncThunk(
    'user/fetchUsersAsync',
    async (pageNumber=1, { dispatch, getState }) => {
        var queryString = ''
        queryString += '&pageNumber=' + pageNumber
        queryString = '?' + queryString.slice(1)

        const response =
            await fetch('/users' + queryString)
                .then(data => {
                    if (!data.ok) throw data;
                    return data.json();
                })
                .then(result => {
                    dispatch(userActions.updateUsers(result.data))
                    return result;
                })
                .catch(error => {
                    return error;
                })
        return response;
    }
)

export const fetchUserDetailsAsync = createAsyncThunk(
    'user/fetchUserDetailsAsync',
    async (userId, { dispatch, getState }) => {
        const response =
            await fetch('/users/' + userId)
                .then(data => {
                    if (!data.ok) throw data;
                    return data.json();
                })
                .then(result => {
                    dispatch(userActions.updateSelectedUser(result.data))
                    return result;
                })
                .catch(error => {
                    return error;
                })
        return response;
    }
)

export const fetchUserFavouritesDetailsAsync = createAsyncThunk(
    'user/fetchUserFavouritesDetailsAsync',
    async ({ userId, pageNumber = 1 }, { dispatch, getState }) => {
        var queryString = ''
        queryString += '&userId=' + userId
        queryString += '&pageNumber=' + pageNumber
        queryString = '?' + queryString.slice(1)

        const response =
            await fetch('/users/favourites' + queryString)
                .then(data => {
                    if (!data.ok) throw data;
                    return data.json();
                })
                .then(result => {
                    dispatch(userActions.updateSelectedUserFavourites(result.data))
                    return result;
                })
                .catch(error => {
                    return error;
                })
        return response;
    }
)

export const fetchUserCartDetailsAsync = createAsyncThunk(
    'user/fetchUserCartDetailsAsync',
    async ({ userId, pageNumber = 1 }, { dispatch, getState }) => {
        var queryString = ''
        queryString += '&userId=' + userId
        queryString += '&pageNumber=' + pageNumber
        queryString = '?' + queryString.slice(1)

        const response =
            await fetch('/users/cart' + queryString)
                .then(data => {
                    if (!data.ok) throw data;
                    return data.json();
                })
                .then(result => {
                    dispatch(userActions.updateSelectedUserCart(result.data))
                    return result;
                })
                .catch(error => {
                    return error;
                })
        return response;
    }
)

export const fetchUserOrderDetailsAsync = createAsyncThunk(
    'user/fetchUserOrderDetailsAsync',
    async ({userId,dateFilter='30' }, { dispatch, getState }) => {
        var queryString = ''
        queryString += '&userId=' + userId
        queryString += '&dateFilter=' + dateFilter
        queryString = '?' + queryString.slice(1)

        const response =
            await fetch('/users/orders' + queryString)
                .then(data => {
                    if (!data.ok) throw data;
                    return data.json();
                })
                .then(result => {
                    dispatch(userActions.updateSelectedUserOrders(result.data))
                    return result;
                })
                .catch(error => {
                    return error;
                })
        return response;

    }
)

const userSlice = createSlice(
    {
        name: 'user',
        initialState: initialValue,
        reducers: {
            updateUsers(state, action) {
                state.users=action.payload
            },
            updateSelectedUser(state, action) {
                state.selectedUser.user = action.payload
            },
            updateSelectedUserFavourites(state, action) {
                state.selectedUser.favourites = action.payload
            },
            updateSelectedUserCart(state, action) {
                console.log(action)
                state.selectedUser.cart = action.payload
            },
            updateSelectedUserOrders(state, action) {
                state.selectedUser.orders = action.payload
            }
        }
    }
)

export const userActions = userSlice.actions;

export default userSlice.reducer;


