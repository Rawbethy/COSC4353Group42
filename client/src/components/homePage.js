import React, {useContext} from 'react';
import {UserContext} from '../App';
import './styles.css'

export default function Homepage() {
    const {loginStatus, username} = useContext(UserContext);

    
    if((loginStatus === 'true') || (loginStatus === true)) {
        return (
            <div className='body'>
                <div className="text" style={{position: 'absolute', top: '5%', left: '3%'}}>
                    <h2 className='text-main'>Welcome back {username}!</h2>
                </div>
            </div>
        )
    }
    else {
        return (
            <div className='body'>
                <div className="text" style={{position: 'absolute', top: '5%', left: '3%'}}>
                    <h2 className='text-main'>This is the home page component!</h2>
                </div>
            </div>
        )
    }
}