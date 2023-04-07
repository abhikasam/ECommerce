import { productFilterActions } from "./product-filter-slice";
import { productActions } from "./product-slice";



export const getProducts=()=>{
    return async (dispatch,getState) => {
        async function getData() {
            var filters = getState().productFilter
            var queryString = ''
            if (filters) {
                if (filters.productCount)
                    queryString += '&productCount=' + filters.productCount
                if (filters.pageNumber)
                    queryString += '&pageNumber=' + filters.pageNumber
                if (filters.sortBy)
                    queryString += '&sortBy=' + filters.sortBy
                if (filters.sortOrder)
                    queryString += '&sortOrder=' + filters.sortOrder
                if (filters.brands)
                    queryString += '&brands=' + filters.brands.join(',')
                if (filters.categories)
                    queryString += '&categories=' + filters.categories.join(',')
                if (filters.individualCategories)
                    queryString += '&individualCategories=' + filters.individualCategories.join(',')
                queryString = '?' + queryString.slice(1)
            }

            await fetch('/products' + queryString)
            .then(result => {
                if (!result.ok) throw result;
                return result.json();
            })
            .then(response => {
                dispatch(productActions.update(response.data))
                dispatch(productFilterActions.updatePageNumber(response.data.pageNumber))
                dispatch(productFilterActions.updateTotalPages(response.data.totalPages))
            })
            .catch(error => {
                dispatch(productActions.update([]))
                console.log(error)
            })
        }

        getData();
    }
}



