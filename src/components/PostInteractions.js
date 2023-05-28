import React from 'react';

import navStyles from '../styles/NavBar.module.css';
import styles from '../styles/PostInteractions.module.css';

import { NavLink } from 'react-router-dom';

const PostInteractions = () => {
    return (
        <>
            <NavLink
                className={navStyles.NavLink}
                activeClassName={styles.Active}
                to='/commented'
            >
                <i className='d-md-block d-lg-none p-2 fa-solid fa-comment-dots'></i>
                <span className={`${styles.Comments} d-none d-lg-block p-2`}>
                    comments
                </span>
            </NavLink>
            <NavLink
                className={navStyles.NavLink}
                activeClassName={styles.Active}
                to='/liked'
            >
                <i className='d-md-block d-lg-none p-2 fas fa-heart'></i>
                <span className={`${styles.Likes} d-none d-lg-block p-2`}>
                    likes
                </span>
            </NavLink>
        </>
    );
};

export default PostInteractions;
