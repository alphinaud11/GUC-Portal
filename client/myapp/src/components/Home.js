import React, { Component } from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
class Home extends Component {
  state = {};
  render() {
    return (
      <Container className="mt-5">
        <Jumbotron className="text-center">
          <h1 className="display-2 mb-2 text-center">
            Welcome to the GUC portal
          </h1>
          <img
            className="mr-2 mb-4"
            width="40%"
            src="https://images-na.ssl-images-amazon.com/images/I/71DHkU8iaoL._AC_SL1500_.jpg"
            alt=""
          />
          <img
            className="ml-2 mb-4"
            width="40%"
            src="https://sis.gov.eg/Content/Upload/slider/520161814523505.jpg"
            alt=""
          />
          <p>
            <a href ="/login" className= "btn btn-success btn-lg" variant="primary">Login to your account</a>
          </p>
        </Jumbotron>
      </Container>
    );
  }
}

export default Home;
