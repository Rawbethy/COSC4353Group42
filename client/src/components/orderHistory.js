import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:3000/orders');
        setOrders(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchOrders();
  }, []);

  return (
    <table class="table table-responsive" style={{border:1}} >
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Date</th>
          <th>Gallons Requested</th>
          <th>Delivery Date</th>
          <th>Price/gallon</th>
          <th>Total Price</th>
        </tr>
      </thead>
      <tbody style={{borderBottom: "1px solid #ddd"}}>
            <td>1</td>
            <td>11/28/2000</td>
            <td>12,000</td>
            <td>12/20/2000</td>
            <td>.99</td>
            <td>11,880</td>
      </tbody>
      <tbody style={{borderBottom: "1px solid #ddd"}}>
            <td>2</td>
            <td>11/29/200</td>
            <td>13,000</td>
            <td>12/20/2000</td>
            <td>.89</td>
            <td>11,570</td>            
      </tbody>
    </table>
  );
}