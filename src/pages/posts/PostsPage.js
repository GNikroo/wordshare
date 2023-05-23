import React, { useEffect, useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';

import Asset from '../../components/Asset';
import Post from './Post';

import { useLocation } from 'react-router';
import appStyles from '../../App.module.css';
import { axiosReq } from '../../api/axiosDefaults';
import styles from '../../styles/PostsPage.module.css';

import InfiniteScroll from 'react-infinite-scroll-component';
import NoResults from '../../assets/nothing-found.png';
import PostInteractions from '../../components/PostInteractions';
import { fetchMoreData } from '../../utils/utils';
import FollowingProfiles from '../profiles/FollowingProfiles';

function PostsPage({ message, filter = '' }) {
    const [posts, setPosts] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);
    const { pathname } = useLocation();

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
                console.log(err);
            }
        };

        setHasLoaded(false);
        const timer = setTimeout(() => {
            fetchPosts();
        }, 1000);

        return () => {
            clearTimeout(timer);
        };
    }, [filter, query, pathname]);

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
                    md={9}
                    className=''
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
                    md={3}
                    className='d-none d-md-block'
                >
                    <PostInteractions />
                    <FollowingProfiles />
                </Col>
            </Row>
        </Container>
    );
}

export default PostsPage;
