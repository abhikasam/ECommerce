import { sizeMappingActions } from "./size-mapping-slice";

export const getSizeMappings = () => {
    return async (dispatch) => {
        async function getData() {
            await fetch('/sizemappings')
            .then(result => {
                if (!result.ok) throw result;
                return result.json();
            })
            .then(response => {
                dispatch(sizeMappingActions.update(response.data))
            })
            .catch(error => {
                dispatch(sizeMappingActions.update([]))
                console.log(error)
            })
        }

        getData();
    }
}