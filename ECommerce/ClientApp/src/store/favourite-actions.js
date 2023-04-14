import { favouriteActions } from "./favourite-slice";


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



