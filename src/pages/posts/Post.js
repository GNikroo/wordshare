import React from 'react';
import { Card, Media, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import appStyles from '../../App.module.css';
import { axiosRes } from '../../api/axiosDefaults';
import Avatar from '../../components/Avatar';
import { MoreDropdown } from '../../components/MoreDropdown';
import PostImage from '../../components/PostImage';
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
        image,
        content,
        feed_list,
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
            history.push(`/profiles/${id}/`);
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

    const imageLink = (
        <>
            {image ? (
                <>
                    <Link to={`/posts/${id}`}>
                        <PostImage
                            height={100}
                            width={'auto'}
                            src={image}
                            alt={title}
                        />
                    </Link>
                </>
            ) : (
                <></>
            )}
        </>
    );

    const imagePost = (
        <>
            <PostImage
                height={'auto'}
                width={250}
                src={image}
                alt={title}
            />
        </>
    );

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
                    <div className='d-flex pl-2 align-items-center'>
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
            <Card.Body className={`${styles.CardBodyBottom} p-0`}>
                {feed_list ? (
                    <Link to={`/posts/${id}`}>
                        {imageLink}
                        <div className={appStyles.Truncated}>
                            {title && <Card.Title>{title}</Card.Title>}
                            {content && (
                                <Card.Text className={appStyles.Ellipses}>
                                    {content}
                                </Card.Text>
                            )}
                        </div>
                    </Link>
                ) : (
                    <>
                        {imagePost}
                        {title && (
                            <Card.Title className='font-weight-bold'>
                                {title}
                            </Card.Title>
                        )}
                        {content && <Card.Text>{content}</Card.Text>}
                    </>
                )}

                <div className={styles.PostBar}>
                    <span className='pr-2'>
                        {is_owner ? (
                            <OverlayTrigger
                                placement='top'
                                overlay={
                                    <Tooltip>
                                        You can't like your own post!
                                    </Tooltip>
                                }
                            >
                                <i
                                    className={`far fa-heart ${styles.HeartOutline}`}
                                />
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
                        <span className='pl-1'>{likes_count}</span>
                    </span>
                    <span className='pl-2'>
                        <Link to={`/posts/${id}`}>
                            <i
                                className={`${styles.Mirror} ${styles.Comment} fa-solid fa-comment`}
                            />
                        </Link>
                        <span className='pl-1'>{comments_count}</span>
                    </span>
                </div>
            </Card.Body>
        </Card>
    );
};

export default Post;
