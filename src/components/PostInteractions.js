import React from 'react';

import { ListGroup } from 'react-bootstrap';

import styles from '../styles/PostInteractions.module.css';

import { NavLink } from 'react-router-dom';

const PostInteractions = (props) => {
    const { mobile } = props;
    return (
        <>
            {mobile ? (
                <>
                    <NavLink
                        className={styles.NavLink}
                        activeClassName={styles.Active}
                        to='/commented'
                    >
                        <i className='d-sm-block d-md-none p-2 fa-solid fa-comment-dots'></i>
                    </NavLink>
                    <NavLink
                        className={styles.NavLink}
                        activeClassName={styles.Active}
                        to='/liked'
                    >
                        <i className='d-sm-block d-md-none p-2 fas fa-heart'></i>
                    </NavLink>
                </>
            ) : (
                <>
                    <ListGroup className='d-block'>
                        <ListGroup.Item className={styles.List}>
                            <NavLink
                                className={styles.NavLink}
                                activeClassName={styles.Active}
                                to='/commented'
                            >
                                <span className={styles.Comments}>
                                    your comments
                                </span>
                            </NavLink>
                        </ListGroup.Item>
                        <ListGroup.Item className={styles.List}>
                            <NavLink
                                className={styles.NavLink}
                                activeClassName={styles.Active}
                                to='/liked'
                            >
                                <span className={styles.Likes}>your likes</span>
                            </NavLink>
                        </ListGroup.Item>
                    </ListGroup>
                </>
            )}
        </>
    );
};

export default PostInteractions;
