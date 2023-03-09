import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "bootstrap/dist/css/bootstrap.min.css";
class Footer extends Component {
  state = {};
  render() {
    return (
      <div style ={{marginBottom:"5%"}}>
      <Navbar
        fixed = "bottom"
        sticky = "bottom"
        collapseOnSelect
        expand="true"
        bg="dark"
        variant="dark"
      >
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav style={{ color: "gray", fontSize: "130%" }} className="mx-auto text-center">
            Contact Us: <ul>
                <li>Email: continuing.education@guc.edu.eg</li>
                <li>Hotline: 16482</li>
                <li>Tel: +20227589990-8</li>
                <li>Fax: +202 27581041</li>
            </ul>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      </div>
      
    );
  }
}

export default Footer;
