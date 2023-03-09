import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";
import { Redirect } from "react-router-dom";
import InputGroup from 'react-bootstrap/InputGroup'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'

class AssignToSlot extends Component
{
    constructor() 
    {
        super();
        this.state = {
          token: JSON.parse(localStorage.getItem("login")).token,
          isLoggedIn: JSON.parse(localStorage.getItem("login")).isLoggedIn,
          isLoading: true,
          courses: [],
          teachers: [],
          unassignedSlots: [],
          course: "",
          teacher: "",
          start: "",
          end: "",
          location: "",
          day: "",
          result: "",
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
                  <DropdownButton variant="secondary" as={InputGroup.Prepend} title="courses" id="input-group-dropdown-1" onSelect={this.courseChange}>
                       {this.state.courses.map((course) => {
                        return <Dropdown.Item key={course} eventKey={course}>{course}</Dropdown.Item>
                        })}
                    </DropdownButton>
                </InputGroup>
                <br></br>
                <InputGroup className="mb-3">
                  <DropdownButton variant="secondary" as={InputGroup.Prepend} title="unassigned slots" id="input-group-dropdown-2" onSelect={this.slotChange}>
                        {this.state.unassignedSlots.map((slot, index) => {
                            return <Dropdown.Item key={index} eventKey={index}>{slot.day}, {slot.location}, {slot.start}</Dropdown.Item>
                        })}
                  </DropdownButton>
                </InputGroup>
                <br></br>
                <InputGroup className="mb-3">
                  <DropdownButton variant="secondary" as={InputGroup.Prepend} title="teachers" id="input-group-dropdown-3" onSelect={this.teacherChange}>
                        {this.state.teachers.map((teacher) => {
                          return <Dropdown.Item key={teacher} eventKey={teacher}>{teacher}</Dropdown.Item>
                        })}
                    </DropdownButton>
                </InputGroup>
                <br></br>
                <button type="button" class="btn btn-secondary" onClick={this.assign}>Assign</button>
                <br></br>
                <div style={{marginLeft:"25px", marginTop:"25px"}}>
                  <h2>{this.state.result}</h2>
                </div>
            </div>    
          );
    }

    courseChange = (event) => {
        this.setState({
            course: event,
            start: "",
            end: "",
            location: "",
            day: "",
            teacher: "",
            unassignedSlots: [],
            teachers: [],
            result: ""
        });
      
      axios
        .post(
          "http://localhost:3000/viewUnassignedSlots",
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
            unassignedSlots: response.data
          });
          console.log(this.state.unassignedSlots);
          console.log("Successful")
        })
        .catch((err) => {
          console.log(err);
        });

      axios
      .post(
        "http://localhost:3000/viewStaffInCourse",
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
          teachers: response.data
        });
        console.log("Successful")
      })
      .catch((err) => {
        console.log(err);
      });  
    }

    slotChange = (event) => {
        console.log(event);
        const index = event;
        this.setState({
            start: this.state.unassignedSlots[index].start,
            end: this.state.unassignedSlots[index].end,
            location: this.state.unassignedSlots[index].location,
            day: this.state.unassignedSlots[index].day
        });
        console.log(this.state.start);
        console.log(this.state.end);
        console.log(this.state.location);
        console.log(this.state.day);
        console.log("Successful");
    }

    teacherChange = (event) => {
        this.setState({
            teacher: event
        })
        console.log(this.state.teacher);
        console.log("Successful");
    }

    assign = (event) => {
        axios
            .post(
                "http://localhost:3000/assignToSlot",
                {
                    course: this.state.course,
                    start: this.state.start,
                    end: this.state.end,
                    location: this.state.location,
                    day: this.state.day,
                    teacher: this.state.teacher
                },
                {
                    headers: { "auth-token": this.state.token }
                }
            )
            .then((response) => {
                console.log(this.state.start);
                console.log(this.state.end);
                console.log(this.state.location);
                console.log(this.state.day);
                console.log(this.state.teacher);
                console.log(this.state.course);
                console.log(response);
                this.setState({
                result: response.data,
                start: "",
                end: "",
                location: "",
                day: "",
                teacher: "",
                unassignedSlots: [],
                teachers: []
                });
                console.log("Successful")
            })
            .catch((err) => {
                console.log(err);
            });
    }
}

export default AssignToSlot;