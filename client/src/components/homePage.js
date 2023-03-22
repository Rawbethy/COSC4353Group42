import React, {useContext} from 'react';
import {UserContext} from '../App';

export default function Homepage() {
    const {loginStatus, username} = useContext(UserContext);
    
    if((loginStatus === 'true') || (loginStatus === true)) {
        return (
            <div style={{position: 'absolute', top: '4%', right: '0px', bottom: '0px', left: '0px', backgroundColor: 'black'}}>
                <div className="text" style={{position: 'absolute', top: '5%', left: '3%'}}>
                    <h2 style={{fontSize: '50px', color: 'white'}}>Welcome back {username}!</h2>
                </div>
            </div>
        )
    }
    else {
        return (
            <div style={{position: 'absolute', top: '4%', right: '0px', bottom: '0px', left: '0px', backgroundColor: 'black'}}>
                <div className="text" style={{position: 'absolute', top: '5%', left: '3%'}}>
                    <h2 style={{fontSize: '50px', color: 'white'}}>This is the home page component!</h2>
                </div>
            </div>
        )
    }
}