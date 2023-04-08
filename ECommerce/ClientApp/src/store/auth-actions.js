import { authActions } from "./auth-slice"
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
                dispatch(authActions.logout())
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



