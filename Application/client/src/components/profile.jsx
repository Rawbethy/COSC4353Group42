import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

export default function Profile() {

    const navigate = useNavigate();
    const [profileData, setProfileData] = useState({ 
        fullname: '', 
        username: localStorage.getItem('username') || 'invalidUser', 
        address1: '', 
        address2: '', 
        city: '', 
        state: 'TX', 
        zip: '', 
        phone: '', 
        email: '' 
    });

    const updateField = (e) => {
        setProfileData({
            ...profileData,
            [e.target.name]: e.target.value
        });
    }

    const submitForm = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/profile', {profileData})
        .then((res) => {
            console.log(res);
            navigate('/');
        })
        .catch(err => {
            console.log(err);
        });
    }
    
    return (
        <div className="container">
        <h1>Edit Profile</h1>
        <hr/>
        <form onSubmit={submitForm}>
        <div className="form-row">
            <div className="form-group col-md-6">        
                <label>Full Name</label>
                <input type="text" className="form-control" name="fullname" placeholder="John Doe" value={profileData.fullname} onChange={updateField} />
            </div>
            <div className="form-group col-md-6">        
                <label>Username</label>
                <input type="text" className="form-control" name="username" placeholder={profileData.username} value={profileData.username} onChange={updateField} disabled />
            </div>
            <div className="form-group col-md-6">
                <label>Address 1</label>
                <input type="text" className="form-control" name="address1" placeholder="1234 Main St" value={profileData.address1} onChange={updateField} />
            </div>
            <div className="form-group">
                <label>Address 2</label>
                <input type="text" className="form-control" name="address2" placeholder="Apartment, studio, or floor" value={profileData.address2} onChange={updateField} />
            </div>
            <div className="form-row">
                <div className="form-group col-md-6">
                    <label>City</label>
                    <input type="text" className="form-control" name="city" value={profileData.city} onChange={updateField} />
                </div>
                <div className="form-group col-md-4">
                    <label>State</label>
                    <select id="inputState" className="form-control" name="state" value={profileData.state} onChange={updateField}>
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
                <div className="form-group col-md-2">    
                    <label>Zip</label>
                    <input type="text" className="form-control" name="zip" value={profileData.zip} onChange={updateField} />
                </div>
            </div>
            <div className="form-group">
                <label>Phone</label>
                <input type="text" className="form-control" name="phone" value={profileData.phone} onChange={updateField} />
            </div>
            <div className="form-group">
                <label>Email</label>
                <input type="text" className="form-control" name="email" value={profileData.email} onChange={updateField} />
            </div>
            <button style={{ marginTop: '5px' }}type="submit" className="btn btn-primary">Submit</button>
        </div>
        </form>
        </div>
    );
}