import React, { useState } from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link } from "react-router-dom";


const Header = () => {
     const[publicUrl, setpublicUrl] = useState("/react-laravel/task-management/");
    return (
            <div>
                <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
                    <Container>
                    <Link to={`${publicUrl}`}>
    <Navbar.Brand>Task Management</Navbar.Brand>
    </Link>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
      <Link to={`${publicUrl}`}>
        <Nav.Item className="text-white mr-2">Home</Nav.Item>
        </Link>
        <Link to={`${publicUrl}projects`}>
        <Nav.Item className="text-white mr-2">Projects</Nav.Item>
        </Link>
        <Link to={`${publicUrl}about`}>
        <Nav.Item className="text-white mr-2">About</Nav.Item>
        </Link>
        <Link to={`${publicUrl}contact`}>
        <Nav.Item className="text-white mr-2">Contact</Nav.Item>
        </Link>
      </Nav>
    </Navbar.Collapse>
    </Container>
</Navbar>
            </div>
    );
};
 
export default Header;