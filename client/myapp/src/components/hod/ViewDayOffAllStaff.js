import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";
import { Redirect } from "react-router-dom"
import Table from "react-bootstrap/Table";

class ViewDayOffAllStaff extends Component{
    constructor() {
        super();
        this.state = {
          token: JSON.parse(localStorage.getItem("login")).token,
          isLoggedIn: JSON.parse(localStorage.getItem("login")).isLoggedIn,
          isLoading: true,
          expired : false,
          dayOffs: [],
          status: ""
        };
      }
      componentDidMount() {
        axios
          .get("http://localhost:3000/viewDayOffAllStaff", {
            headers: { "auth-token": this.state.token },
          })
          .then((response) => {
            if(response.data === "You are not authorized to do this functionality"){
              this.setState({
                isLoading: false,
                dayOffs: [],
                status: "You are not authorized to do this functionality"
              });
            }else{
              const days = response.data.map(day=>{return day})
              this.setState({
              isLoading: false,
              dayOffs: days,
              status: "Successfully Retrieved"
            });
            }
            

            console.log(this.state.dayOffs);
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
                <th>Days Off</th>
              </tr>
              <tr>
                <th>{this.state.status}</th>
              </tr>
            </thead>
            <tbody style={{ fontSize: "120%" }}>
              {this.state.dayOffs.map((day) => {
                return (
                  <tr key={day.dayOff}>
                    <td>name : {day.name} -  day Off :  {day.dayOff} </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      );
    }
}

export default ViewDayOffAllStaff;