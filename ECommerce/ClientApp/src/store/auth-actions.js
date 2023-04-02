import { authActions } from "./auth-slice"

export const fetchUser = () => {
    return async (dispatch) => {

        const userData = async () => {
            const response = await fetch('/login')
            const data = await response.json();

            if (data.isAuthenticated) {
                dispatch(setUser(data))
            }
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

