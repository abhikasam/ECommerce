import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function Home() {

    const { isAuthenticated,user } = useSelector(state => state.auth);

    return (
        <div>
            {!isAuthenticated && <>
                Please login to the application.
            </>}
            {isAuthenticated && <>
                {user.fullName} {user.isAdmin?"true":"false"}
            </>}
        </div>
    );
}
