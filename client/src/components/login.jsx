import React, {useState, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {UserContext} from '../App';
import './styles.css'

function Login() {

    const navigate = useNavigate();
    const {setUsername, setLoginStatus} = useContext(UserContext);
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
                console.log(credentials);
                setUsername(creds.username);
                setLoginStatus(true);
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
        <div className='body'>
            <form onSubmit={onSubmit}>
                <div className='form-styling'>
                    <h2 className='form-title'>Login:</h2>
                    <div> 
                        <div className="input-label">
                            <label>Username</label>    
                        </div>                       
                        <input type="text" className="text-box" id='text-box' name="username" value={creds.username} placeholder="Username" onChange={update}/>                      
                    </div>
                    <br />
                    <div>
                        <div className="input-label">
                            <label>Password</label>
                        </div>                   
                        <input type="password" className="text-box" id='text-box' name="password" value={creds.password} placeholder="Password" onChange={update}/>
                    </div>
                    <button type="submit" className="submit-button">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Login