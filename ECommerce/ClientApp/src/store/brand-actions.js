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


