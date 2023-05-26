import React, { useEffect, useRef, useState } from 'react';

import { Alert, Button, Container, Figure, Form } from 'react-bootstrap';

import { useHistory, useParams } from 'react-router';
import appStyles from '../../App.module.css';
import { axiosReq } from '../../api/axiosDefaults';
import upload from '../../assets/upload.png';
import Asset from '../../components/Asset';
import btnStyles from '../../styles/Button.module.css';

function PostEditForm() {
    const [deleteImage, setDeleteImage] = useState();
    const [errors, setErrors] = useState({});

    const [postData, setPostData] = useState({
        title: '',
        content: '',
        image: '',
        owner: '',
    });
    const { title, content, image } = postData;
    const { id } = useParams();
    const imageInput = useRef(null);
    const history = useHistory();

    useEffect(() => {
        const fetchPostData = async () => {
            try {
                const [{ data }] = await axiosReq.get(`/posts/${id}`);
                const { title, content, image, is_owner } = data;

                if (is_owner) {
                    setPostData({ title, content, image });
                } else {
                    history.push('/');
                }
            } catch (err) {
                console.log(err);
            }
        };

        fetchPostData();
    }, [id, history]);

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

    const handleDeleteImage = async () => {
        setDeleteImage(true);
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

        if (deleteImage) {
            try {
                await axiosReq.delete(`/posts/${id}/delete-image/`);
            } catch (err) {
                console.log(err);
            }
        } else if (imageInput?.current?.files[0]) {
            formData.append('image', imageInput.current.files[0]);
        }
        try {
            await axiosReq.put(`/posts/${id}/`, formData);
            history.push(`/posts/${id}`);
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
                <Form.Label>Content</Form.Label>
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
                save
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
                className={`${appStyles.Content} d-flex flex-column justify-content-center`}
            >
                <Form.Group className='text-center'>
                    <Figure>
                        <Figure.Image
                            className={appStyles.Image}
                            src={image}
                            rounded
                        />
                    </Figure>
                    <div>
                        {image ? (
                            <>
                                <Form.Label
                                    className={`${btnStyles.Button} ${btnStyles.ImgSubmit}`}
                                    htmlFor='image-upload'
                                >
                                    change image
                                </Form.Label>
                                <div>
                                    <Form.Label
                                        className={`d-inline m-0 ${btnStyles.Button} ${btnStyles.ImgCancel}`}
                                        htmlFor='cancel-image'
                                        onClick={handleDeleteImage}
                                    >
                                        delete image
                                    </Form.Label>
                                </div>
                            </>
                        ) : (
                            <>
                                <Form.Label
                                    className='justify-content-center'
                                    htmlFor='image-upload'
                                >
                                    <Asset
                                        src={upload}
                                        message='Click or tap to upload an image'
                                    />
                                </Form.Label>
                            </>
                        )}
                    </div>
                    <Form.File
                        id='image-upload'
                        accept='image/*'
                        onChange={handleChangeImage}
                        ref={imageInput}
                        className='d-none'
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

                <div className='d-md-none'>{textFields}</div>
            </Container>
            <Container className={appStyles.Content}>{textFields}</Container>
        </Form>
    );
}

export default PostEditForm;
