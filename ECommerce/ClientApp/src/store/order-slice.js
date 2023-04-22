
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { cartActions } from './cart-slice';
import { status } from '../data/status';


const initialValue = {
    orders: [],
    status: status
}

export const fetchOrdersAsync = createAsyncThunk(
    'order/fetchOrdersAsync',
    async ({ dateFilter, selectedUsers }, { dispatch, getState }) => {
        let queryString = ''
        queryString+=dateFilter ? ('&dateFilter=' + dateFilter) : ''
        queryString += selectedUsers.length ? ('&selectedUsers=' + selectedUsers.join(',')) : ''
        if (queryString.length) {
            queryString = '?' + queryString.slice(1)
        }
        console.log(queryString)
        const response =
            await fetch('/orders' + queryString)
                .then(data => {
                    if (!data.ok) throw data;
                    return data.json();
                })
                .then(result => {
                    dispatch(orderActions.update(result.data))
                    return result;
                })
                .catch(error => {
                    return error;
                })

        return response;        
    }
)

export const placeOrderAsync = createAsyncThunk(
    'order/placeOrderAsync',
    async (orderItems, { dispatch, getState }) => {
        const response =
            await fetch('/orders/place',
            {
                method: 'POST',
                body: JSON.stringify(orderItems),
                headers: {
                    'Content-Type': 'application/json;'
                }
            })
            .then(data => {
                if (!data.ok) throw data;
                return data.json();
            })
                .then(result => {
                    dispatch(cartActions.removeProducts(result.data))
                    return result;
            })
            .catch(error => {
                return error;
            })

        return response;
    }
)

const orderSlice = createSlice({
    name: 'order',
    initialState: initialValue,
    reducers: {
        update(state, action) {
            state.orders = action.payload
        },
        clearStatus(state) {
            state.status = initialValue.status
        }
    },
    extraReducers: builder => {
        builder.addCase(placeOrderAsync.pending, (state, action) => {

        })

        builder.addCase(placeOrderAsync.fulfilled, (state, action) => {
            state.status.message = action.payload.message;
            state.status.type = action.payload.type;
        })

        builder.addCase(placeOrderAsync.rejected, (state, action) => {
            state.status.message ='Unable to fetch orders';
            state.status.type = 'danger';
        })


    }
})


export const orderActions = orderSlice.actions;

export default orderSlice.reducer;





