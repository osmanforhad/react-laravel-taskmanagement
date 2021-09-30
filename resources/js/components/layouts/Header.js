import React, { useState } from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link } from "react-router-dom";


const Header = () => {
     const[publicUrl, setpublicUrl] = useState("/react-laravel/task-management/");
    return (
            <div>
                <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
                    <Container>
    <Navbar.Brand href="#Home"><Link to={`${publicUrl}`}>Task Management</Link></Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link href="#">
            <Link to={`${publicUrl}`}>Home</Link>
            </Nav.Link>
        <Nav.Link href="#">
        <Link to={`${publicUrl}about`}>About</Link>
            </Nav.Link>
            <Nav.Link href="#">
        <Link to={`${publicUrl}contact`}>Contact</Link>
            </Nav.Link>
      </Nav>
    </Navbar.Collapse>
    </Container>
</Navbar>
            </div>
    );
};
 
export default Header;