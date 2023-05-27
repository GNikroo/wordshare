import React from 'react';
import { Container } from 'react-bootstrap';
import appStyles from '../../App.module.css';
import AddFollower from '../../assets/add-friend.png';
import Asset from '../../components/Asset';
import { useProfileData } from '../../contexts/ProfileDataContext';
import styles from '../../styles/FollowingProfiles.module.css';
import Profile from './Profile';

const FollowingProfiles = () => {
    const { followingProfiles } = useProfileData();

    return (
        <Container
            className={`${appStyles.Content} ${styles.List} text-center mb-3`}
        >
            {followingProfiles.results?.length ? (
                <>
                    <div className='d-flex justify-content-around'>
                        {followingProfiles.results
                            .slice(0, 5)
                            .map((profile) => (
                                <Profile
                                    key={profile.id}
                                    profile={profile}
                                />
                            ))}
                    </div>
                </>
            ) : (
                <div className={`${appStyles.EmptyFollowing} `}>
                    <div className='d-sm-none d-md-block'>
                        <Asset
                            height={'4rem'}
                            src={AddFollower}
                        />
                    </div>
                    <span className={appStyles.ClickTap}>
                        users you follow will show up here
                    </span>
                </div>
            )}
        </Container>
    );
};

export default FollowingProfiles;
