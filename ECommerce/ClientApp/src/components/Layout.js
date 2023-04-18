import React, { Component } from 'react';
import { Container } from 'reactstrap';
import NavMenu from './NavMenu';
import { useSelector } from 'react-redux';
import classes from './Layout.module.css';
import Status from '../shared/status';

export default function Layout(props){

    const { status } = useSelector(state => state.status)

    return (
        <div className={classes.layout}>
            <NavMenu />
            <div style={{ marginLeft:'12em' }}>
                <Status status={status}></Status>
            </div>
            <div className={classes.container}>
                {props.children}
            </div>
        </div>
    );
}
