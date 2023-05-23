import React from 'react';
import { Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import appStyles from '../../App.module.css';
import AddFollower from '../../assets/add-friend.png';
import Asset from '../../components/Asset';
import { useProfileData } from '../../contexts/ProfileDataContext';
import Profile from './Profile';

const FollowingProfiles = ({ mobile }) => {
    const { followingProfiles } = useProfileData();

    const follow = (
        <>
            <NavLink to={`/feed`}>
                <Asset src={AddFollower} />
                Click here to find users to follow
            </NavLink>
        </>
    );

    return (
        <Container
            className={`${appStyles.Content} ${
                mobile && 'd-lg-none text-center mb-3'
            }`}
        >
            {followingProfiles.results.length ? (
                <>
                    {mobile ? (
                        <div className={`d-flex justify-content-around`}>
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
                <>{follow}</>
            )}
        </Container>
    );
};

export default FollowingProfiles;
