import React, { useEffect, useState } from 'react';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';

import Asset from '../../components/Asset';

import appStyles from '../../App.module.css';
import btnStyles from '../../styles/Button.module.css';
import styles from '../../styles/ProfilePage.module.css';

import InfiniteScroll from 'react-infinite-scroll-component';
import { useParams } from 'react-router-dom';
import { axiosReq } from '../../api/axiosDefaults';
import NoResults from '../../assets/nothing-found.png';
import { ProfileEditDropdown } from '../../components/MoreDropdown';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import {
    useProfileData,
    useSetProfileData,
} from '../../contexts/ProfileDataContext';
import { fetchMoreData } from '../../utils/utils';
import Post from '../posts/Post';
import FollowingProfiles from './FollowingProfiles';

function ProfilePage() {
    const [hasLoaded, setHasLoaded] = useState(false);
    const [profilePosts, setProfilePosts] = useState({ results: [] });

    const currentUser = useCurrentUser();
    const { id } = useParams();

    const { setProfileData, handleFollow, handleUnfollow } =
        useSetProfileData();
    const { pageProfile } = useProfileData();

    const [profile] = pageProfile.results;
    const is_owner = currentUser?.username === profile?.owner;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [{ data: pageProfile }, { data: profilePosts }] =
                    await Promise.all([
                        axiosReq.get(`/profiles/${id}`),
                        axiosReq.get(`/posts/?owner__profile=${id}`),
                    ]);
                setProfileData((prevState) => ({
                    ...prevState,
                    pageProfile: { results: [pageProfile] },
                }));
                setProfilePosts(profilePosts);
                setHasLoaded(true);
            } catch (err) {
                // console.log(err);
            }
        };
        fetchData();
    }, [id, setProfileData]);

    const mainProfile = (
        <>
            <Row
                noGutters
                className='mb-2 px-3 justify-content-center text-center'
            >
                <Col lg={3}>
                    <Image
                        className={styles.ProfileImage}
                        roundedCircle
                        src={profile?.image}
                    />
                </Col>
                <Col
                    className='mt-3'
                    lg={5}
                >
                    <span className='align-text-bottom'>
                        <h3 className='d-inline m-2'>{profile?.owner}</h3>
                        {profile?.is_owner && (
                            <ProfileEditDropdown id={profile?.id} />
                        )}
                    </span>
                    <span className='d-none d-lg-inline align-text-bottom'>
                        {currentUser &&
                            !is_owner &&
                            (profile?.following_id ? (
                                <Button
                                    className={`${btnStyles.Button} ${btnStyles.Unfollow}`}
                                    onClick={() => handleUnfollow(profile)}
                                >
                                    unfollow
                                </Button>
                            ) : (
                                <Button
                                    className={`${btnStyles.Button} ${btnStyles.Follow}`}
                                    onClick={() => handleFollow(profile)}
                                >
                                    follow
                                </Button>
                            ))}
                    </span>
                    <Row className='justify-content-center no-gutters'>
                        <Col
                            xs={3}
                            className='m-2'
                        >
                            <div>{profile?.posts_count}</div>
                            <div>posts</div>
                        </Col>
                        <Col
                            xs={3}
                            className='m-2'
                        >
                            <div>{profile?.followers_count}</div>
                            <div>followers</div>
                        </Col>
                        <Col
                            xs={3}
                            className='m-2'
                        >
                            <div>{profile?.following_count}</div>
                            <div>following</div>
                        </Col>
                    </Row>
                    <Col className='mb-3 d-lg-none'>
                        {currentUser &&
                            !is_owner &&
                            (profile?.following_id ? (
                                <Button
                                    className={`${btnStyles.Button} ${btnStyles.Unfollow}`}
                                    onClick={() => handleUnfollow(profile)}
                                >
                                    unfollow
                                </Button>
                            ) : (
                                <Button
                                    className={`${btnStyles.Button} ${btnStyles.Follow}`}
                                    onClick={() => handleFollow(profile)}
                                >
                                    follow
                                </Button>
                            ))}
                    </Col>
                </Col>
            </Row>
            <Row>
                {profile?.content && (
                    <Col className='text-center pb-3'>
                        <strong className={styles.Bio}>
                            {profile.content}
                        </strong>
                    </Col>
                )}
            </Row>
        </>
    );

    const mainProfilePosts = (
        <>
            {profilePosts.results.length ? (
                <InfiniteScroll
                    children={profilePosts.results.map((post) => (
                        <Post
                            key={post.id}
                            {...post}
                            setPosts={setProfilePosts}
                            feed_list
                        />
                    ))}
                    dataLength={profilePosts.results.length}
                    loader={<Asset spinner />}
                    hasMore={!!profilePosts.next}
                    next={() => fetchMoreData(profilePosts, setProfilePosts)}
                />
            ) : (
                <span className='text-center'>
                    <Asset
                        src={NoResults}
                        message={`No results found, ${profile?.owner} hasn't posted yet.`}
                    />
                </span>
            )}
        </>
    );

    return (
        <>
            <Row>
                <FollowingProfiles />
                <Container className={appStyles.Content}>
                    {hasLoaded ? (
                        <>
                            {mainProfile}
                            {mainProfilePosts}
                        </>
                    ) : (
                        <Asset spinner />
                    )}
                </Container>
            </Row>
        </>
    );
}

export default ProfilePage;
