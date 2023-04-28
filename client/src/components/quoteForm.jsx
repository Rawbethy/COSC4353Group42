import React, {useState, useEffect, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {UserContext} from '../App';

export function checkErrors(values) {
    let errors = {};

    for(const item in values) {
        switch(item) {
            case 'gallonsReq':
                 if(values[item] <= 0) {
                    errors.gallonsReq = 'Needs to be a valid/positive number of gallons'
                 }
                break;   
            case 'deliveryDate':
                let date = new Date(values[item])
                if(date < Date.now()) {
                    errors.deliveryDate = 'Delivery date cannot be in the past.'
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
        gallonsReq: 0,
        pricePerGallon: 0,
        total: 0
    });
    const [currGallonsReq, setCurrGallons] = useState(0);
    const [classValues, setClassValues] = useState({
        location: .04,
        history: 0,
        above: .03,
        companyProfit: .1
    })
    const [getButton, setGetButton] = useState(false);
    const [submitButton, setSubmitButton] = useState(false);
    const [errors, setErrors] = useState({});

    const updateField = (e) => {
        e.persist();
        setValues((values) => ({
            ...values,
            [e.target.name]: e.target.value
        }));
    }

    const getQuote = async(e) => {
        e.preventDefault();
        setCurrGallons(values.gallonsReq)

        let myerrors = checkErrors(values);
        if(Object.keys(myerrors).length > 0) {
            setErrors(myerrors);
            return;
        }
        await axios.post('http://localhost:5000/pricing', {values}).then(res => {
            setValues((values) => ({
                ...values,
                pricePerGallon: res.data.pricePerGallon,
                total: res.data.total
            }));
        }).catch(err => {
            alert(err)
        })
    }

    const submitQuoteForm = async(e) => {
        e.preventDefault();
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
        async function fetchData() {
            await axios.get('http://localhost:5000/profile', {params: {username: username}}).then((res) => {
                if(res.data.message === 'Profile not found') {
                    navigate('/profile')
                    alert('Need to update your profile before getting a quote')
                }
            })
        }
        fetchData();
        setValues(values);
        setClassValues(classValues);
        if(values['gallonsReq'] !== '' && values['deliveryDate'] !== '' && values['address'] !== '') {
            setGetButton(true)
            if(values['pricePerGallons'] !== 0 && values['total'] !== 0) {
                setSubmitButton(true)
            }
        }
        else {
            setGetButton(false)
            setSubmitButton(false)
        }
    }, [values, classValues])

    return (
        <div className="body">
            <form style={{
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
                        <label className='input-label'>Delivery Date:</label>                    
                        <input type="datetime-local" name='deliveryDate' onChange={updateField} required/>
                        {errors.deliveryDate && <span style={{"color": "red"}}>{errors.deliveryDate}</span>}
                    </div>
                    <br />
            
                    <label className='input-label'>Gallons Requested:</label>
                    <div className="gallonsReq">
                        <input type="number" name="gallonsReq" placeholder="ex. 1, 10.5" autoComplete="off" min="0" step="any" onChange={updateField} required style={{width: "100%"}}/>
                        {errors.gallonsReq && <span style={{"color": "red"}}>{errors.gallonsReq}</span>}
                    </div>
                    <hr style={{borderTop: '5px solid white'}}/>
                    
                    <div className="input-label">
                            <h4>Estimated Quote for {currGallonsReq ? currGallonsReq : 0} Gallon(s):</h4>
                    </div>
            
                    <div>
                        <div className='input-label'>
                            Suggested Price / Gallon:
                        </div>
                        <div className='input-label'>
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
                    <div>
                        <button style={{ marginTop: '20px' }}type="submit" className="btn btn-primary first-button" onClick={getQuote} disabled={!getButton}>Get Quote</button>
                        <button style={{ marginTop: '20px' }}type="submit" className="btn btn-primary last-button" onClick={submitQuoteForm} disabled={!submitButton}>Submit Quote</button>
                    </div>
            
                </div>
            </form>
        </div>
    )
}