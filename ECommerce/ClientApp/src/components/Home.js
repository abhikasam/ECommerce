import { useContext } from "react";
import { AuthContext } from "../auth/authContext";

export default function Home() {

    const authenticator = useContext(AuthContext)
    
    return (
        <div>
            {authenticator.isAuthenticated && <>
                <div>User is authenticated</div>
            </>}
            {!authenticator.isAuthenticated && <>
                <div>User is not authenticated!</div>
            </>}
        </div>
    );
}
