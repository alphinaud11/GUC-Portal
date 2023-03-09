import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import 'bootstrap/dist/css/bootstrap.min.css'

class Header extends Component {
  state = {};
  render() {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Navbar.Brand href="/">
      <img
        alt=""
        src="https://www.guc.edu.eg/img/guc_logo_og.png"
        width="40%"
        height="30"
        className="d-inline-block align-top mr-1"
      />{' '}
    
    </Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
    </Nav>
    <Nav>
      <Nav.Link href="/">Home</Nav.Link>
      <Nav.Link href="/about">
        About
      </Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Navbar>

    );
  }
}

export default Header;
