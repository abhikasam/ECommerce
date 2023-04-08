import { favouriteActions } from "./favourite-slice";



export const updateFourites=()=>{
    return async (dispatch,getState) => {

        async function getData() {
            await fetch('/favourites')
                .then(result => {
                    if (!result.ok) throw result;
                    return result.json();
                })
                .then(response => {
                    dispatch(favouriteActions.update(response.data))
                })
                .catch(error => {
                    dispatch(favouriteActions.update([]))
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
                dispatch(favouriteActions.add(response.data))
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
                dispatch(favouriteActions.remove(productId))
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
        }

        removeData();
    }
}



