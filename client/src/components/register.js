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
        <div className="body">
            <form onSubmit={onSubmit} style={{
                height: 'auto',
                width: 'auto',
                margin: 'auto'
            }}>
                <div className="container" style={{
                    position: "aboslute",
                    height: "auto",
                    width: "500px",
                    textAlign: "left"
                }}>
                    <h2 className='form-title'>Register</h2>
                    <div>  
                        <div className='input-label'>
                            <label>Email</label>    
                        </div>                      
                        <input type="text" className='text-box' id='text-box' placeholder="Enter Email" value={email} onChange={onChangeEmail} autoComplete="off" style={{
                            width: "100%"
                        }}/>                      
                    </div>
                    <br />
                    <div>
                        <div className="input-label">
                            <label>Username</label>    
                        </div>               
                        <input type="text" className='text-box' id='text-box' placeholder="Enter Username" value={username} onChange={onChangeUsername} autoComplete="off" style={{
                            width: "100%"
                        }}/>
                    </div>
                    <br />
                    <div>
                        <div className="input-label">
                            <label>Password</label>
                        </div>
                        <input type="password" className='text-box' id='text-box' placeholder="Enter Password" value={password} onChange={onChangePassword} autoComplete="off" style={{
                            width: "100%"
                        }}/>
                    </div>
                    <button type="submit" className='submit-button'>Submit</button>
                </div>
            </form>
        </div>

    )
}