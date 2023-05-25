import React from 'react';
import { Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import appStyles from '../../App.module.css';
import AddFollower from '../../assets/add-friend.png';
import Asset from '../../components/Asset';
import { useProfileData } from '../../contexts/ProfileDataContext';
import styles from '../../styles/FollowingProfiles.module.css';
import Profile from './Profile';

const FollowingProfiles = ({ mobile }) => {
    const { followingProfiles } = useProfileData();

    return (
        <Container
            className={`${appStyles.Content} ${!mobile && `${styles.List}`} ${
                mobile && `${styles.MobileList} d-lg-none text-center mb-3`
            } py-2`}
        >
            {followingProfiles.results?.length ? (
                <>
                    {mobile ? (
                        <div className='d-flex justify-content-around'>
                            {followingProfiles.results
                                .slice(0, 5)
                                .map((profile) => (
                                    <Profile
                                        key={profile.id}
                                        profile={profile}
                                        mobile
                                    />
                                ))}
                        </div>
                    ) : (
                        followingProfiles.results.map((profile) => (
                            <Profile
                                key={profile.id}
                                profile={profile}
                            />
                        ))
                    )}
                </>
            ) : (
                <div>
                    <NavLink to={`/feed`}>
                        <div className='d-sm-none d-md-block'>
                            <Asset src={AddFollower} />
                        </div>
                        <span className={appStyles.ClickTap}>
                            Click or tap here to find users to follow
                        </span>
                    </NavLink>
                </div>
            )}
        </Container>
    );
};

export default FollowingProfiles;
