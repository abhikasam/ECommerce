import { favouriteActions } from "./favourite-slice";



export const updateFavourites=()=>{
    return async (dispatch, getState) => {

        var pageNumber = getState().favourite.pageNumber;
        var queryString = ''
        queryString += '&pageNumber=' + pageNumber
        queryString = '?' + queryString.slice(1)

        async function getData() {
            await fetch('/favourites' + queryString)
                .then(result => {
                    if (!result.ok) throw result;
                    return result.json();
                })
                .then(response => {
                    dispatch(favouriteActions.updateProducts(response.data))
                })
                .catch(error => {
                    dispatch(favouriteActions.updateProducts([{ result: [], pageNumber:1,totalPages:1 }]))
                    console.log(error)
                })
        }

        getData();
    }
}

export const addFavourite = (productId) => {
    return async (dispatch)=>{
        async function addData() {
            await fetch('/favourites/add', {
                method: 'POST',
                body: JSON.stringify(productId),
                headers: {
                    'Content-Type': 'application/json;'
                }
            })
            .then(result => {
                if (!result.ok) throw result;
                return result.json();
            })
            .then(response => {
                dispatch(favouriteActions.addProduct(response.data))
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
        }

        addData();
    }
}

export const removeFavourite = (productId) => {
    return async (dispatch) => {
        async function removeData() {
            await fetch('/favourites/remove', {
                method: 'POST',
                body: JSON.stringify(productId),
                headers: {
                    'Content-Type': 'application/json;'
                }
            })
            .then(result => {
                if (!result.ok) throw result;
                return result.json();
            })
            .then(response => {
                dispatch(favouriteActions.removeProduct(productId))
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
        }

        removeData();
    }
}



