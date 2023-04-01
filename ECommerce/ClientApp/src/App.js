import React, { Component, useContext } from 'react';
import { Route } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { Layout } from './components/Layout';
import './custom.css';

export default function App() {

    
 
    return (
        <Layout>
            <AppRoutes />
        </Layout>
    );
}
