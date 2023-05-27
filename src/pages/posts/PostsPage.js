import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import Asset from '../../components/Asset';
import Post from './Post';

import { useLocation } from 'react-router';
import appStyles from '../../App.module.css';
import { axiosReq } from '../../api/axiosDefaults';
import styles from '../../styles/PostsPage.module.css';

import InfiniteScroll from 'react-infinite-scroll-component';
import NoResults from '../../assets/nothing-found.png';
import PostInteractions from '../../components/PostInteractions';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { fetchMoreData } from '../../utils/utils';
import FollowingProfiles from '../profiles/FollowingProfiles';

function PostsPage({ message, filter = '' }) {
    const [posts, setPosts] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);
    const { pathname } = useLocation();
    const currentUser = useCurrentUser();

    const [query, setQuery] = useState('');

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const { data } = await axiosReq.get(
                    `/posts/?${filter}search=${query}`
                );
                setPosts(data);
                setHasLoaded(true);
            } catch (err) {
                // console.log(err);
            }
        };

        setHasLoaded(false);
        const timer = setTimeout(() => {
            fetchPosts();
        }, 1000);

        return () => {
            clearTimeout(timer);
        };
    }, [filter, query, pathname, currentUser]);

    return (
        <Container className='h-100'>
            <Row className='d-sm-block d-md-none'>
                <FollowingProfiles mobile />
            </Row>
            <Row
                className='py-2 px-1'
                lg={8}
            >
                <Form
                    className={styles.SearchBar}
                    onSubmit={(event) => event.preventDefault()}
                >
                    <Form.Control
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        type='text'
                        className='mr-sm-2'
                        placeholder='Search. . .'
                    />
                </Form>
            </Row>
            <Row>
                <Col
                    sm={12}
                    md={8}
                >
                    {hasLoaded ? (
                        <>
                            {posts.results.length ? (
                                <InfiniteScroll
                                    children={posts.results.map((post) => (
                                        <Post
                                            feed_list
                                            key={post.id}
                                            {...post}
                                            setPosts={setPosts}
                                        />
                                    ))}
                                    dataLength={posts.results.length}
                                    loader={<Asset spinner />}
                                    hasMore={!!posts.next}
                                    next={() => fetchMoreData(posts, setPosts)}
                                />
                            ) : (
                                <Container
                                    className={`${appStyles.Content} text-center`}
                                >
                                    <Asset
                                        src={NoResults}
                                        message={message}
                                    />
                                </Container>
                            )}
                        </>
                    ) : (
                        <Container className={appStyles.Content}>
                            <Asset spinner />
                        </Container>
                    )}
                </Col>
                <Col
                    md={4}
                    className='d-none d-md-block p-0 p-lg-2'
                >
                    <PostInteractions />
                    <FollowingProfiles />
                </Col>
            </Row>
        </Container>
    );
}

export default PostsPage;
