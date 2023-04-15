import React, { useState } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link, useLocation } from 'react-router-dom';
import './NavMenu.css';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../store/auth-slice';
import { format } from '../shared/timeext';
import { useEffect } from 'react';
import { logoutUser } from '../store/auth-actions';

export default function NavMenu() {

    const dispatch = useDispatch();
    const location = useLocation();

    const { isAuthenticated, expiresIn, user } = useSelector(state => state.auth)
    const [counter, setCounter] = useState(expiresIn);

    useEffect(() => {
        setCounter(expiresIn)
    }, [expiresIn]);

    useEffect(() => {
        let timer;

        if (counter > 0) {
            timer = setTimeout(() => {
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


    function timerColor(time) {
        return time < 90 ? 'btn-danger' : 'btn-success';
    }


    const toggleNavbar = () => {
        setCollapsed(prev => !prev)
    }

    async function logoutHandler() {
        dispatch(logoutUser())
    }

    return (
        <header>
            <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" container light>
                <NavbarBrand tag={Link} to="/">ECommerce</NavbarBrand>
                <NavbarToggler onClick={toggleNavbar} className="mr-2" />
                <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!collapsed} navbar>
                    {isAuthenticated &&
                        <>
                        <button type="button" className={"btn "+timerColor(counter) }>
                            <div className="fw-bold">
                                    {format(counter)}
                                </div>
                            </button>
                        </>
                    }
                    <ul className="navbar-nav flex-grow">
                        {
                            isAuthenticated &&
                            <NavLink tag={Link} className="text-dark" to="/products">Products</NavLink>
                        }

                        {
                            isAuthenticated && !user.isAdmin &&
                            <NavLink tag={Link} className="text-dark" to="/favourites">Favourites</NavLink>
                        }

                        {
                            isAuthenticated && !user.isAdmin &&
                            <NavItem>
                                <NavLink tag={Link} className="text-dark" to="/cart">Cart</NavLink>
                            </NavItem>
                        }
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
