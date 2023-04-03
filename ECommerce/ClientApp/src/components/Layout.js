import React, { Component } from 'react';
import { Container } from 'reactstrap';
import NavMenu from './NavMenu';
import { useSelector } from 'react-redux';
import classes from './Layout.module.css';

export default function Layout(props){

    const status = useSelector(state=>state.status)

    return (
        <div>
            <NavMenu />
            {status.hasStatus &&
                <div className={"row rowpad5px align-items-center " + classes.alertbar}>
                    <div className="col-8">
                        <div className={status.alertClass + " alert"} style={{ whiteSpace: "pre-wrap" }}>
                            <div className={status.textClass}>{status.message}</div>
                        </div>
                    </div>
                </div>
            }
            <Container>
                {props.children}
            </Container>
        </div>
    );
}
