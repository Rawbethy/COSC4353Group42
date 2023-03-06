import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar";
import Login from "./components/login";
import Logout from "./components/logout"
import Homepage from "./components/homePage";
import Register from "./components/register";
import Profile from "./components/profile";
import QuoteForm from "./components/quoteForm";
import OrderHistory from "./components/orderHistory";

export const UserContext = React.createContext();

export default function App() {
  const storedUsername = localStorage.getItem('username') || '';
  const storedLoginStatus = localStorage.getItem('loginStatus') || false;
  const[username, setUsername] = useState(storedUsername);
  const[loginStatus, setLoginStatus] = useState(storedLoginStatus);

  useEffect(() => {
    localStorage.setItem('username', username);
    localStorage.setItem('loginStatus', loginStatus);
  }, [username, loginStatus])

  return (
    <UserContext.Provider value={{username, setUsername, loginStatus, setLoginStatus}}>
      <Router>
        <Navbar />
        <br />
          <Routes>
                <Route path="/" element={<Homepage />}></Route>
                <Route path="/register" element={<Register />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/logout" element={<Logout />}></Route>
                <Route path="/profile" element={<Profile />}></Route>
                <Route path="/quoteForm" element={<QuoteForm />}></Route>
                <Route path="/history" element={<OrderHistory />}></Route>
          </Routes>
      </Router>
    </UserContext.Provider>
  );
}
