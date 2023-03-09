import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";
import { Redirect } from "react-router-dom"
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";



class AcceptLeaveRequest extends Component {
  constructor() {
    super();
    this.state = {
      token: JSON.parse(localStorage.getItem("login")).token,
      isLoggedIn: JSON.parse(localStorage.getItem("login")).isLoggedIn,
      isLoading: true,
      expired : false,
      staff: [],
      department: ""
    };
  }

  componentDidMount(){
    this.setState({
        isLoading: false
      });
    
  }
  handleUpdate = (event) => {
    event.preventDefault();
    axios
      .post(
        "http://localhost:3000/viewStaffInDepartment",
        {
          department : this.state.department
        },
        {
          headers: { "auth-token": this.state.token },
        }
      )
      .then((response) => {

        const staff = response.data.map((member)=>{return member});
        this.setState({
            isLoading: false,
            staff: staff
          });

        console.log(response.data);
      })
      .catch((err) => {
        if (err.response.data === "Invalid Token") {
          alert("Your credentials are expired, login again")
          this.setState({
            expired: true,
          });
        }
      });
  };
  handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value,
    });
    console.log(this.state.username)
  };
  render() {
    // console.log(this.state.token);
    const inputStyles = {
      width: "70%",
      margin: "auto",
    };
    const labelStyles = {
      fontSize: "200%",
      fontFamily: "'Libre Baskerville', serif",
      //textDecoration : "underline"
    };
    return this.state.expired === true ? (
      <Redirect to="/login" />
    ) : this.state.isLoading === true ? (
      <Spinner
        size="xl"
        style={{ marginLeft: "50%", marginTop: "10%" }}
        animation="border"
      />
    ) : (
    <div>
      <Form
        style={{
          marginTop: "5%",
          width: "60%",
          marginLeft: "20%",
          backgroundColor: "#e3b76b",
        }}
        className="text-center border border-success rounded p-5"
        onSubmit={this.handleUpdate}
      >
        <Form.Group controlId="formBasicImage">
          <Form.Control
            onChange={this.handleChange}
            style={inputStyles}
            name="department"
            value={this.state.department}
            type="text"
            placeholder="Enter Department Here"
            size="lg"
          />
        </Form.Group>
        
        <Button
          style={{ fontSize: "20px", width: "30%" }}
          variant="success"
          type="submit"
        >
          View
        </Button>
      </Form>

      
      <Table
        striped
        bordered
        hover
        variant="danger"
        className="text-center"
        style={{ width: "70%", marginLeft: "15%" }}
      >
        <thead style={{ fontSize: "150%" }}>
          <tr>
            <th>Staff In Department</th>
          </tr>
        </thead>
        <tbody style={{ fontSize: "120%" }}>
            {this.state.staff.map((member) => {
            return (
              <tr key={member.username}>
                <td>Username : {member.username}</td>
                
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
    );
  }
  }

export default AcceptLeaveRequest;