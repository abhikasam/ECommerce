import { useSelector,connect } from 'react-redux';

export default function Home() {

    const isAuthenticated= useSelector(state => state.isAuthenticated);

    return (
        <div>
            {isAuthenticated && <>
                user is authenticated
            </>}
            {!isAuthenticated && <>
                user is not authenticated
            </>}
        </div>
    );
}
