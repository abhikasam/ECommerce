import React, { useEffect } from 'react';
import AppRoutes from './AppRoutes';
import Layout from './components/Layout';
import './custom.css';
import { useDispatch } from 'react-redux';
import { fetchUser } from './store/auth-actions';
import { useLocation } from 'react-router-dom';
import { statusActions } from './store/status-slice';

export default function App() {

    const dispatch = useDispatch()
    const location=useLocation()

    useEffect(() => {
        dispatch(fetchUser())
    }, [dispatch]);

    useEffect(() => {
        dispatch(statusActions.clear())
    }, [dispatch, location.pathname])

    return (
        <Layout>
            <AppRoutes />
        </Layout>
    );
}
