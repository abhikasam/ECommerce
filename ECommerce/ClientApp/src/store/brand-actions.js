import { brandActions } from "./brand-slice";



export const getBrands = () => {
    return async (dispatch) => {
        async function getData() {
            await fetch('/brands')
                .then(result => {
                    if (!result.ok) throw result;
                    return result.json();
                })
                .then(response => {
                    dispatch(brandActions.update(response.data))
                })
                .catch(error => {
                    dispatch(brandActions.update([]))
                    console.log(error)
                })
        }

        getData();
    }
}

export const sortBrands = () => {
    return async (dispatch, getState) => {
        var store = getState()
        var selectedBrands = store.product.filters.brands.map(i => parseInt(i))
        if (selectedBrands.length) {
            dispatch(brandActions.sort(selectedBrands))
        }
    }
}



