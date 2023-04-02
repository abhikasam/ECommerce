import React, { useState } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link, useLocation } from 'react-router-dom';
import './NavMenu.css';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../store/auth-slice';
import { format } from '../shared/timeext';
import { useEffect } from 'react';

export default function NavMenu() {

    const dispatch = useDispatch();
    const location = useLocation();

    const { isAuthenticated, expiresIn } = useSelector(state => state.auth)
    const [counter, setCounter] = useState(expiresIn);

    useEffect(() => {
        setCounter(expiresIn)
    }, [expiresIn]);

    useEffect(() => {
        let timer;
        
        if (counter > 0) {
            timer = setTimeout(() => {
                console.log(counter)
                setCounter(c => c - 1)
            }, 1000);
        }

        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        };
    }, [counter]);


    const [collapsed, setCollapsed] = useState(false)

    const toggleNavbar = () => {
        setCollapsed(prev => !prev)
    }

    async function logoutHandler() {

        await fetch('logout'
            , {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;'
                }
            }
        )

        dispatch(authActions.logout());
    }

    return (
        <header>
            <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" container light>
                <NavbarBrand tag={Link} to="/">ECommerce</NavbarBrand>
                {isAuthenticated &&
                    <div>
                        Session expires in : {format(counter)}
                    </div>
                }
                <NavbarToggler onClick={toggleNavbar} className="mr-2" />
                <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!collapsed} navbar>
                    <ul className="navbar-nav flex-grow">
                        <NavItem>
                            <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
                        </NavItem>
                        {isAuthenticated &&
                            <NavItem>
                                <NavLink tag={Link} className="text-dark" to="/login" onClick={logoutHandler}>Logout</NavLink>
                            </NavItem>
                        }
                        {
                            !isAuthenticated && location.pathname !== '/register' &&
                            <NavItem>
                                <NavLink tag={Link} className="text-dark" to="/register">Register</NavLink>
                            </NavItem>
                        }
                        {
                            !isAuthenticated && location.pathname !== '/login' &&
                            <NavItem>
                                <NavLink tag={Link} className="text-dark" to="/login">Login</NavLink>
                            </NavItem>
                        }
                    </ul>
                </Collapse>
            </Navbar>
        </header>
    );
}
