import axios from 'axios';
import React from 'react';
import { Container, Nav, Navbar, Row } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import logo from '../assets/quill.png';
import {
    useCurrentUser,
    useSetCurrentUser,
} from '../contexts/CurrentUserContext';
import useClickOutsideToggle from '../hooks/useClickOutsideToggle';
import btnStyles from '../styles/Button.module.css';
import styles from '../styles/NavBar.module.css';

import Avatar from './Avatar';

const NavBar = () => {
    const currentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();

    const { expanded, setExpanded, ref } = useClickOutsideToggle();

    const addPostIcon = (
        <NavLink
            className={styles.AddPost}
            activeClassName={styles.AddPostActive}
            to='/posts/create'
        >
            <i className='d-inline p-1 fas fa-plus-square'></i>
            <span className='d-none d-md-block pr-4'>add post</span>
        </NavLink>
    );

    const handleSignOut = async () => {
        try {
            await axios.post('dj-rest-auth/logout/');
            setCurrentUser(null);
        } catch (err) {
            console.log(err);
        }
    };

    const loggedInIcons = (
        <>
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
                activeClassName={styles.Active}
                to='/newest'
            >
                <i className='d-sm-block d-md-none p-2 fas fa-stream'></i>
                <span className='d-none d-md-block p-2'>Newest</span>
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
                <Avatar src={currentUser?.profile_image} />
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
        <>
            <Container>
                <Navbar
                    expanded={expanded}
                    className={`${styles.NavBar} ${btnStyles.Toggle}`}
                    expand='md'
                    fixed='top'
                >
                    <Container className='d-block'>
                        <Row className='m-0 justify-content-between'>
                            <span className='d-flex'>
                                <NavLink to='/'>
                                    <Navbar.Brand className={styles.Brand}>
                                        Word
                                        <img
                                            src={logo}
                                            alt='logo'
                                            height='38px'
                                        />
                                        Share
                                    </Navbar.Brand>
                                </NavLink>
                                {currentUser && addPostIcon}
                            </span>
                            <Nav className={`${styles.Nav} float-right`}>
                                <Navbar.Toggle
                                    ref={ref}
                                    onClick={() => setExpanded(!expanded)}
                                    aria-controls='basic-navbar-nav'
                                />
                                <Navbar.Collapse
                                    className={styles.Collapse}
                                    id='basic-navbar-nav'
                                >
                                    <NavLink
                                        exact
                                        className={styles.NavLink}
                                        activeClassName={styles.Active}
                                        to='/'
                                    >
                                        <i className='d-sm-block d-md-none fas fa-home p-2'></i>
                                        <span className='d-none d-md-block p-2 pl-4'>
                                            Home
                                        </span>
                                    </NavLink>
                                    {currentUser
                                        ? loggedInIcons
                                        : loggedOutIcons}
                                </Navbar.Collapse>
                            </Nav>
                        </Row>
                    </Container>
                </Navbar>
            </Container>
        </>
    );
};

export default NavBar;
