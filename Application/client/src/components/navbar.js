import React from 'react';
import {Nav, Navbar} from 'react-bootstrap'

export default function NavigationBar() {
    console.log(localStorage.getItem('loginStatus'))
    if(localStorage.getItem('loginStatus') === 'true') {
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