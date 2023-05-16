import React, { useEffect, useState } from 'react';

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';

import appStyles from '../../App.module.css';
import btnStyles from '../../styles/Button.module.css';

import { useHistory, useParams } from 'react-router';
import { axiosReq } from '../../api/axiosDefaults';

function PostEditForm() {
    const [errors, setErrors] = useState({});

    const [postData, setPostData] = useState({
        title: '',
        content: '',
    });
    const { title, content } = postData;

    const history = useHistory();
    const { id } = useParams();

    useEffect(() => {
        const handleMount = async () => {
            try {
                const { data } = await axiosReq.get(`/posts/${id}/`);
                const { title, content, is_owner } = data;

                is_owner ? setPostData({ title, content }) : history.push('/');
            } catch (err) {
                console.log(err);
            }
        };

        handleMount();
    }, [history, id]);

    const handleChange = (event) => {
        setPostData({
            ...postData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();

        formData.append('title', title);
        formData.append('content', content);

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
                update
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
                className={`${appStyles.Content} d-flex mt-4 align-items-center`}
            >
                <div className='d-md-none'>{textFields}</div>
                <Container className={`${appStyles.Content} d-none d-md-block`}>
                    {textFields}
                </Container>
            </Container>
        </Form>
    );
}

export default PostEditForm;
