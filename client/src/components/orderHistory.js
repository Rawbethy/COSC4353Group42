import React, { useState, useEffect, useContext} from 'react';
import {UserContext} from '../App';
import axios from 'axios';

export default function OrderHistory() {

  const [orders, setOrders] = useState([]);
  const {username} = useContext(UserContext);

  useEffect(() => {
    async function fetchData() {
      await axios.get('http://localhost:5000/quotes', {params: {username: username}}).then((res) => {
        if(res.data.noQuotes !== true) {
          setOrders(res.data);
        }
      }).catch(err => {
        console.error(err);
      })
    }
    fetchData();
  }, []);

  return (
    <table class="table table-responsive" style={{border:1}} >
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Delivery Date</th>
          <th>Gallons Requested</th>
          <th>Price/gallon</th>
          <th>Total Price</th>
        </tr>
      </thead>
      <tbody style={{borderBottom: "1px solid #ddd"}}>
        {orders.sort(function(a, b){return new Date(a.deliveryDate) - new Date(b.deliveryDate)}).map((quote, index) => {
          return (
            <tr>
              <td>{index}</td>
              <td>{quote.deliveryDate.substring(0,10)}</td>
              <td>{quote.gallonsReq}</td>
              <td>{quote.pricePerGallon}</td>
              <td>{quote.total}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  );
}