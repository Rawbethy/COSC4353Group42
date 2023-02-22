import React, {useContext} from 'react';
import {UserContext} from '../App';

export default function Homepage() {
    const {loginStatus, username} = useContext(UserContext);
    if((loginStatus === 'true') || (loginStatus === true)) {
        return (
            <div>
                <h2>Welcome back {username}!</h2>
            </div>
        )
    }
    else {
        return (
            <div>
                <h2>This is the Home Page component!</h2>
            </div>
        )
    }
}