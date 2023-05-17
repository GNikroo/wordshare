import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Avatar from '../../components/Avatar';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import btnStyles from '../../styles/Button.module.css';
import styles from '../../styles/Profile.module.css';

const Profile = (props) => {
    const { profile, mobile, imageSize = 45 } = props;
    const { id, following_id, image, owner } = profile;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;

    return (
        <div
            className={`my-3 d-flex align-items-center ${
                mobile && 'flex-column'
            }`}
        >
            <Row>
                <Col>
                    <div>
                        <Link
                            className='align-self-center'
                            to={`/profiles/${id}`}
                        >
                            {mobile ? (
                                <Avatar
                                    src={image}
                                    height={35}
                                />
                            ) : (
                                <Avatar
                                    src={image}
                                    height={imageSize}
                                />
                            )}
                        </Link>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    {mobile ? (
                        <div className={`mx-2 ${styles.MobileProfile}`}></div>
                    ) : (
                        <div className={`mx-2 ${styles.DesktopProfile}`}>
                            {owner}
                        </div>
                    )}
                    <div className={`text-right ${!mobile && 'ml-auto'}`}>
                        {!mobile &&
                            currentUser &&
                            !is_owner &&
                            (following_id ? (
                                <Button
                                    className={`${btnStyles.Button} ${btnStyles.Unfollow}`}
                                    onClick={() => {}}
                                >
                                    unfollow
                                </Button>
                            ) : (
                                <Button
                                    className={`${btnStyles.Button} ${btnStyles.Follow} d-flex`}
                                    onClick={() => {}}
                                >
                                    follow
                                </Button>
                            ))}
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default Profile;
