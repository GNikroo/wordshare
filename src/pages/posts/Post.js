import React from 'react';
import { Card, Media, OverlayTrigger, Tooltip } from 'react-bootstrap';
import EllipsisText from 'react-ellipsis-text';
import { Link, useHistory } from 'react-router-dom';
import { axiosRes } from '../../api/axiosDefaults';
import Avatar from '../../components/Avatar';
import { MoreDropdown } from '../../components/MoreDropdown';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import styles from '../../styles/Post.module.css';

const Post = (props) => {
    const {
        id,
        owner,
        profile_id,
        profile_image,
        comments_count,
        likes_count,
        like_id,
        title,
        content,
        updated_at,
        postPage,
        setPosts,
    } = props;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;
    const history = useHistory();

    const handleEdit = () => {
        history.push(`/posts/${id}/edit`);
    };

    const handleDelete = async () => {
        try {
            await axiosRes.delete(`/posts/${id}/`);
            history.goBack();
        } catch (err) {
            console.log(err);
        }
    };

    const handleLike = async () => {
        try {
            const { data } = await axiosRes.post('/likes/', { post: id });
            setPosts((prevPosts) => ({
                ...prevPosts,
                results: prevPosts.results.map((post) => {
                    return post.id === id
                        ? {
                              ...post,
                              likes_count: post.likes_count + 1,
                              like_id: data.id,
                          }
                        : post;
                }),
            }));
        } catch (err) {
            console.log(err);
        }
    };

    const handleUnlike = async () => {
        try {
            await axiosRes.delete(`/likes/${like_id}/`);
            setPosts((prevPosts) => ({
                ...prevPosts,
                results: prevPosts.results.map((post) => {
                    return post.id === id
                        ? {
                              ...post,
                              likes_count: post.likes_count - 1,
                              like_id: null,
                          }
                        : post;
                }),
            }));
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Card className={`${styles.Post} align-items-center mx-2`}>
            <Card.Body className={`${styles.CardBodyTop} p-0`}>
                <Media className='align-items-baseline'>
                    <Link to={`/profiles/${profile_id}`}>
                        <Avatar
                            className='d-inline'
                            src={profile_image}
                            height={40}
                        />
                        <div className='d-inline font-weight-bold'>{owner}</div>
                        <div className={`${styles.Date}`}>{updated_at}</div>
                    </Link>
                    <div className='d-flex align-items-center'>
                        {is_owner && postPage && (
                            <MoreDropdown
                                handleEdit={handleEdit}
                                handleDelete={handleDelete}
                            />
                        )}
                    </div>
                </Media>
                <hr className={styles.Line}></hr>
            </Card.Body>
            <Link to={`/posts/${id}`}></Link>
            <Card.Body className={`${styles.CardBodyBottom} p-0`}>
                {title && (
                    <Link to={`/posts/${id}`}>
                        <Card.Title className=''>
                            <EllipsisText
                                text={title}
                                length={50}
                            />
                        </Card.Title>
                    </Link>
                )}
                {content && (
                    <Card.Text>
                        <EllipsisText
                            text={content}
                            length={300}
                        />
                    </Card.Text>
                )}
                <div className={styles.PostBar}>
                    <span className='pr-1'>
                        {is_owner ? (
                            <OverlayTrigger
                                placement='top'
                                overlay={
                                    <Tooltip>
                                        You can't like your own post!
                                    </Tooltip>
                                }
                            >
                                <i className='far fa-heart' />
                            </OverlayTrigger>
                        ) : like_id ? (
                            <span onClick={handleUnlike}>
                                <i className={`fas fa-heart ${styles.Heart}`} />
                            </span>
                        ) : currentUser ? (
                            <span onClick={handleLike}>
                                <i
                                    className={`far fa-heart ${styles.HeartOutline}`}
                                />
                            </span>
                        ) : (
                            <OverlayTrigger
                                placement='top'
                                overlay={
                                    <Tooltip>Log in to like posts!</Tooltip>
                                }
                            >
                                <i className='far fa-heart' />
                            </OverlayTrigger>
                        )}
                        {likes_count}
                    </span>
                    <span className='pl-1'>
                        <Link to={`/posts/${id}`}>
                            <i
                                className={`${styles.Flip} fa-regular fa-comment`}
                            />
                        </Link>
                        {comments_count}
                    </span>
                </div>
            </Card.Body>
        </Card>
    );
};

export default Post;
