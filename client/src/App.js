import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar";
import HomePage from "./components/homePage";
import UsersList from "./components/usersList";
import CreateUser from "./components/createUser";

function App() {
  return (
    <Router>
      <Navbar />
      <br />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path = "/usersList" element={<UsersList />}></Route>
        <Route path="/createUser" element={<CreateUser />}></Route>
      </Routes>
    </Router>
  );
}

export default App;