import { productActions } from "./product-slice";



export const getProducts=(filters)=>{
    return async (dispatch) => {
        async function getData() {

            var queryString = ''

                if (filters) {
                    if (filters.productCount)
                        queryString += '&productCount=' + filters.productCount
                    if (filters.sortBy)
                        queryString += '&sortBy=' + filters.sortBy
                    if (filters.sortOrder)
                        queryString += '&sortOrder=' + filters.sortOrder
                    if (filters.brands)
                        queryString += '&brands='+filters.brands.join(',')

                    queryString = '?' + queryString.slice(1)
                    console.log(queryString)
                }

                await fetch('/products' + queryString)
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


