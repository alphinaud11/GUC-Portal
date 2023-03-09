import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";
import { Redirect } from "react-router-dom"
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";



class UpdateCourseInstructor extends Component {
  constructor() {
    super();
    this.state = {
      token: JSON.parse(localStorage.getItem("login")).token,
      isLoggedIn: JSON.parse(localStorage.getItem("login")).isLoggedIn,
      isLoading: true,
      expired : false,
      courseName : "",
      instructor : "",
      result: ""
    };
  }

  componentDidMount(){
    this.setState({
        isLoading: false
      });
    console.log('anyThing')
  }
  handleUpdate = (event) => {
    event.preventDefault();
    axios
      .post(
        "http://localhost:3000/updateCourseInstructor",
        {
          courseName : this.state.courseName,
          instructor : this.state.instructor
        },
        {
          headers: { "auth-token": this.state.token },
        }
      )
      .then((response) => {

        if(response.data === "sorry this course is not in the department of that HOD"){
          this.setState({
              isLoading: false,
              result: "sorry this course is not in the department of that HOD"
            });
      }else if(response.data === "Please Enter Strings in the courseName field and instructor field"){
          this.setState({
              isLoading: false,
              result: "Please Enter Strings in the courseName field and instructor field"
            });
      }else if(response.data === "You are not authorized to do this"){
          this.setState({
              isLoading: false,
              result: "You are not authorized to do this"
            });
      }else if(response.data === "could not find that instructor in the department"){
          this.setState({
            isLoading: false,
            result: "could not find that instructor in the department"
          });
      }else if(response.data === "the given name is not an Instructor"){
          this.setState({
            isLoading: false,
            result: "the given name is not an Instructor"
          });
      }else if(response.data === "The given name is not in the department"){
        this.setState({
          isLoading: false,
          result: "The given name is not in the department"
        });
      }
      else {
          this.setState({
              isLoading: false,
              result: "Successfully Updated"
            });
      }

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
              name="courseName"
              value={this.state.courseName}
              type="text"
              placeholder="Enter Course Name here"
              size="lg"
            />
          </Form.Group>

          <Form.Group controlId="formBasicImage">
            <Form.Control
              onChange={this.handleChange}
              style={inputStyles}
              name="instructor"
              value={this.state.instructor}
              type="text"
              placeholder="Enter Instructor username Here"
              size="lg"
            />
          </Form.Group>
          
          <Button
            style={{ fontSize: "20px", width: "30%" }}
            variant="success"
            type="submit"
          >
            Update
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
              <th>{this.state.result}</th>
            </tr>
          </thead>
          
        </Table>
      </div>
      );
  }
  }

export default UpdateCourseInstructor;