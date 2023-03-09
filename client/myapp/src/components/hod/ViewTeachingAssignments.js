import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";
import { Redirect } from "react-router-dom"
import Table from "react-bootstrap/Table";

class ViewTeachingAssignments extends Component{
    constructor() {
        super();
        this.state = {
          token: JSON.parse(localStorage.getItem("login")).token,
          isLoggedIn: JSON.parse(localStorage.getItem("login")).isLoggedIn,
          isLoading: true,
          expired : false,
          assignments : [],
          status: ""
        };
      }
      componentDidMount() {
        axios
          .get("http://localhost:3000/viewTeachingAssignments", {
            headers: { "auth-token": this.state.token },
          })
          .then((response) => {
            if(response.data === "You are not authorized to view teaching assginments"){
              this.setState({
                isLoading: false,
                assignments: [],
                status: "You are not authorized to view teaching assginments"
              });
            }
            else{
              const assignments = response.data.map((ass)=>{return ass});
              this.setState({
                isLoading: false,
                assignments: assignments
              });
            }
            
          })
          .catch((err) => {
            if (err.response.data === "Invalid Token") {
              alert("Your credentials are expired, login again")
              this.setState({
                expired: true,
              });
            }
          });
      }
    render() {
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
                <th>Teaching Assignments</th>
              </tr>
              <tr>
                <th>{this.state.status}</th>
              </tr>
            </thead>
            <tbody style={{ fontSize: "120%" }}>
                {this.state.assignments.map((ass) => {
                return (
                  <tr key={ass.courseName}>
                    <td>Course Name : {ass.courseName} - Slots : {ass.Assignments.map((slot)=>{return (<td>Teacher : {slot.teacher} - Location : {slot.location} - Start : {slot.start} - End : {slot.end} - Day : {slot.day}</td>)})}</td>
                    
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      );
    }
}

export default ViewTeachingAssignments;