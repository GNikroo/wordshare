import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import logo from '../assets/quill.png';
import styles from '../styles/NavBar.module.css';

const NavBar = () => {
    return (
        <Navbar
            className={styles.NavBar}
            expand='md'
            fixed='top'
        >
            <Container>
                <NavLink to='/'>
                    <Navbar.Brand className={styles.Brand}>
                        Word
                        <img
                            src={logo}
                            alt='logo'
                            height='45px'
                        />
                        Share
                    </Navbar.Brand>
                </NavLink>
                <Nav className={styles.Nav}>
                    <NavLink
                        exact
                        className={styles.NavLink}
                        activeClassName={styles.Active}
                        to='/'
                    >
                        <i className='d-sm-block d-md-none fas fa-home p-2'></i>
                        <span className='d-none d-md-block p-2'>Home</span>
                    </NavLink>
                    <NavLink
                        className={styles.NavLink}
                        activeClassName={styles.Active}
                        to='/signin'
                    >
                        <i className='d-sm-block d-md-none fas fa-sign-in-alt p-2'></i>
                        <span className='d-none d-md-block p-2'>Sign in</span>
                    </NavLink>
                    <NavLink
                        to='/signup'
                        className={styles.NavLink}
                        activeClassName={styles.Active}
                    >
                        <i className='d-sm-block d-md-none fas fa-user-plus p-2'></i>
                        <span className='d-none d-md-block p-2'>Sign up</span>
                    </NavLink>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default NavBar;
