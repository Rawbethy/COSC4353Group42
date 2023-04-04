import React, {useContext} from 'react';
import {UserContext} from '../App';
import './styles.css'

export default function Homepage() {
    const {loginStatus, username} = useContext(UserContext);

    
    if((loginStatus === 'true') || (loginStatus === true)) {
        return (
            <div className='body'>
                <div className='text-main-container'>
                    <h2 className='text-main'>Welcome back {username}!</h2>
                </div>
            </div>
        )
    }
    else {
        return (
            <div className='body'>
                <div className='text-main-container'>
                    <h2 className='text-main'>Welcome to Feul Depot!</h2>
                    <p className='input-label' style={{fontSize: '20px'}}>Providing a sustainable source of petroleum to your local <br />fueling business since 1400 B.C.</p>
                </div>
            </div>
        )
    }
}