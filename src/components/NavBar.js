import axios from 'axios';
import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import logo from '../assets/quill.png';
import {
    useCurrentUser,
    useSetCurrentUser,
} from '../contexts/CurrentUserContext';
import styles from '../styles/NavBar.module.css';
import Avatar from './Avatar';

const NavBar = () => {
    const currentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();

    const handleSignOut = async () => {
        try {
            await axios.post('dj-rest-auth/logout/');
            setCurrentUser(null);
        } catch (err) {
            console.log(err);
        }
    };

    const addPostIcon = (
        <NavLink
            className={styles.NavLink}
            activeClassName={styles.Active}
            to='/posts/create'
        >
            <i className='d-sm-inline p-2 fas fa-plus-square'></i>
            <span className='d-none d-md-inline p-2'>Create</span>
        </NavLink>
    );

    const loggedInIcons = (
        <>
            <NavLink
                className={styles.NavLink}
                activeClassName={styles.Active}
                to='/newest'
            >
                <i className='d-sm-block d-md-none p-2 fas fa-stream'></i>
                <span className='d-none d-md-block p-2'>Newest</span>
            </NavLink>
            <NavLink
                className={styles.NavLink}
                activeClassName={styles.Active}
                to='/liked'
            >
                <i className='d-sm-block d-md-none p-2 fas fa-heart'></i>
                <span className='d-none d-md-block p-2'>Liked</span>
            </NavLink>
            <NavLink
                className={styles.NavLink}
                to='/'
                onClick={handleSignOut}
            >
                <i className='d-sm-block d-md-none p-2 fas fa-sign-out-alt'></i>
                <span className='d-none d-md-block p-2'>Sign out</span>
            </NavLink>
            <NavLink
                className={styles.NavLink}
                to={`/profiles/${currentUser?.profile_id}`}
            >
                <Avatar
                    src={currentUser?.profile_image}
                    text='Profile'
                />
            </NavLink>
        </>
    );
    const loggedOutIcons = (
        <>
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
        </>
    );

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
                {currentUser && addPostIcon}
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
                    {currentUser ? loggedInIcons : loggedOutIcons}
                </Nav>
            </Container>
        </Navbar>
    );
};

export default NavBar;
