import React, {useState, useEffect, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {UserContext} from '../App';

export function toNumeric(values, setValues) {
    let errors = {};

    for(const item in values) {
        switch(item) {
            case 'gallonsReq':
                let num = Number(values[item]);
                setValues((values) => ({
                    ...values,
                    gallonsReq: num
                 }));
                 if(values[item] < 0) {
                    errors.gallonReq = 'Needs to be a numeric amount of gallons'
                 }
                break;   
            default:
                break;
        }
    }
    return errors;
}

export default function QuoteForm() {

    const navigate = useNavigate();
    const {username} = useContext(UserContext);
    const [values, setValues] = useState({
        username: username,
        address: '',
        deliveryDate: '',
        gallonsReq: '',
        pricePerGallon: 0,
        total: 0
    });
    const [errors, setErrors] = useState({});

    const updateField = (e) => {
        e.persist();
        setValues((values) => ({
            ...values,
            [e.target.name]: e.target.value
        }));
    }

    const submitQuoteForm = async(e) => {
        e.preventDefault();
        setErrors(toNumeric(values, setValues));
        await axios.post('http://localhost:5000/quotes', {values})
        .then((res) => {
            alert(res.data.message);
            navigate('/');
        })
        .catch(err => {
            console.log(err);
        });
    }

    useEffect(() => {
        setValues(values);
    }, [values])

    return (
        <div className="body">
            <form onSubmit={submitQuoteForm} style={{
                height: "300px",
                width: "600px",
                margin: "auto" }}>
                <div className="form-styling">
                    <h2 className='form-title'>Fuel Quote Form:</h2>
                    <div> 
                        <label className='input-label'>Delivery Address:</label>                       
                        <input type="text" name="address" placeholder="Enter Address" autoComplete="off" onChange={updateField} style={{ width: "100%" }}/>  
                        {errors.address && <span style={{"color": "red"}}>{errors.address}</span>}                    
                    </div>
                    <br />
            
                    <div className="deliverydate"> 
                        <label className='input-label'>Devliery Date:</label>                    
                        <input type="date" name='deliveryDate' onChange={updateField} required/>
                    </div>
                    <br />
            
                    <label className='input-label'>Gallons Requested:</label>
                    <div className="gallonsReq">
                        <input type="number" name="gallonsReq" placeholder="ex. 1, 10.5" autoComplete="off" min="0" step="any" onChange={updateField} required style={{width: "100%"}}/>
                        {errors.gallonsReq && <span style={{"color": "red"}}>{errors.gallonsReq}</span>}
                    </div>
                    <hr style={{borderTop: '5px solid white'}}/>
            
                    <div>
                        <div className="input-label">
                            Suggested Price / Gallon:
                        </div>
                        <div className="input-label">
                            {values.pricePerGallon}
                        </div>
                    </div>
            
                    <div>
                        <div className="input-label">
                            Total Amount Due:
                        </div>
                        <div className="input-label">
                            {values.total}
                        </div>
                    </div>
            
                    <button style={{ marginTop: '20px' }}type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    )
}