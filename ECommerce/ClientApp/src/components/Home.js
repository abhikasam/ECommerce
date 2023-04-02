import { useSelector,connect } from 'react-redux';

export default function Home() {

    const authStore= useSelector(state => state.auth);

    return (
        <div>
            {authStore.isAuthenticated && <>
                user is authenticated
            </>}
            {!authStore.isAuthenticated && <>
                user is not authenticated
            </>}
        </div>
    );
}
