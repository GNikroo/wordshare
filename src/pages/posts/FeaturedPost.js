import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Media from 'react-bootstrap/Media';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';
import appStyles from '../../App.module.css';
import { axiosRes } from '../../api/axiosDefaults';
import Avatar from '../../components/Avatar';
import PostImage from '../../components/PostImage';
import styles from '../../styles/Post.module.css';

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
        <Container className={`${appStyles.Container} h-100`}>
            <Row
                className='d-block py-2 px-1'
                lg={8}
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
            </Row>
        </Container>
    );
};

export default FeaturedPost;
