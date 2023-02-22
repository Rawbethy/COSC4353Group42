import React, {useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import {UserContext} from '../App';

export default function Logout() {
    const navigate = useNavigate();
    const {setUsername, setLoginStatus} = useContext(UserContext);
    setUsername('');
    setLoginStatus(false)
    navigate('/');
    return (
        <h2>You have kind of been logged out lol</h2>
    )
}