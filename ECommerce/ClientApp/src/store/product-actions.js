import { productActions } from "./product-slice";



export const getProducts=()=>{
    return async (dispatch)=> {

        async function getData() {
            await fetch('/products')
                .then(result => {
                    if (!result.ok) throw result;
                    return result.json();
                })
                .then(response => {
                    dispatch(productActions.update(response.data))
                })
                .catch(error => {
                    dispatch(productActions.update([]))
                    console.log(error)
                })
        }

        getData();
    }
}


