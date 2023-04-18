import { sortBrands } from "./brand-slice";
import { sortCategories } from "./category-slice";
import { sortIndividualCategories } from "./individual-category-slice";
import { productActions } from "./product-slice";
import { statusActions } from "./status-slice";

export const updateFilters=(response) => {
    return async (dispatch) => {
        response
            .then(response => {
                dispatch(productActions.update(response.payload.data))
                dispatch(productActions.updateFilters(response.payload.data.filters))
                dispatch(productActions.updateTotalPages(response.payload.data.totalPages))
                dispatch(sortBrands())
                dispatch(sortCategories())
                dispatch(sortIndividualCategories())
            })
            .catch(error => {
                dispatch(productActions.clear())
            })
    }
}

export const saveProduct = (form,history) => {
    return async (dispatch) => {
        async function postData() {
            await fetch('products'
                , {
                    method: 'POST',
                    body: JSON.stringify(form),
                    headers: {
                        'Content-Type': 'application/json;'
                    }
                }
            )
            .then(result => {
                if (!result.ok) throw result;
                return result.json();
            })
            .then(response => {
                dispatch(statusActions.add(response))
                setTimeout(() => {
                    history.push('/products')
                }, 3000)
            })
            .catch(error => {
                dispatch(statusActions.add(error))
            })
        }

        postData();
    }
}



