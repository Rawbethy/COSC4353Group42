import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

function Login(props) {

    const navigate = useNavigate();
    const[username, setUsername] = useState('');
    const[password, setPassword] = useState('');

    const initialState = {
        username: '',
        password: ''
    }

    const onChangeUsername = e => {
        setUsername(e.target.value)
    };

    const onChangePassword = e => {
        setPassword(e.target.value)
    };

    const onSubmit = e => {
        e.preventDefault()
        const credentials = {
            username: username,
            password: password
        }

        axios.post('http://localhost:5000/login', {credentials}).then((res) => {
            if(res.data.result === true) {
                props.setLogin(res.data.result)
                navigate('/');
            }
            else {
                alert("Incorrect Username/Password, please try again!")
            }
        }).catch((err) => {
            alert('Error: ' + err)
        })
        setUsername(initialState.username)
        setPassword(initialState.password)
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
                    <input type="text" value={username} placeholder="Username" onChange={onChangeUsername} style={{
                        width: "100%"
                    }}/>                      
                </div>
                <br />
                <div className="password">                      
                    <input type="password" value={password} placeholder="Password" onChange={onChangePassword} style={{
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