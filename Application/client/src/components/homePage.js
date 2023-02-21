import React from 'react'

export default function Homepage() {
    console.log(localStorage.getItem('loginStatus'))
    if(localStorage.getItem('loginStatus') === 'true') {
        return (
            <div>
                <h2>Welcome back {localStorage.getItem('username')}!</h2>
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