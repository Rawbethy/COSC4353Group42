import React, {useState, useEffect, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {UserContext} from '../App';

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
    const [values, setValues] = useState({
        username: username,
        fullName: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        zip: '',
        phone: '',
        email: ''
    });
    const [errors, setErrors] = useState({});

    const updateField = (e) => {
        e.persist();
        setValues((values) => ({
            ...values,
            [e.target.name]: e.target.value
        }));
    }

    const submitForm = (e) => {
        e.preventDefault();
        setErrors(Validate(values));
        axios.post('http://localhost:5000/profile', {values})
        .then((res) => {
            navigate('/');
            alert(res.data.message);
        })
        .catch(err => {
            console.log(err);
        });
    }

    useEffect(() => {
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
    }, [])
    
    return (
        <div className="container">
        <h1>Edit Profile</h1>
        <hr/>
        <form onSubmit={submitForm}>
        <div className="form-row">
            <div className="form-group col-md-6">        
                <label>Full Name</label>
                <input type="text" className="form-control" name="fullName" placeholder="John Doe" value={values.fullName} onChange={updateField} required/>
                {errors.fullName && <span style={{"color": "red"}}>{errors.fullName}</span>}
            </div>
            <div className="form-group col-md-6">        
                <label>Username</label>
                <input type="text" className="form-control" name="username" placeholder={username} value={values.username} onChange={updateField} disabled />
            </div>
            <div className="form-group col-md-6">
                <label>Address 1</label>
                <input type="text" className="form-control" name="address1" placeholder="1234 Main St" value={values.address1} onChange={updateField} required/>
                {errors.address1 && <span style={{"color": "red"}}>{errors.address1}</span>}
            </div>
            <div className="form-group col-md-6">
                <label>Address 2</label>
                <input type="text" className="form-control" name="address2" placeholder="Apartment, studio, or floor" value={values.address2} onChange={updateField} />
            </div>
            <div className="form-row">
                <div className="form-group col-md-6">
                    <label>City</label>
                    <input type="text" className="form-control" name="city" value={values.city} onChange={updateField} required/>
                    {errors.city && <span style={{"color": "red"}}>{errors.city}</span>}
                </div>
                <div className="form-group col-md-4">
                    <label>State</label>
                    <select id="inputState" className="form-control" name="state" value={values.state} onChange={updateField}>
                        <option value="AL">Alabama</option>
                        <option value="AK">Alaska</option>
                        <option value="AZ">Arizona</option>
                        <option value="AR">Arkansas</option>
                        <option value="CA">California</option>
                        <option value="CO">Colorado</option>
                        <option value="CT">Connecticut</option>
                        <option value="DE">Delaware</option>
                        <option value="DC">District Of Columbia</option>
                        <option value="FL">Florida</option>
                        <option value="GA">Georgia</option>
                        <option value="HI">Hawaii</option>
                        <option value="ID">Idaho</option>
                        <option value="IL">Illinois</option>
                        <option value="IN">Indiana</option>
                        <option value="IA">Iowa</option>
                        <option value="KS">Kansas</option>
                        <option value="KY">Kentucky</option>
                        <option value="LA">Louisiana</option>
                        <option value="ME">Maine</option>
                        <option value="MD">Maryland</option>
                        <option value="MA">Massachusetts</option>
                        <option value="MI">Michigan</option>
                        <option value="MN">Minnesota</option>
                        <option value="MS">Mississippi</option>
                        <option value="MO">Missouri</option>
                        <option value="MT">Montana</option>
                        <option value="NE">Nebraska</option>
                        <option value="NV">Nevada</option>
                        <option value="NH">New Hampshire</option>
                        <option value="NJ">New Jersey</option>
                        <option value="NM">New Mexico</option>
                        <option value="NY">New York</option>
                        <option value="NC">North Carolina</option>
                        <option value="ND">North Dakota</option>
                        <option value="OH">Ohio</option>
                        <option value="OK">Oklahoma</option>
                        <option value="OR">Oregon</option>
                        <option value="PA">Pennsylvania</option>
                        <option value="RI">Rhode Island</option>
                        <option value="SC">South Carolina</option>
                        <option value="SD">South Dakota</option>
                        <option value="TN">Tennessee</option>
                        <option value="TX">Texas</option>
                        <option value="UT">Utah</option>
                        <option value="VT">Vermont</option>
                        <option value="VA">Virginia</option>
                        <option value="WA">Washington</option>
                        <option value="WV">West Virginia</option>
                        <option value="WI">Wisconsin</option>
                        <option value="WY">Wyoming</option>
                    </select>
                </div>
                <div className="form-group col-md-4">    
                    <label>Zip</label>
                    <input type="text" className="form-control" name="zip" value={values.zip} onChange={updateField} required/>
                    {errors.zip && <div style={{"color": "red"}}>{errors.zip}</div>}
                </div>
            </div>
            <div className="form-group col-md-4">
                <label>Phone</label>
                <input type="text" className="form-control" name="phone" value={values.phone} onChange={updateField} required/>
                {errors.phone && <span style={{"color": "red"}}>{errors.phone}</span>}
            </div>
            <div className="form-group col-md-7">
                <label>Email</label>
                <input type="text" className="form-control" name="email" value={values.email} onChange={updateField} required/>
                {errors.email && <div style={{"color": "red"}}>{errors.email}</div>}
            </div>
            <button style={{ marginTop: '5px' }}type="submit" className="btn btn-primary">Submit</button>
        </div>
        </form>
        </div>
    );
}