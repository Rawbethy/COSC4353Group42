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
        deliveryDate: new Date(),
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
        <form onSubmit={submitQuoteForm} style={{
            height: "300px",
            width: "600px",
            margin: "auto" }}>
            <div className="container" style={{
                position: "relative",
                height: "200px",
                width: "500px",
                textAlign: "left" }}>
        
            <h2>Fuel Quote Form:</h2>
                <div className="address"> 
                    <label>Delivery Address:</label>                       
                    <input type="text" name="address" placeholder="Enter Address" autoComplete="off" onChange={updateField} style={{ width: "100%" }}/>  
                    {errors.address && <span style={{"color": "red"}}>{errors.address}</span>}                    
                </div>
                <br />
        
                <div className="deliverydate"> 
                    <label>Devliery Date:</label>                    
                    <input type="date"/>
                </div>
                <br />
        
                <label>Gallons Requested:</label>
                <div className="gallonsReq">
                    <input type="number" name="gallonsReq" placeholder="ex. 1, 10.5" autoComplete="off" min="0" step="any" onChange={updateField} required style={{width: "100%"}}/>
                    {errors.gallonsReq && <span style={{"color": "red"}}>{errors.gallonsReq}</span>}
                </div>
                <hr style={{borderTop: '5px solid black'}}/>
        
                <div className="pricePerGallon">
                    <div className="label">
                        Suggested Price / Gallon:
                    </div>
                    <div className="value">
                        {values.pricePerGallon}
                    </div>
                </div>
        
                <div className="total">
                    <div className="label">
                        Total Amount Due:
                    </div>
                    <div className="value">
                        {values.total}
                    </div>
                </div>
        
                <div className="submit" style={{position: "relative"}}>
                <button type="submit"  
                style={{
                    marginTop: "30px",
                    float: "right",
                    display: "inline-block",
                    width: "100%"}}>Submit Request</button>
                </div>
            </div>
        </form>
    )
}