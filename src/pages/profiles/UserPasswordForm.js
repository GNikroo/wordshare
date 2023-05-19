import React, { useEffect, useState } from 'react';

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import { useHistory, useParams } from 'react-router-dom';
import { axiosRes } from '../../api/axiosDefaults';
import { useCurrentUser } from '../../contexts/CurrentUserContext';

import appStyles from '../../App.module.css';
import btnStyles from '../../styles/Button.module.css';

const UserPasswordForm = () => {
    const history = useHistory();
    const { id } = useParams();
    const currentUser = useCurrentUser();

    const [userData, setUserData] = useState({
        new_password1: '',
        new_password2: '',
    });
    const { new_password1, new_password2 } = userData;

    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        setUserData({
            ...userData,
            [event.target.name]: event.target.value,
        });
    };

    useEffect(() => {
        if (currentUser?.profile_id?.toString() !== id) {
            // redirect user if they are not the owner of this profile
            history.push('/');
        }
    }, [currentUser, history, id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axiosRes.post('/dj-rest-auth/password/change/', userData);
            history.goBack();
        } catch (err) {
            console.log(err);
            setErrors(err.response?.data);
        }
    };

    return (
        <Row>
            <Col
                className='py-2 mx-auto text-center'
                md={6}
            >
                <Container className={appStyles.Content}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>new password</Form.Label>
                            <Form.Control
                                type='password'
                                value={new_password1}
                                onChange={handleChange}
                                name='new_password1'
                            />
                        </Form.Group>
                        {errors?.new_password1?.map((message, idx) => (
                            <Alert
                                key={idx}
                                variant='warning'
                            >
                                {message}
                            </Alert>
                        ))}
                        <Form.Group>
                            <Form.Label>confirm password</Form.Label>
                            <Form.Control
                                type='password'
                                value={new_password2}
                                onChange={handleChange}
                                name='new_password2'
                            />
                        </Form.Group>
                        {errors?.new_password2?.map((message, idx) => (
                            <Alert
                                key={idx}
                                variant='warning'
                            >
                                {message}
                            </Alert>
                        ))}
                        <Button
                            type='submit'
                            className={`${btnStyles.Button} ${btnStyles.Submit}`}
                        >
                            save
                        </Button>
                        <Button
                            className={`${btnStyles.Button} ${btnStyles.Cancel}`}
                            onClick={() => history.goBack()}
                        >
                            cancel
                        </Button>
                    </Form>
                </Container>
            </Col>
        </Row>
    );
};

export default UserPasswordForm;
