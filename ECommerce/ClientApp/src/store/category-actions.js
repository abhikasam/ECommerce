import { categoryActions } from "./category-slice";



export const getCategories = () => {
    return async (dispatch) => {
        async function getData() {
            await fetch('/categories')
                .then(result => {
                    if (!result.ok) throw result;
                    return result.json();
                })
                .then(response => {
                    dispatch(categoryActions.update(response.data))
                })
                .catch(error => {
                    dispatch(categoryActions.update([]))
                    console.log(error)
                })
        }

        getData();
    }
}


