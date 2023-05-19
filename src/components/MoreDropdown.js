import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { useHistory } from 'react-router';
import styles from '../styles/MoreDropdown.module.css';

const CaretDown = React.forwardRef(({ onClick }, ref) => (
    <i
        className='fa-regular fa-square-caret-down'
        ref={ref}
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}
    />
));

export const MoreDropdown = ({ handleEdit, handleDelete }) => {
    return (
        <Dropdown
            className='ml-auto'
            drop='left'
        >
            <Dropdown.Toggle as={CaretDown} />

            <Dropdown.Menu
                className='text-center'
                popperConfig={{ strategy: 'fixed' }}
            >
                <Dropdown.Item
                    className={styles.DropdownItem}
                    onClick={handleEdit}
                    aria-label='edit'
                >
                    <i className='fas fa-edit' />
                </Dropdown.Item>
                <Dropdown.Item
                    className={styles.DropdownItem}
                    onClick={handleDelete}
                    aria-label='delete'
                >
                    <i className='fas fa-trash-alt' />
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export const ProfileEditDropdown = ({ id }) => {
    const history = useHistory();
    return (
        <Dropdown
            className={`ml-auto px-3 ${styles.Absolute}`}
            drop='left'
        >
            <Dropdown.Toggle as={CaretDown} />
            <Dropdown.Menu>
                <Dropdown.Item
                    onClick={() => history.push(`/profiles/${id}/edit`)}
                    aria-label='edit-profile'
                >
                    <i className='fas fa-edit pr-1' />
                    edit profile and image
                </Dropdown.Item>
                <Dropdown.Item
                    onClick={() =>
                        history.push(`/profiles/${id}/edit/username`)
                    }
                    aria-label='edit-username'
                >
                    <i class='fa-regular fa-address-card pr-1'></i>
                    change username
                </Dropdown.Item>
                <Dropdown.Item
                    onClick={() =>
                        history.push(`/profiles/${id}/edit/password`)
                    }
                    aria-label='edit-password'
                >
                    <i className='fas fa-key pr-1' />
                    change password
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};
