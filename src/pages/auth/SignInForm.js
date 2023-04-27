import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import btnStyles from '../../styles/Button.module.css';
import styles from '../../styles/SignInUpForm.module.css';

import axios from 'axios';
import { Alert, Button, Card, Container, Form } from 'react-bootstrap';

const SignInForm = () => {
    const [signInData, setSignInData] = useState({
        username: '',
        password: '',
    });
    const { username, password } = signInData;

    const [errors, setErrors] = useState({});

    const history = useHistory();

    const handleChange = (event) => {
        setSignInData({
            ...signInData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('/dj-rest-auth/login/', signInData);
            history.push('/');
        } catch (err) {
            setErrors(err.response?.data);
        }
    };

    return (
        <Container className={styles.Container}>
            <Card className={`${styles.Card} my-auto p-md-2`}>
                <Card.Body className={`${styles.Body} p-xs-4`}>
                    <h1 className={styles.Title}>sign in</h1>
                    <Form
                        className={styles.Form}
                        onSubmit={handleSubmit}
                    >
                        <Form.Group controlId='username'>
                            <Form.Label className='float-left font-weight-bold'>
                                Email address
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
                        <Form.Group controlId='password'>
                            <Form.Label className='float-left font-weight-bold'>
                                Password
                            </Form.Label>
                            <Form.Control
                                type='password'
                                name='password'
                                value={password}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        {errors.password?.map((message, idx) => (
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
                            Sign in!
                        </Button>
                        {errors.non_field_errors?.map((message, idx) => (
                            <Alert
                                key={idx}
                                variant='warning'
                                className='mt-3'
                            >
                                {message}
                            </Alert>
                        ))}
                    </Form>
                    <Link
                        className={styles.Link}
                        to='/signup'
                    >
                        Don't have an account? <span>Sign up</span>
                    </Link>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default SignInForm;
