import React, {useState, useEffect, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {UserContext} from '../App';
import { isAccordionItemSelected } from 'react-bootstrap/esm/AccordionContext';
const states = require('../Utils/states')

export function Validate(values) {
    let errors = {};

    for(const item in values) {
        switch(item) {
            case 'fullName':
                if(values[item].length >= 50) {
                    errors.fullName = 'Name should not exceed 50 characters';
                }
                break;
            case 'address1':
                if(values[item].length >= 100) {
                    errors.address1 = 'Address 1 should not exceed 100 characters';
                }
                break;
            case 'city':
                if(values[item].length >= 100) {
                    errors.city = 'City should not exceed 100 characters';
                }
                break;
            case 'zip':
                let len = values[item].length;
                if(len < 5) {
                    errors.zip = 'Zip should consist of at least 5 characters';
                }
                else if(len > 9) {
                    errors.zip = 'Zip should not exceed 9 characters';
                }
                break;
            case 'phone':
                let strippedPhone = values[item].replace(/[^\d.-]/g, '');
                if(strippedPhone.length !== 10) {
                    errors.phone = 'Invalid phone number';
                }
                break;
            case 'email':
                if(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values[item]) === false) {
                    errors.email = 'Email format is not valid';
                } 
                break;     
            default:
                break;
        }
    }
    return errors;
};

export default function Profile() {

    const navigate = useNavigate();
    const {username} = useContext(UserContext);
    const [errors, setErrors] = useState({});
    const initialState = {
        username: username,
        fullName: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        zip: '',
        phone: '',
        email: ''
    }
    const [values, setValues] = useState(initialState);

    const updateField = (e) => {
        e.persist();
        setValues((values) => ({
            ...values,
            [e.target.name]: e.target.value
        }));
        setErrors(Validate(values));
    }

    const submitForm = (e) => {
        e.preventDefault();
        if(JSON.stringify(errors) === '{}') {
            axios.post('http://localhost:5000/profile', {values})
            .then((res) => {
                alert(res.data.message);
            })
            .catch(err => {
                console.log(err);
            });
        }
    }

    useEffect(() => {
        if(values === initialState) {
            axios.get('http://localhost:5000/profile', {params: {
                'username': username}
            }).then((res) => {
                if(!res.data) {
                    setValues(values);
                }
                else {
                    setValues(res.data);
                }
            })
            .catch((err) => {
                console.log(err)
            });
        }
        setErrors(Validate(values));
        setValues(values);
    }, [values])
    
    return (
        <div className="body">
            <form className='form' onSubmit={submitForm} style={{
                height: 'auto',
                width: 'auto',
                margin: 'auto'
            }}>
                <div className="form-styling">
                    <h2 className='form-title'>Edit Profile:</h2>
                    <div>        
                        <label className='input-label'>Full Name</label>
                        <input type="text" className='text-box' id='text-box' name="fullName" placeholder="John Doe" value={values.fullName} onChange={updateField} required/>
                        {errors.fullName && <span style={{"color": "red"}}>{errors.fullName}</span>}
                    </div>

                    <div>        
                        <label className='input-label'>Username</label>
                        <input type="text" className='text-box text-disabled' id='text-box' name="username" placeholder={username} value={values.username} onChange={updateField} disabled />
                    </div>

                    <div>
                        <label className='input-label'>Address 1</label>
                        <input type="text" className='text-box' name="address1" placeholder="1234 Main St" value={values.address1} onChange={updateField} required/>
                        {errors.address1 && <span style={{"color": "red"}}>{errors.address1}</span>}
                    </div>

                    <div>
                        <label className='input-label'>Address 2</label>
                        <input type="text" className='text-box-50 text-box' name="address2" placeholder="Apartment, studio, or floor" value={values.address2} onChange={updateField} />
                    </div>

                    <div className="form-row">

                        <div>
                            <label className='input-label'>City</label>
                            <input type="text" className='text-box-50 text-box' name="city" value={values.city} onChange={updateField} required/>
                            {errors.city && <span style={{"color": "red"}}>{errors.city}</span>}
                        </div>

                        <div>
                            <label className='input-label'>State</label>
                            <select id="inputState" className='text-box-35 text-box' name="state" value={values.state} onChange={updateField}>
                                    {
                                        Object.entries(states).map(([key,value]) => {
                                            return <option key={key} value={key}>{value}</option>
                                        })
                                    }
                            </select>
                        </div>

                        <div >    
                            <label className='input-label'>Zip</label>
                            <input type="text" className='text-box-25 text-box' name="zip" value={values.zip} onChange={updateField} required/>
                            {errors.zip && <div style={{"color": "red"}}>{errors.zip}</div>}
                        </div>
                    </div>

                    <div>
                        <label className='input-label'>Phone</label>
                        <input type="text" className='text-box-50 text-box' name="phone" value={values.phone} onChange={updateField} required/>
                        {errors.phone && <span style={{"color": "red"}}>{errors.phone}</span>}
                    </div>

                    <div>
                        <label className='input-label'>Email</label>
                        <input type="text" className='text-box' name="email" value={values.email} onChange={updateField} required/>
                        {errors.email && <div style={{"color": "red"}}>{errors.email}</div>}
                    </div>

                    <button style={{ marginTop: '20px' }}type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    );
}