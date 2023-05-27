import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Media from 'react-bootstrap/Media';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';
import { axiosRes } from '../../api/axiosDefaults';
import Avatar from '../../components/Avatar';
import PostImage from '../../components/PostImage';
import PostInteractions from '../../components/PostInteractions';
import styles from '../../styles/Post.module.css';
import FollowingProfiles from '../profiles/FollowingProfiles';

const FeaturedPost = () => {
    const [featuredPost, setFeaturedPost] = useState(null);

    useEffect(() => {
        const fetchFeaturedPost = async () => {
            try {
                const response = await axiosRes.get('/featured/');
                const featuredPost = response.data;
                if (featuredPost) {
                    setFeaturedPost(featuredPost);
                }
            } catch (err) {
                // console.log(err);
            }
        };

        fetchFeaturedPost();
    }, []);

    if (!featuredPost) {
        return <div>Loading...</div>;
    }

    const {
        post: {
            id,
            owner,
            profile_id,
            profile_image,
            title,
            image,
            content,
            updated_at,
        },
    } = featuredPost;

    return (
        <Container className='h-100'>
            <Row className='d-sm-block d-md-none'>
                <FollowingProfiles mobile />
            </Row>
            <Row
                className='py-2 px-1'
                lg={8}
            >
                <Col
                    sm={12}
                    md={8}
                >
                    <Card className={`${styles.Post} align-items-center mx-2`}>
                        <Card.Body className={`${styles.CardBodyTop} p-0`}>
                            <Media className='align-items-baseline'>
                                <Link to={`/profiles/${profile_id}`}>
                                    <Avatar
                                        className='d-inline'
                                        src={profile_image}
                                        height={40}
                                    />
                                    <div className='d-inline font-weight-bold'>
                                        {owner}
                                    </div>
                                    <div className={`${styles.Date}`}>
                                        {updated_at}
                                    </div>
                                </Link>
                            </Media>
                            <hr className={styles.Line}></hr>
                        </Card.Body>
                        <Card.Body className={`${styles.CardBodyBottom} p-0`}>
                            <Link to={`/posts/${id}`}>
                                {image && (
                                    <PostImage
                                        height={'auto'}
                                        width={250}
                                        src={image}
                                        alt={title}
                                    />
                                )}
                                {title && (
                                    <Card.Title className='font-weight-bold'>
                                        {title}
                                    </Card.Title>
                                )}
                                {content && <Card.Text>{content}</Card.Text>}
                            </Link>
                        </Card.Body>
                    </Card>
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
};

export default FeaturedPost;
