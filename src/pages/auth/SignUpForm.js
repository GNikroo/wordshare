import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import btnStyles from '../../styles/Button.module.css';
import styles from '../../styles/SignInUpForm.module.css';

import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import { useRedirect } from '../../hooks/useRedirect';

const SignUpForm = () => {
    useRedirect('loggedIn');
    const [signUpData, setSignUpData] = useState({
        username: '',
        password1: '',
        password2: '',
    });
    const { username, password1, password2 } = signUpData;

    const [errors, setErrors] = useState({});

    const history = useHistory();

    const handleChange = (event) => {
        setSignUpData({
            ...signUpData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('/dj-rest-auth/registration/', signUpData);
            history.push('/signin');
        } catch (err) {
            setErrors(err.response?.data);
        }
    };

    return (
        <Container className={styles.Container}>
            <Card className={`${styles.Card} my-auto p-md-2`}>
                <Card.Body className={`${styles.Body}`}>
                    <Row className='align-items-center'>
                        <Col>
                            <h2 className={styles.Title}>sign up</h2>
                            <p className={styles.Text}>
                                and start sharing your ideas!
                            </p>
                            <Form
                                className={styles.Form}
                                onSubmit={handleSubmit}
                            >
                                <Form.Group controlId='username'>
                                    <Form.Label className='float-left font-weight-bold'>
                                        Username
                                    </Form.Label>
                                    <Form.Control
                                        type='text'
                                        name='username'
                                        value={username}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                {errors.username?.map((message, idx) => (
                                    <Alert
                                        variant='warning'
                                        key={idx}
                                    >
                                        {message}
                                    </Alert>
                                ))}
                                <Form.Group controlId='password1'>
                                    <Form.Label className='float-left font-weight-bold'>
                                        Password
                                    </Form.Label>
                                    <Form.Control
                                        type='password'
                                        name='password1'
                                        value={password1}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                {errors.password1?.map((message, idx) => (
                                    <Alert
                                        variant='warning'
                                        key={idx}
                                    >
                                        {message}
                                    </Alert>
                                ))}
                                <Form.Group controlId='password2'>
                                    <Form.Label className='float-left font-weight-bold'>
                                        Confirm password
                                    </Form.Label>
                                    <Form.Control
                                        type='password'
                                        name='password2'
                                        value={password2}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                {errors.password2?.map((message, idx) => (
                                    <Alert
                                        variant='warning'
                                        key={idx}
                                    >
                                        {message}
                                    </Alert>
                                ))}
                                <Button
                                    className={`${btnStyles.Button} btn-outline-light`}
                                    type='submit'
                                >
                                    Sign up!
                                </Button>
                                {errors.non_field_errors?.map(
                                    (message, idx) => (
                                        <Alert
                                            key={idx}
                                            variant='warning'
                                            className='mt-3'
                                        >
                                            {message}
                                        </Alert>
                                    )
                                )}
                            </Form>
                            <Link
                                className={styles.Link}
                                to='/signin'
                            >
                                Have an account? <span>Sign in</span>
                            </Link>
                        </Col>
                        <Col
                            md={5}
                            className='d-none d-md-block'
                        >
                            <div className='py-2'>
                                <h5 className={styles.About}>
                                    What is Word Share?
                                </h5>
                                <p>
                                    Word Share is a creative space where users
                                    share ideas, thoughts, and musings or offer
                                    encouragement and feedback.
                                    {'\n'}
                                    <strong>
                                        If you write it - you can share it.
                                    </strong>
                                </p>
                            </div>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default SignUpForm;
