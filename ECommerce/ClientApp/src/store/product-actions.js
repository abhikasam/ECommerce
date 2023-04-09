import { sortBrands } from "./brand-actions";
import { brandActions } from "./brand-slice";
import { sortCategories } from "./category-actions";
import { sortIndividualCategories } from "./individual-category-actions";
import { productActions } from "./product-slice";
import { statusActions } from "./status-slice";



export const getProducts=()=>{
    return async (dispatch,getState) => {
        async function getData() {
            var product = getState().product
            var queryString = ''

            if (product.filters.productCount)
                queryString += '&productCount=' + product.filters.productCount
            if (product.pageNumber)
                queryString += '&pageNumber=' + product.pageNumber
            if (product.filters.sortBy)
                queryString += '&sortBy=' + product.filters.sortBy
            if (product.filters.sortOrder)
                queryString += '&sortOrder=' + product.filters.sortOrder
            if (product.filters.brands)
                queryString += '&brands=' + product.filters.brands.join(',')
            if (product.filters.categories)
                queryString += '&categories=' + product.filters.categories.join(',')
            if (product.filters.individualCategories)
                queryString += '&individualCategories=' + product.filters.individualCategories.join(',')
            if (product.filters.priceRanges)
                queryString += '&priceRanges=' + product.filters.priceRanges.join(',')
            queryString = '?' + queryString.slice(1)

            await fetch('/products' + queryString)
            .then(result => {
                if (!result.ok) throw result;
                return result.json();
            })
            .then(response => {
                dispatch(productActions.update(response.data))
                dispatch(productActions.updatePageNumber(response.data.pageNumber))
                dispatch(productActions.updateTotalPages(response.data.totalPages))
                dispatch(sortBrands())
                dispatch(sortCategories())
                dispatch(sortIndividualCategories())
            })
                .catch(error => {
                    dispatch(productActions.update([{ result: {}, pageNumber: 1, totalPages: 1, filters: {} }]))
                console.log(error)
            })
        }

        getData();
    }
}




