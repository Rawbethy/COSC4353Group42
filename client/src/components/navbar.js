import React, {useState, useContext} from 'react';
import {Nav, Navbar, NavDropdown} from 'react-bootstrap'
import {UserContext} from '../App';

export default function NavigationBar() {
    const{loginStatus} = useContext(UserContext);
    const[dropdown, setDropdown] = useState(false);

    function toggleDropdown() {
        setDropdown(!dropdown);
    }
    
    if((loginStatus === 'true') || (loginStatus === true)) {
        return (
            <div class="app">
                <Navbar bg="dark" variant="dark" sticky="top" expand="lg">
                <Navbar.Brand>
                    <Nav.Link href='/'>MyReactApp</Nav.Link>
                </Navbar.Brand>
    
                <Navbar.Toggle />
                <Navbar.Collapse>
                    <Nav>
                        <Nav.Link href="/" >Home Page</Nav.Link> 
                        <Nav.Link href="/profile" >Profile</Nav.Link>
                        <NavDropdown title='Quotes' id='basic-nav-dropdown' show={dropdown} onClick={toggleDropdown}>
                            <NavDropdown.Item href="/quoteForm">Form</NavDropdown.Item>
                            <NavDropdown.Item href="/history">History</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="/logout" >Logout</Nav.Link>     
                    </Nav>
                </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
    else {
        return (
            <div class="app">
                <Navbar bg="dark" variant="dark" sticky="top" expand="lg">
                <Navbar.Brand>
                    <Nav.Link href='/'>MyReactApp</Nav.Link>
                </Navbar.Brand>
    
                <Navbar.Toggle />
                <Navbar.Collapse>
                    <Nav>
                        <Nav.Link href="/">Home Page</Nav.Link> 
                        <Nav.Link href="/login">Login</Nav.Link>  
                        <Nav.Link href="/register">Register</Nav.Link>    
                    </Nav>
                </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}