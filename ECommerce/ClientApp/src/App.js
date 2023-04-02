import React, { useEffect } from 'react';
import AppRoutes from './AppRoutes';
import { Layout } from './components/Layout';
import './custom.css';
import { useDispatch } from 'react-redux';
import { fetchUser } from './store/auth-actions';

export default function App() {

    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(fetchUser())
    }, [dispatch]);

 
    return (
        <Layout>
            <AppRoutes />
        </Layout>
    );
}
