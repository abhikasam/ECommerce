
import { createStore } from 'redux';

const initialAuthentication = {
    isAuthenticated: false,
    user: {}
}

const authReducer = (state = initialAuthentication, action) => {

    if (action.type === "AUTHORIZE") {
        return {
            isAuthenticated: true,
            user:action.payload
        }
    }

    if (action.type === "UNAUTHORIZE") {
        return initialAuthentication;
    }

    return state;
}

const authStore = createStore(authReducer)

export default authStore;

