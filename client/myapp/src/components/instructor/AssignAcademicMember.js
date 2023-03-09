import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";
import { Redirect } from "react-router-dom";
import InputGroup from 'react-bootstrap/InputGroup'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import Form from "react-bootstrap/Form";

class AssignAcademicMember extends Component
{
    constructor() 
    {
        super();
        this.state = {
          token: JSON.parse(localStorage.getItem("login")).token,
          isLoggedIn: JSON.parse(localStorage.getItem("login")).isLoggedIn,
          isLoading: true,
          courses:[],
          course: "",
          result: "",
          teacher: "",
          expired: false
        };
    }


    componentDidMount()
    {
        axios
            .get("http://localhost:3000/viewCourses", {
                headers: {"auth-token": this.state.token}
            })
            .then((response) => {
                console.log(response);
                this.setState({
                  isLoading: false,
                  courses: response.data
                });
              })
              .catch((err) => {
                console.log(err.response.data);
                if (err.response.data === "Invalid Token") {
                  alert("Your credentials are expired, login again");
                  this.setState({
                    expired: true,
                  });
                }
              });
    }

    render() 
    {
        return this.state.expired === true ? (
            <Redirect to="/login" />
          ) : this.state.isLoading === true ? (
            <Spinner
              size="xl"
              style={{ marginLeft: "50%", marginTop: "10%" }}
              animation="border"
            />
          ) : (
            <div style={{marginLeft:"25px", marginTop:"25px"}}>
                <InputGroup className="mb-3">
                  <DropdownButton variant="secondary" as={InputGroup.Prepend} title="courses" id="input-group-dropdown-1" onSelect={this.handleChange}>
                        {this.state.courses.map((course) => {
                          return <Dropdown.Item key={course} eventKey={course}>{course}</Dropdown.Item>
                        })}
                    </DropdownButton>
                </InputGroup>
                <br></br>
                <Form.Group controlId="formBasicUsername">
                    <Form.Control
                        onChange={this.handleTextChange}
                        name="username"
                        value={this.state.teacher}
                        type="text"
                        placeholder="Enter username"
                        size="lg"
                    />
                </Form.Group>
                <br></br>
                <button type="button" class="btn btn-secondary" onClick={this.assign}>Assign</button>
                <br></br>
                <div style={{marginLeft:"25px", marginTop:"25px"}}>
                  <h2>{this.state.result}</h2>
                </div>
            </div>    
          );
    }

    handleChange = (event) => {
        this.setState({
            course: event,
            result: ""
        });
    }

    handleTextChange = (event) => {
        event.preventDefault();
        this.setState({
            teacher: event.target.value
        })
    }

    assign = (event) => {
        event.preventDefault();
        axios
            .post(
                "http://localhost:3000/assignAcademicMember",
                {
                    course: this.state.course,
                    teacher: this.state.teacher
                },
                {
                    headers: { "auth-token": this.state.token }
                }
            )
            .then((response) => {
                console.log(this.state.teacher);
                console.log(this.state.course);
                console.log(response);
                this.setState({
                result: response.data,
                teacher: "",
                course: ""
                });
                console.log("Successful")
            })
            .catch((err) => {
                console.log(err);
            });
    }
}

export default AssignAcademicMember;