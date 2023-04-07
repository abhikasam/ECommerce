import { individualCategoryActions } from "./individual-category-slice";


export const getIndividualCategories = () => {
    return async (dispatch) => {
        async function getData() {
            await fetch('/individualCategories')
                .then(result => {
                    if (!result.ok) throw result;
                    return result.json();
                })
                .then(response => {
                    dispatch(individualCategoryActions.update(response.data))
                })
                .catch(error => {
                    dispatch(individualCategoryActions.update([]))
                    console.log(error)
                })
        }

        getData();
    }
}


export const sortIndividualCategories = () => {
    return async (dispatch, getState) => {
        var store = getState()
        var selectedIndividualCategories = store.product.filters.individualCategories.map(i => parseInt(i))
        if (selectedIndividualCategories.length) {
            dispatch(individualCategoryActions.sort(selectedIndividualCategories))
        }
    }
}


