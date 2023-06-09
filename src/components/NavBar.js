import axios from 'axios';
import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import { NavLink } from 'react-router-dom';
import logo from '../assets/quill.png';
import {
    useCurrentUser,
    useSetCurrentUser,
} from '../contexts/CurrentUserContext';
import useClickOutsideToggle from '../hooks/useClickOutsideToggle';
import btnStyles from '../styles/Button.module.css';
import styles from '../styles/NavBar.module.css';

import { removeTokenTimestamp } from '../utils/utils';
import Avatar from './Avatar';
import PostInteractions from './PostInteractions';

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
            <i className='d-sm-block d-md-none p-1 fas fa-plus-square'></i>
            <span className='d-none d-md-block pr-4'>add post</span>
        </NavLink>
    );

    const handleSignOut = async () => {
        try {
            await axios.post('dj-rest-auth/logout/');
            setCurrentUser(null);
            removeTokenTimestamp();
        } catch (err) {
            // console.log(err);
        }
    };

    const loggedInIcons = (
        <>
            <NavLink
                className={styles.NavLink}
                activeClassName={styles.Active}
                to='/following'
            >
                <i
                    className={`d-md-block d-lg-none p-2 fa-solid fa-people-group`}
                ></i>
                <span className='d-none d-lg-block p-2'>following</span>
            </NavLink>
            <NavLink
                exact
                className={styles.NavLink}
                activeClassName={styles.Active}
                to='/featured'
            >
                <i className='d-md-block d-lg-none fa-solid fa-star p-2'></i>
                <span className='d-none d-lg-block p-2'>featured</span>
            </NavLink>
            <PostInteractions />
            <NavLink
                className={styles.NavLink}
                to='/'
                onClick={handleSignOut}
            >
                <i className='d-sm-block d-md-none p-2 fas fa-sign-out-alt'></i>
                <span className='d-none d-md-block p-2'>sign out</span>
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
                <i className='d-md-block d-lg-none fas fa-sign-in-alt p-2'></i>
                <span className='d-none d-lg-block p-2'>sign in</span>
            </NavLink>
            <NavLink
                to='/signup'
                className={styles.NavLink}
                activeClassName={styles.Active}
            >
                <i className='d-md-block d-lg-none fas fa-user-plus p-2'></i>
                <span className='d-none d-lg-block p-2'>sign up</span>
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
                                {expanded ? (
                                    <Navbar.Toggle
                                        ref={ref}
                                        onClick={() => setExpanded(!expanded)}
                                        aria-controls='basic-navbar-nav'
                                        className={styles.HideToggle}
                                    />
                                ) : (
                                    <Navbar.Toggle
                                        ref={ref}
                                        onClick={() => setExpanded(!expanded)}
                                        aria-controls='basic-navbar-nav'
                                    />
                                )}
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
                                        <i className='d-md-block d-lg-none fas fa-home p-2'></i>
                                        <span className='d-none d-lg-block p-2 pl-4'>
                                            feed
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
