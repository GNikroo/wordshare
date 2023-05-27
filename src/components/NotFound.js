import React from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import NoResults from '../assets/not-found.png';
import styles from '../styles/NotFound.module.css';
import Asset from './Asset';

const NotFound = () => {
    return (
        <Container className='mt-5 d-flex'>
            <Card className={`${styles.NoResultsContainer} pt-3`}>
                <Link to='/'>
                    <Card.Body className={`${styles.NoResults}`}>
                        <Asset
                            src={NoResults}
                            message={`Looks like you're lost!\nClick here to go home.`}
                        />
                    </Card.Body>
                </Link>
            </Card>
        </Container>
    );
};

export default NotFound;
