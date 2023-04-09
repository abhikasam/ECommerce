import { categoryMappingActions } from "./category-mapping-slice";

export const getCategoryMappings = () => {
    return async (dispatch) => {
        async function getData() {
            await fetch('/categorymappings')
            .then(result => {
                if (!result.ok) throw result;
                return result.json();
            })
            .then(response => {
                dispatch(categoryMappingActions.update(response.data))
            })
            .catch(error => {
                dispatch(categoryMappingActions.update([]))
                console.log(error)
            })
        }

        getData();
    }
}