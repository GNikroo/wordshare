import React from 'react';
import { Container } from 'react-bootstrap';
import appStyles from '../../App.module.css';
import Asset from '../../components/Asset';
import { useProfileData } from '../../contexts/ProfileDataContext';
import Profile from './Profile';

const FollowingProfiles = ({ mobile }) => {
    const { followingProfiles } = useProfileData();

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
                <Asset spinner />
            )}
        </Container>
    );
};

export default FollowingProfiles;
