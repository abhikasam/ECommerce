import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function Home() {

    const authStore= useSelector(state => state.auth);

    return (
        <div>
            {!authStore.isAuthenticated && <>
                Please login to the application.
            </>}
            {authStore.isAuthenticated && <>
                user is authenticated
            </>}
        </div>
    );
}
