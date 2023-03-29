import { createContext } from "react";

const authenticator = {
    isAuthenticated: false,
    user: {},
    setUser: () => { }
}

export const AuthContext = createContext(authenticator);




