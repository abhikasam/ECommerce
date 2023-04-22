
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { status } from '../data/status';
import { paginatedList } from '../data/paginatedList';

const initialValue = {
    products:paginatedList,
    status: status
}


export const fetchOutOfStockProductsAsync = createAsyncThunk(
    'outofstock/fetchOutOfStockProductsAsync',
    async (pageNumber=1, { dispatch, getState }) => {

        var queryString = ''
        queryString += '&pageNumber=' + pageNumber
        queryString = '?' + queryString.slice(1)

        let products = getState().outofstock.products.result

        if (products.length) {
            return;
        }

        const response =
            await fetch('/products/outofstock' + queryString)
                .then(data => {
                    console.log(data)
                    if (!data.ok) throw data;
                    return data.json();
                })
                .then(result => {
                    dispatch(outofstockActions.update(result.data))
                    return result;
                })
                .catch(error => {
                    dispatch(outofstockActions.update(initialValue.products))
                    console.log(error)
                    return error;
                })
        return response;
    }
)

export const updateQuantitiesAsync = createAsyncThunk(
    'outofstock/updateQuantitiesAsync',
    async (sizeQuantities, { dispatch, getState }) => {

        const response =
            await fetch('/products/updatequantities',
                {
                    method: 'POST',
                    body: JSON.stringify(sizeQuantities),
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
                console.log(result)
                dispatch(outofstockActions.removeProduct(result.data))
                return result;
            })
            .catch(error => {
                return error;
            })
        return response;
    }
)

const outofstockSlice = createSlice({
    name: 'outofstock',
    initialState: initialValue,
    reducers: {
        update(state, action) {
            state.products = action.payload
        },
        removeProduct(state, action) {
            state.products = state.products.filter(i => i.productId !== action.payload)
        },
        addProduct(state, action) {
            state.products.push(action.payload)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchOutOfStockProductsAsync.pending, (state, action) => {
            state.status.message = 'Loading products...';
            state.status.type = 'warning';
        })

        builder.addCase(fetchOutOfStockProductsAsync.fulfilled, (state, action) => {
            state.status.message = '';
            state.status.type = '';
        })

        builder.addCase(fetchOutOfStockProductsAsync.rejected, (state, action) => {
            state.status.message = 'Unable to fetch products';
            state.status.type = 'danger';
        })
    }
})


export const outofstockActions = outofstockSlice.actions

export default outofstockSlice.reducer;





