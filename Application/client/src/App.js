import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar";
import Login from "./components/login";
import Logout from "./components/logout"
import Homepage from "./components/homePage";
import Register from "./components/register";


export default function App() {
  const[loggedIn, setLogin] = useState(false)

  return (
    <Router>
      <Navbar login={loggedIn}/>
      <br />
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login setLogin={setLogin}/>}></Route>
        <Route path="/logout" element={<Logout />}></Route>
      </Routes>
    </Router>
  );
}
