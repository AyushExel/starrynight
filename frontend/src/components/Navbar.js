import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
//import logout from '../utils.js'

const DefaultNavbar = () => {
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('userToken') !== null) {
            setIsAuth(true);
        }
    }, []);

    const logout = () => {
        localStorage.removeItem('userToken');
        window.location.replace('http://localhost:3000/')
    }

    return (
        <Navbar bg="dark" expand="lg">
            <Navbar.Brand>
                <Nav.Link> <Link to='/'>  <img
                    src="/stary.jpg"
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                    alt="logo"
                /> </Link></Nav.Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    {isAuth === true ? (
                        <>
                            <Nav.Link><Link to=
                                {{
                                    pathname: '/style_transfer',
                                    state: {}
                                }}>Realtime-transfer</Link></Nav.Link>
                            <Nav.Link> <Link to='/' onClick={logout}>Logout</Link></Nav.Link>
                        </>
                    ) :
                        (
                            <>
                                <Nav.Link> <Link to='/dashboard'>Dashboard</Link></Nav.Link>
                                <Nav.Link><Link to='/login'>Login</Link></Nav.Link>
                                <Nav.Link><Link to='/signup'>Signup</Link></Nav.Link>


                            </>
                        )
                    }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )

};

export default DefaultNavbar;