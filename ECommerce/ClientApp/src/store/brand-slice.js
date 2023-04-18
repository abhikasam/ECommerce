
import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';

const initialValue = {
    brands: []
}


export const fetchBrands = createAsyncThunk(
    'brand/fetchBrands',
    async (_, { dispatch, getState }) => {

        let brands=getState().brand.brands

        if (brands.length) {
            return;
        }

        const response =
            await fetch('/brands')
            .then(data => {
                if (!data.ok) throw data;
                return data.json();
            })
            .then(result => {
                dispatch(brandActions.update(result.data))
            })
            .catch(error => {
                dispatch(brandActions.update([]))
                console.log(error)
            })
        return response;
    }
)

export const sortBrands = () => {
    return async (dispatch, getState) => {
        var store = getState()
        var selectedBrands = store.product.filters.brands.map(i => parseInt(i))
        if (selectedBrands.length) {
            dispatch(brandActions.sort(selectedBrands))
        }
    }
}

export const getBrands = () => {
    return async (dispatch) => {
        async function getData() {
        }

        getData();
    }
}


const brandSlice = createSlice({
    name: 'brand',
    initialState: initialValue,
    reducers: {
        update(state, action) {
            state.brands = action.payload
        },
        sort(state, action) {
            state.brands = state.brands.sort(function (a, b) {
                return action.payload.includes(a.key) > action.payload.includes(b.key) ? 1 :-1
            }).reverse()
        },
        clear(state) {
            state.brands=[]
        }
    }
})


export const brandActions = brandSlice.actions

export default brandSlice.reducer;





