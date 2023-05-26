import React, { useRef, useState } from 'react';
import { axiosReq } from '../../api/axiosDefaults';
import { useRedirect } from '../../hooks/useRedirect';

import {
    Alert,
    Button,
    Col,
    Container,
    Figure,
    Form,
    Row,
} from 'react-bootstrap';

import appStyles from '../../App.module.css';
import Asset from '../../components/Asset';
import btnStyles from '../../styles/Button.module.css';

import { useHistory } from 'react-router-dom';
import upload from '../../assets/upload.png';

function PostCreateForm() {
    useRedirect('loggedOut');
    const [errors, setErrors] = useState({});
    const [postData, setPostData] = useState({
        title: '',
        content: '',
        image: '',
    });
    const { title, content, image } = postData;

    const imageInput = useRef(null);
    const history = useHistory();

    const handleChange = (event) => {
        setPostData({
            ...postData,
            [event.target.name]: event.target.value,
        });
    };

    const handleChangeImage = (event) => {
        if (event.target.files.length) {
            URL.revokeObjectURL(image);
            setPostData({
                ...postData,
                image: URL.createObjectURL(event.target.files[0]),
            });
        }
    };

    const handleCancelImage = async () => {
        URL.revokeObjectURL(image);
        setPostData({
            ...postData,
            image: null,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();

        formData.append('title', title);
        formData.append('content', content);
        if (image) {
            formData.append('image', imageInput.current.files[0]);
        }

        try {
            const response = await axiosReq.post('/posts/', formData);
            const post = response.data;
            history.push(`/posts/${post.id}`);
        } catch (err) {
            console.log(err);
            if (err.response?.status !== 401) {
                setErrors(err.response?.data);
            }
        }
    };

    const textFields = (
        <div>
            <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control
                    type='text'
                    name='title'
                    value={title}
                    onChange={handleChange}
                />
            </Form.Group>
            {errors?.title?.map((message, idx) => (
                <Alert
                    variant='warning'
                    key={idx}
                >
                    {message}
                </Alert>
            ))}
            <Form.Group>
                <Form.Label>Post</Form.Label>
                <Form.Control
                    as='textarea'
                    rows={6}
                    name='content'
                    value={content}
                    onChange={handleChange}
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
                create
            </Button>
            <Button
                className={`${btnStyles.Button} ${btnStyles.Cancel}`}
                onClick={() => history.goBack()}
            >
                cancel
            </Button>
        </div>
    );

    return (
        <Form onSubmit={handleSubmit}>
            <Container
                className={`${appStyles.Content} mt-4 align-items-center`}
            >
                <Form.Group className='text-center'>
                    {image ? (
                        <Row>
                            <Col>
                                <Figure>
                                    <Figure.Image
                                        className={appStyles.Image}
                                        src={image}
                                        rounded
                                    />
                                </Figure>
                                <div>
                                    <div>
                                        <Form.Label
                                            className={`d-inline m-0 ${btnStyles.Button} ${btnStyles.ImgSubmit}`}
                                            htmlFor='image-upload'
                                        >
                                            change the image
                                        </Form.Label>
                                    </div>
                                    <div>
                                        <Form.Label
                                            className={`d-inline m-0 ${btnStyles.Button} ${btnStyles.ImgCancel}`}
                                            htmlFor='image-upload'
                                            onClick={handleCancelImage}
                                        >
                                            cancel upload
                                        </Form.Label>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    ) : (
                        <Row>
                            <Col>
                                <Form.Label
                                    className={`${appStyles.ClickTap} justify-content-center`}
                                    htmlFor='image-upload'
                                >
                                    <Asset
                                        src={upload}
                                        message='Click or tap to upload an image'
                                    />
                                </Form.Label>
                            </Col>
                        </Row>
                    )}
                    <Form.File
                        id='image-upload'
                        accept='image/*'
                        onChange={handleChangeImage}
                        className='d-none'
                        ref={imageInput}
                    />
                </Form.Group>
                {errors?.image?.map((message, idx) => (
                    <Alert
                        variant='warning'
                        key={idx}
                    >
                        {message}
                    </Alert>
                ))}
                <Row>
                    <Col>
                        <div className='d-md-none'>{textFields}</div>
                        <Container
                            className={`${appStyles.Content} d-none d-md-block`}
                        >
                            {textFields}
                        </Container>
                    </Col>
                </Row>
            </Container>
        </Form>
    );
}

export default PostCreateForm;
