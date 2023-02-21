import React from 'react';
import {useNavigate} from 'react-router-dom';

export default function Logout() {
    const navigate = useNavigate();
    localStorage.removeItem('username');
    localStorage.removeItem('loginStatus');
    navigate('/');
    return (
        <h2>You have kind of been logged out lol</h2>
    )
}