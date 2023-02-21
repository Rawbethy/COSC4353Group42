import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

function Login() {

    const navigate = useNavigate();
    const initialState = {
        username: '',
        password: ''
    }
    const[creds, setCreds] = useState({
        initialState
    })

    const update = e => {
        setCreds({
            ...creds, [e.target.name]: e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault()
        const credentials = {
            username: creds.username,
            password: creds.password
        }

        axios.post('http://localhost:5000/login', {credentials}).then((res) => {
            if(res.data.result === true) {
                localStorage.setItem('loginStatus', res.data.result)
                localStorage.setItem('username', creds.username)
                navigate('/');
            }
            else {
                alert("Incorrect Username/Password, please try again!")
            }
        }).catch((err) => {
            alert('Error: ' + err)
        })
        setCreds(initialState);
    };
    
    return (
        <form onSubmit={onSubmit} style={{
            height: "300px",
            width: "600px",
            margin: "auto"
        }}>
            <div className="container" style={{
                position: "relative",
                height: "200px",
                width: "500px",
                textAlign: "left"
            }}>
                <h2>Login:</h2>
                <div className="username">                        
                    <input type="text" name="username" value={creds.username} placeholder="Username" onChange={update} style={{
                        width: "100%"
                    }}/>                      
                </div>
                <br />
                <div className="password">                      
                    <input type="password" name="password" value={creds.password} placeholder="Password" onChange={update} style={{
                        width: "100%"
                    }}/>
                </div>
                <div className="submit" style={{
                    position: "relative"
                }}>
                    <button type="submit" style={{
                        marginTop: "30px",
                        float: "right",
                        display: "inline-block",
                        width: "100%"
                    }}>Submit</button>
                </div>
            </div>
        </form>
    )
}

export default Login