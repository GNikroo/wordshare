import React, { useEffect, useState } from 'react';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import { useParams } from 'react-router';
import appStyles from '../../App.module.css';
import { axiosReq } from '../../api/axiosDefaults';
import PostInteractions from '../../components/PostInteractions';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import Comment from '../comments/Comment';
import CommentCreateForm from '../comments/CommentCreateForm';
import FollowingProfiles from '../profiles/FollowingProfiles';
import Post from './Post';

function PostPage() {
    const { id } = useParams();
    const [post, setPost] = useState({ results: [] });
    const currentUser = useCurrentUser();
    const profile_image = currentUser?.profile_image;
    const [comments, setComments] = useState({ results: [] });

    useEffect(() => {
        const handleMount = async () => {
            try {
                const [{ data: post }, { data: comments }] = await Promise.all([
                    axiosReq.get(`/posts/${id}`),
                    axiosReq.get(`/comments/?post=${id}`),
                ]);
                setPost({ results: [post] });
                setComments(comments);
            } catch (err) {
                // console.log(err);
            }
        };

        handleMount();
    }, [id]);
    return (
        <Row className='h-100'>
            <FollowingProfiles mobile />
            <Col
                className='p-0 p-lg-2'
                lg={8}
            >
                {post.results.map((post) => (
                    <Post
                        key={post.id}
                        {...post}
                        setPosts={setPost}
                        postPage
                    />
                ))}
                <Container className={appStyles.Content}>
                    {currentUser ? (
                        <CommentCreateForm
                            profile_id={currentUser.profile_id}
                            profileImage={profile_image}
                            post={id}
                            setPost={setPost}
                            setComments={setComments}
                        />
                    ) : comments.results.length ? (
                        'Comments'
                    ) : null}
                    {comments.results.length ? (
                        comments.results.map((comment) => (
                            <Comment
                                key={comment.id}
                                {...comment}
                                setPost={setPost}
                                setComments={setComments}
                            />
                        ))
                    ) : currentUser ? (
                        <span>Be the first to comment!</span>
                    ) : (
                        <span>No comments</span>
                    )}
                </Container>
            </Col>
            <Col
                md={4}
                className='d-none d-lg-block p-0 p-lg-2'
            >
                <PostInteractions />
                <FollowingProfiles />
            </Col>
        </Row>
    );
}

export default PostPage;
