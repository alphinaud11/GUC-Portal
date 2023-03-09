import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";
import { Redirect } from "react-router-dom"
import Table from "react-bootstrap/Table";


class ViewCoursesCoverage extends Component{
    constructor() {
        super();
        this.state = {
          token: JSON.parse(localStorage.getItem("login")).token,
          isLoggedIn: JSON.parse(localStorage.getItem("login")).isLoggedIn,
          isLoading: true,
          expired : false,
          coverage : [],
          status: ""
        };
      }
      componentDidMount() {
        axios
          .get("http://localhost:3000/viewCoursesCoverage", {
            headers: { "auth-token": this.state.token },
          })
          .then((response) => {

            if(response.data==="You are not authorized to view the course coverage"){
              this.setState({
                isLoading: false,
                coverage: [],
                status: "You are not authorized to view the courses coverage"
              });
            }else{
              const coverage = response.data.map((cov)=>{return cov});
              this.setState({
                isLoading: false,
                coverage: coverage,
                status:"Successfully Calculated"
              });
            }
            

            console.log(this.state.coverage);
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
                <th>Courses Coverage</th>
              </tr>
              <tr>
                <th>{this.state.status}</th>
              </tr>
            </thead>
            <tbody style={{ fontSize: "120%" }}>
              {this.state.coverage.map((cov) => {
                return (
                  <tr key={cov.coverage}>
                    <td>Course Name : {cov.courseName} -  Coverage :  {cov.coverage} </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      );
    }
}

export default ViewCoursesCoverage;