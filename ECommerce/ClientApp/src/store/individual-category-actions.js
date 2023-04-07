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


