import { authActions } from "./auth-slice"
import { statusActions } from "./status-slice"

export const fetchUser = () => {
    return async (dispatch) => {

        const userData = async () => {

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

        userData();
    }
}

export const setUser = (data) => {
    return async (dispatch) => {

        async function userData() {
            dispatch(authActions.login(data))

            setTimeout(function () {
                dispatch(authActions.logout())
            }, data.expiresIn * 1000);
        }

        userData();
    }
}

