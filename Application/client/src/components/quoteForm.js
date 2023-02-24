import React, {useState, useEffect, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {UserContext} from '../App';

export function toNumeric(values) {
    let errors = {};
    for(const item in values) {
        switch(item) {
            case 'gallonsreq':
                // let num = toNum(gallonsreq);
                // setValue((values) => {
                //     ...values,
                //     // values[gallonsreq] = num
                // })
                errors.gallonreq = 'the fuck'
                break;
            case 'pricepergallon':
                
                break;
            case 'total':
                
                break;    
            default:
                break;
        }
    }
    return errors;
}


export default function QuoteForm() {

    let errors = {};
    const navigate = useNavigate();
    const {username} = useContext(UserContext);
    const [values, setValues] = useState({
        address: '',
        gallonsreq: '',
        pricepergallon: '',
        total: ''
    });

    const updateField = (e) => {
        e.persist();
        setValues((values) => ({
            ...values,
            [e.target.name]: e.target.value
        }));
    }

    const submitQuoteForm = (e) => {
        e.preventDefault();
        values.username = username;
        errors = toNumeric(values, setValues);
        if(JSON.stringify(errors) === '{}') {
            console.log('No Errors!')
        }
        else {
            console.log(errors);
        }
        axios.post('http://localhost:5000/profile', {values})
        .then((res) => {
            console.log(res);
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
                </div>
                <br />
        
                <div className="deliverydate"> 
                    <label>Devliery Date:</label>                    
                    <input type="date"/>
                </div>
                <br />
        
                <label>Gallons Requested:</label>
                <div className="gallonsreq">
                <input type="number" name="gallonsreq" placeholder="ex. 1, 10.5" autoComplete="off" min="0" step="any" onChange={updateField} required style={{width: "100%"}}/>
                </div>
                <br />
        
                <label>Suggested Price / Gallon:</label>
                <div className="pricepergallon">
                <input type="readonly" name="pricepergallon"placeholder="Price per Gallon" autoComplete="off" onChange={updateField} style={{width: "100%"}}/>
                </div>
                <br />
        
                <label>Total Amount Due</label>
                <div className="total">
                <input type="readonly" name="total" placeholder="Total" autoComplete="off" onChange={updateField} style={{ width: "100%" }}/>
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
