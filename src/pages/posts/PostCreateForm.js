import React, { useRef, useState } from 'react';
import { axiosReq } from '../../api/axiosDefaults';

import { Alert, Image } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import appStyles from '../../App.module.css';
import btnStyles from '../../styles/Button.module.css';
import styles from '../../styles/PostCreateEditForm.module.css';

import { useHistory } from 'react-router-dom';
import upload from '../../assets/upload.png';
import Asset from '../../components/Asset';

function PostCreateForm() {
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
        console.log('handleChangeImage');
        if (event.target.files.length) {
            URL.revokeObjectURL(image);
            setPostData({
                ...postData,
                image: URL.createObjectURL(event.target.files[0]),
            });
        }
    };

    const handleCancelImage = () => {
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
            const { data } = await axiosReq.post('/posts/', formData);
            history.push(`/posts/${data.id}`);
        } catch (err) {
            console.log(err);
            if (err.response?.status !== 401) {
                setErrors(err.response?.data);
            }
        }
    };

    const textFields = (
        <div className='text-center'>
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
            <Row>
                <Col
                    className='py-2 p-0 p-md-2'
                    md={7}
                    lg={8}
                >
                    <Container
                        className={`${appStyles.Content} ${styles.Container} d-flex`}
                    >
                        <Form.Group className='text-center'>
                            {image ? (
                                <>
                                    <figure>
                                        <Image
                                            className={appStyles.Image}
                                            src={image}
                                            rounded
                                        />
                                    </figure>
                                    <div>
                                        <Form.Label
                                            className={`${btnStyles.Button} ${btnStyles.Submit} btn mb-0`}
                                            htmlFor='image-upload'
                                        >
                                            Change the image
                                        </Form.Label>
                                        <Button
                                            onClick={handleCancelImage}
                                            className={`${btnStyles.Button} ${btnStyles.Cancel}`}
                                        >
                                            Cancel upload
                                        </Button>
                                    </div>
                                </>
                            ) : (
                                <Form.Label
                                    className='d-flex justify-content-center'
                                    htmlFor='image-upload'
                                >
                                    <Asset
                                        src={upload}
                                        message='Click or tap to upload an image'
                                    />
                                </Form.Label>
                            )}
                            <Form.File
                                id='image-upload'
                                accept='image/*'
                                onChange={handleChangeImage}
                                className='invisible'
                                ref={imageInput}
                                required={false}
                            />
                        </Form.Group>
                        <div className='d-md-none'>{textFields}</div>
                    </Container>
                </Col>
                <Col
                    md={5}
                    lg={4}
                    className='d-none d-md-block p-0 p-md-2'
                >
                    <Container className={appStyles.Content}>
                        {textFields}
                    </Container>
                </Col>
            </Row>
        </Form>
    );
}

export default PostCreateForm;
