import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner"
import { Redirect } from "react-router-dom";

export default class HrViewMissingHoursDays extends Component {
  constructor() {
    super();
    this.state = {
      token: JSON.parse(localStorage.getItem("login")).token,
      isLoggedIn: JSON.parse(localStorage.getItem("login")).isLoggedIn,
      isLoading: true,
      staff : [],
      expired: false
    };
  }

 componentDidMount(){
  axios
  .get(
    "http://localhost:3000/hrViewMissingHoursMissingDays",
    {
      headers: { "auth-token": this.state.token },
    }
  )
  .then((response) => {
    const res = response.data;
    console.log(res)
    const staffs = res.map((record) => {
      return record.username;
    });
    this.setState({
      isLoading: false,
      staff: staffs,
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


  render() {
    //console.log(this.state.month)
    return this.state.expired === true ? (
      <Redirect to="/login" />
    ) : this.state.isLoading === true ? (
      <Spinner
        size="xl"
        style={{ marginLeft: "50%", marginTop: "10%" }}
        animation="border"
      />
    ) :(
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
              <th>Staff with Missing Days/Hours</th>
            </tr>
          </thead>
          <tbody style={{ fontSize: "120%" }}>
            {this.state.staff.map((record) => {
              return (
                <tr key={record}>
                  <td>{record}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    );
  }
}
