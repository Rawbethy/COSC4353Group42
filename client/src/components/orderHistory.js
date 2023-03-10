import React, { useState, useEffect, useContext} from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import {DropdownSubmenu} from 'react-bootstrap-submenu';
import {UserContext} from '../App';
import axios from 'axios';

export default function OrderHistory() {

  const [orders, setOrders] = useState([]);
  const [sort, setSort] = useState({
    key: 'Date',
    direction: 'Desc'
  });
  const {username} = useContext(UserContext);

  const sortKey = (key) => {
    let direction = 'Asc';
    if(sort.key === key && sort.direction === 'Asc') {
      direction = 'Desc'
    }
    setSort({key, direction})
  }

  const changeSort = () => {
    return (
      function(a,b) {
        
        if(sort.key === 'Date' && sort.direction === 'Desc') {
          return new Date(a.deliveryDate) - new Date(b.deliveryDate);
        }
        else if(sort.key === 'Date' && sort.direction === 'Asc') {
          return new Date(b.deliveryDate) - new Date(a.deliveryDate);
        }
        else if(sort.key === 'Gallons' && sort.direction === 'Desc') {
          return a.gallonsReq - b.gallonsReq;
        }
        else if(sort.key === 'Gallons' && sort.direction === 'Asc') {
          return b.gallonsReq - a.gallonsReq;
        }
        else if(sort.key === 'Price/Gal' && sort.direction === 'Desc') {
          return a.gallonsReq - b.gallonsReq;
        }
        else if(sort.key === 'Price/Gal' && sort.direction === 'Asc') {
          return b.gallonsReq - a.gallonsReq;
        }
        else if(sort.key === 'Total' && sort.direction === 'Desc') {
          return a.gallonsReq - b.gallonsReq;
        }
        else if(sort.key === 'Total' && sort.direction === 'Asc') {
          return b.gallonsReq - a.gallonsReq;
        }
      }
    )
  }

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
    <div className="main">
      
      <div className="table">
        <table class="table table-responsive" style={{border:1}} >
          <thead>
            <tr>
              <th>
                <button type='button' onClick={() => sortKey('Index')}>
                  Index
                </button>
              </th>
              <th>
                <button type='button' onClick={() => sortKey('Date')}>
                  Delivery Date
                </button>
              </th>
              <th>
                <button type='button' onClick={() => sortKey('Gallons')}>
                  Gallons Requested
                </button>
              </th>
              <th>
                <button type='button' onClick={() => sortKey('Price/Gal')}>
                  Price/Gal
                </button>
              </th>
              <th>
                <button type='button' onClick={() => sortKey('Total')}>
                  Total
                </button>
              </th>
            </tr>
          </thead>
          <tbody style={{borderBottom: "1px solid #ddd"}}>
            {
              orders.sort(changeSort()).map((quote, index) => {
                return (
                  <tr>
                    <td>{index}</td>
                    <td>{quote.deliveryDate.substring(0,10)}</td>
                    <td>{quote.gallonsReq}</td>
                    <td>{quote.pricePerGallon}</td>
                    <td>{quote.total}</td>
                  </tr>
                )
              })
            
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}