import React, { useEffect } from 'react';
import AppRoutes from './AppRoutes';
import Layout from './components/Layout';
import './custom.css';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { statusActions } from './store/status-slice';
import { fetchUserAsync } from './store/auth-slice';

export default function App() {

    const dispatch = useDispatch()
    const location = useLocation()

    useEffect(() => {
        dispatch(fetchUserAsync())
    }, [dispatch]);


    useEffect(() => {
        dispatch(statusActions.clear())
    }, [dispatch, location.pathname])

    return (
        <>
            <Layout>
                <AppRoutes />
            </Layout>
        </>
    );
}
