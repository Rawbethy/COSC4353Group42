import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

export default function Register() {

    const initialState = {
        email: '',
        username: '',
        password: '',
        confirm: ''
    }

    const navigate = useNavigate();
    const [values, setValues] = useState(initialState);
    const [error, setError] = useState('')

    const updateField = (e) => {
        e.persist();
        setValues((values) => ({
            ...values,
            [e.target.name]: e.target.value
        }));
    }

    const onSubmit = e => {
        e.preventDefault()
        if(values.password !== values.confirm) {
            setError('Password does not match!')
            setValues({
                confirm: ''
            })
        }
        else {
            const newUser = {
                email: values.email,
                username: values.username,
                password: values.password
            }
            axios.post("http://localhost:5000/register", {newUser}).then((res) => {
                if(res.data.message === 'Registration Complete!') {
                    navigate('/login')
                }
                else {
                    alert(res.data.message);
                }
            }).catch((err) => {
                let errMsg = JSON.stringify(err.response.data)
                alert(errMsg || err);
            })
        }
    }

    return (
        <div className="body">
            <form onSubmit={onSubmit} style={{
                height: 'auto',
                width: 'auto',
                margin: 'auto'
            }}>
                <div className='form-styling'>
                    <h2 className='form-title'>Register</h2>
                    <div>  
                        <div className='input-label'>
                            <label>Email</label>    
                        </div>                      
                        <input type="text" className='text-box' id='text-box' name='email' placeholder="Enter Email" value={values.email} onChange={updateField} autoComplete="off" style={{
                            width: "100%"
                        }}/>                      
                    </div>
                    <br />
                    <div>
                        <div className="input-label">
                            <label>Username</label>    
                        </div>               
                        <input type="text" className='text-box' id='text-box' name='username' placeholder="Enter Username" value={values.username} onChange={updateField} autoComplete="off" style={{
                            width: "100%"
                        }}/>
                    </div>
                    <br />
                    <div>
                        <div className="input-label">
                            <label>Password</label>
                        </div>
                        <input type="password" className='text-box' id='text-box' name='password' placeholder="Enter Password" value={values.password} onChange={updateField} autoComplete="off" style={{width: "100%"}}/>
                    </div>
                    <br />
                    <div>
                        <div className="input-label">
                            <label>Confirm Password</label>
                        </div>
                        <input type="password" className='text-box' id='text-box' name='confirm' placeholder='Confirm Password' value={values.confirm} onChange={updateField} autoComplete='off' style={{width: '100%'}}/>
                        {error && <span style={{'color': 'red'}}>{error}</span>}
                    </div>
                    <button type="submit" className='submit-button'>Submit</button>
                </div>
            </form>
        </div>

    )
}