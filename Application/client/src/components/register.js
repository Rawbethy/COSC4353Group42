import React, {useState} from 'react';
import axios from 'axios';

export default function Register() {

    const initialState = {
        email: '',
        username: '',
        password: ''
    }

    const[email, setEmail] = useState('');
    const[username, setUsername] = useState('');
    const[password, setPassword] = useState('');

    const onSubmit = e => {
        e.preventDefault()
        const newUser = {
            email: email,
            username: username,
            password: password
        }

        axios.post("http://localhost:5000/register", {newUser}).then((res) => {
            alert(res.data.message)
        }).catch((err) => {
            alert("Error")
        })
        setEmail(initialState.email);
        setUsername(initialState.username);
        setPassword(initialState.password);
    }

    const onChangeEmail = e => {
        setEmail(e.target.value)
    }

    const onChangeUsername = e => {
        setUsername(e.target.value)
    }

    const onChangePassword = e => {
        setPassword(e.target.value)
    }

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
                <h2>Register:</h2>
                <div className="email"> 
                    <label>Email:</label>                       
                    <input type="text" placeholder="Enter Email" value={email} onChange={onChangeEmail} autoComplete="off" style={{
                        width: "100%"
                    }}/>                      
                </div>
                <br />
                <div className="username"> 
                    <label>Username:</label>                    
                    <input type="text" placeholder="Enter Username" value={username} onChange={onChangeUsername} autoComplete="off" style={{
                        width: "100%"
                    }}/>
                </div>
                <br />
                <label>Password:</label>
                <div className="password">
                    <input type="password" placeholder="Enter Password" value={password} onChange={onChangePassword} autoComplete="off" style={{
                        width: "100%"
                    }}/>
                </div>
                <div className="submit" style={{
                    position: "relative"
                }}>
                    <button type="submit" onClick={onSubmit} style={{
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