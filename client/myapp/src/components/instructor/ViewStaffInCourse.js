import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";
import { Redirect } from "react-router-dom";
import InputGroup from 'react-bootstrap/InputGroup'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import Table from "react-bootstrap/Table";

class ViewStaffInCourse extends Component
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
          result: [],
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
                <div>
                  <Table striped bordered hover variant="dark" className = "text-center" style ={{marginTop:"20px", marginBottom:"50px"}}>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Office</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.result.map((res) => {
                        return (
                          <tr>
                            <td>{res.username}</td>
                            <td>{res.email}</td>
                            <td>{res.office}</td>
                          </tr>  
                          )
                      })}
                    </tbody>
                  </Table>
                </div>
            </div>    
          );
    }

    handleChange = (event) => {
        this.setState({
            course: event,
            result: []
        });
        
      axios
        .post(
          "http://localhost:3000/viewStaffInCourseProfile",
          {
            course: event
          },
          {
            headers: { "auth-token": this.state.token }
          }
        )
        .then((response) => {
          console.log(response);
          this.setState({
            result: response.data
          });
          console.log(this.state.result);
          console.log("Successful")
        })
        .catch((err) => {
          console.log(err);
        });
    }
}

export default ViewStaffInCourse;