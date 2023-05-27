import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import styles from '../styles/Asset.module.css';

const Asset = ({ spinner, src, message, height }) => {
    return (
        <div className={styles.Asset}>
            {spinner && <Spinner animation='border' />}
            {src && (
                <img
                    src={src}
                    alt={message}
                    style={{ height: height }}
                />
            )}
            {message && <p className='mt-4'>{message}</p>}
        </div>
    );
};

export default Asset;
