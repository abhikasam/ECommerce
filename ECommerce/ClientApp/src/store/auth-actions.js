import { authActions } from "./auth-slice"
import { brandActions } from "./brand-slice"
import { categoryActions } from "./category-slice"
import { individualCategoryActions } from "./individual-category-slice"
import { productActions } from "./product-slice"
import { statusActions } from "./status-slice"

export const fetchUser = () => {
    return async (dispatch) => {

        const getData = async () => {

            await fetch('/login')
            .then(result => {
                if (!result.ok) throw result;
                return result.json();
            })
            .then(response => {
                if (response.isAuthenticated) {
                    dispatch(setUser(response))
                }
            })
            .catch(error => {
                dispatch(statusActions.add(error))
            })
        }

        getData();
    }
}

export const setUser = (data) => {
    return async (dispatch) => {

        async function loginUser() {
            dispatch(authActions.login(data))

            setTimeout(function () {
                dispatch(logoutUser())
            }, data.expiresIn * 1000);
        }

        loginUser();
    }
}

export const loginUser = (formData) => {
    return async (dispatch) => {
        async function login() {
            await fetch('login'
                , {
                    method: 'POST',
                    body: JSON.stringify(formData),
                    headers: {
                        'Content-Type': 'application/json;'
                    }
                }
            )
            .then(result => {
                if (!result.ok) throw result;
                return result.json();
            })
            .then(response => {
                dispatch(statusActions.add(response))

                if (response.statusCode === 1) {
                    dispatch(setUser(response.data));
                }
            })
            .catch(error =>
                dispatch(statusActions.add(error))
            )
        }
        login();
    }
}

export const logoutUser = () => {
    return async (dispatch) => {

        dispatch(authActions.logout())
        dispatch(brandActions.clear())
        dispatch(categoryActions.clear())
        dispatch(individualCategoryActions.clear())
        dispatch(productActions.clear())

        await fetch('logout'
            , {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;'
                }
            }
        )
    }
}




