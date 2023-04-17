
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { cartActions } from './cart-slice';


const initialValue = {
    orders: [],
    status: {
        message: '',
        textClass: '',
        alertClass: ''
    }

}

export const fetchOrdersAsync = createAsyncThunk(
    'order/fetchOrdersAsync',
    async (dateFilter, { dispatch, getState }) => {
        let queryString = dateFilter ? ('?dateFilter=' + dateFilter):''
            
        const response =
            await fetch('/orders' + queryString)
                .then(result => {
                    if (!result.ok) throw result;
                    return result.json();
                })
                .then(response => {
                    dispatch(orderActions.update(response.data))
                    return response;
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
            .then(result => {
                if (!result.ok) throw result;
                return result.json();
            })
            .then(response => {
                dispatch(cartActions.removeProducts(response.data))
                return response;
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
            state.status.textClass = action.payload.messageClass;
            state.status.alertClass = action.payload.alertClass;
        })

        builder.addCase(placeOrderAsync.rejected, (state, action) => {
            console.log(state, action)
        })


    }
})


export const orderActions = orderSlice.actions;

export default orderSlice.reducer;





