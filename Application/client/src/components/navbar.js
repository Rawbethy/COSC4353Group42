import React, {Component} from 'react';
import {Nav, Navbar} from 'react-bootstrap'

export default class navbar extends Component {
    render() {
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
                        <Nav.Link href="/usersList">Users List</Nav.Link>
                        <Nav.Link href="/createUser">Create User</Nav.Link>        
                    </Nav>
                </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}