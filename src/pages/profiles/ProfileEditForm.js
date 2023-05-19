import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import {
    Alert,
    Button,
    Col,
    Container,
    Figure,
    Form,
    Row,
} from 'react-bootstrap';

import axios from 'axios'
import { axiosReq } from '../../api/axiosDefaults';
import {
    useCurrentUser,
    useSetCurrentUser,
} from '../../contexts/CurrentUserContext';

import appStyles from '../../App.module.css';
import btnStyles from '../../styles/Button.module.css';

const ProfileEditForm = () => {
    const currentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();
    const { id } = useParams();
    const history = useHistory();
    const imageFile = useRef();

    const [profileData, setProfileData] = useState({
        name: '',
        content: '',
        image: '',
    });
    const { name, content, image } = profileData;

    const [errors, setErrors] = useState({});

    useEffect(() => {
        const source = axios.CancelToken.source();
        const handleMount = async () => {
            if (currentUser?.profile_id?.toString() === id) {
                try {
                    const { data } = await axiosReq.get(`/profiles/${id}/`);
                    const { name, content, image } = data;
                    setProfileData({ name, content, image });
                } catch (err) {
                    console.log(err);
                    history.push('/');
                }
            } else {
                history.push('/');
            }
        };
        handleMount();
        return () => source.cancel();
    }, [currentUser, history, id]);

    const handleChange = (event) => {
        setProfileData({
            ...profileData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('content', content);

        if (imageFile?.current?.files[0]) {
            formData.append('image', imageFile?.current?.files[0]);
        }

        try {
            const { data } = await axiosReq.put(`/profiles/${id}/`, formData);
            setCurrentUser((currentUser) => ({
                ...currentUser,
                profile_image: data.image,
            }));
            history.goBack();
        } catch (err) {
            console.log(err);
            setErrors(err.response?.data);
        }
    };

    const textFields = (
        <>
            <Form.Group className='mt-2'>
                <Form.Label>update your bio</Form.Label>
                <Form.Control
                    as='textarea'
                    value={content}
                    onChange={handleChange}
                    name='content'
                    rows={7}
                />
            </Form.Group>

            {errors?.content?.map((message, idx) => (
                <Alert
                    variant='warning'
                    key={idx}
                >
                    {message}
                </Alert>
            ))}
            <Button
                className={`${btnStyles.Button} ${btnStyles.Submit}`}
                type='submit'
            >
                save
            </Button>
            <Button
                className={`${btnStyles.Button} ${btnStyles.Cancel}`}
                onClick={() => history.goBack()}
            >
                cancel
            </Button>
        </>
    );

    return (
        <Form onSubmit={handleSubmit}>
            <Row className=''>
                <Col className='text-center'>
                    <Container className={appStyles.Content}>
                        <Form.Group className='mt-5'>
                            {image && (
                                <Figure>
                                    <Figure.Image
                                        className='m-0'
                                        src={image}
                                        width={180}
                                        height={180}
                                    />
                                </Figure>
                            )}
                            {errors?.image?.map((message, idx) => (
                                <Alert
                                    variant='warning'
                                    key={idx}
                                >
                                    {message}
                                </Alert>
                            ))}
                            <div>
                                <Form.Label
                                    className={`${btnStyles.Button} ${btnStyles.ImgSubmit} d-inline`}
                                    htmlFor='image-upload'
                                >
                                    change profile image
                                </Form.Label>
                            </div>
                            <Form.File
                                id='image-upload'
                                ref={imageFile}
                                accept='image/*'
                                className='invisible'
                                onChange={(e) => {
                                    if (e.target.files.length) {
                                        setProfileData({
                                            ...profileData,
                                            image: URL.createObjectURL(
                                                e.target.files[0]
                                            ),
                                        });
                                    }
                                }}
                            />
                        </Form.Group>
                        <div>{textFields}</div>
                    </Container>
                </Col>
                {/* <Col
                    md={5}
                    lg={6}
                    className='d-none d-md-block p-0 p-md-2 text-center'
                >
                    <Container className={appStyles.Content}>
                        {textFields}
                    </Container>
                </Col> */}
            </Row>
        </Form>
    );
};

export default ProfileEditForm;
