import React, { Component, useContext } from 'react';
import { Route } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { Layout } from './components/Layout';
import './custom.css';
import { AuthContext } from './auth/authContext';

export default function App() {

    const { user } = useContext(AuthContext)
    
 
    return (
        <AuthContext.Provider value={user}>
            <Layout>
                <AppRoutes />
            </Layout>
        </AuthContext.Provider>
    );
}
