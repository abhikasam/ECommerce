import { sortBrands } from "./brand-actions";
import { brandActions } from "./brand-slice";
import { sortCategories } from "./category-actions";
import { sortIndividualCategories } from "./individual-category-actions";
import { productActions } from "./product-slice";
import { statusActions } from "./status-slice";



export const getProducts=(filters)=>{
    return async (dispatch,getState) => {
        async function getData() {
            var queryString = ''
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
            if (filters.priceRanges)
                queryString += '&priceRanges=' + filters.priceRanges.join(',')
            queryString = '?' + queryString.slice(1)

            await fetch('/products' + queryString)
            .then(result => {
                if (!result.ok) throw result;
                return result.json();
            })
            .then(response => {
                console.log(response)
                dispatch(productActions.update(response.data))
                dispatch(productActions.updatePageNumber(response.data.filters.pageNumber))
                dispatch(productActions.updateTotalPages(response.data.totalPages))
                dispatch(sortBrands())
                dispatch(sortCategories())
                dispatch(sortIndividualCategories())
            })
                .catch(error => {
                    dispatch(productActions.update([{ result: {}, totalPages: 1, filters: { pageNumber:1 } }]))
                console.log(error)
            })
        }

        getData();
    }
}




