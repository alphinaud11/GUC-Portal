import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Spinner from "react-bootstrap/Spinner";
import Table from "react-bootstrap/Table";
import axios from "axios";
import moment from "moment"
import { Redirect } from "react-router-dom"

class ViewAttendance extends Component {
  constructor() {
    super();
    this.state = {
      token: JSON.parse(localStorage.getItem("login")).token,
      isLoggedIn: JSON.parse(localStorage.getItem("login")).isLoggedIn,
      isLoading: true,
      signIn: [],
      signOut: [],
      month : ""
    };
  }
  handleChange = (event) => {
    const value = event.target.value;
    this.setState({
      month : value,
    });
  };

  componentDidMount() {
    axios
      .get("http://localhost:3000/viewAttendance", {
        headers: { "auth-token": this.state.token },
      })
      .then((response) => {
        const res = response.data;
        const signIns = res.map((record) => {
          return moment(record.signIn).format("dddd, MMMM Do YYYY");
        });
        const signOuts = res.map((record) => {
          return moment(record.signOut).format("dddd, MMMM Do YYYY");
        });
        //console.log(response.data[0].signIn);
        //console.log("array sign Ins ", signIns);
        this.setState({
          isLoading: false,
          signIn: signIns,
          signOut: signOuts,
        });
      })
      .catch((err) => {
        console.log(err.response.data);
        if (err.response.data === "Invalid Token") {
          alert("Your credentials are expired, login again")
          this.setState({
            expired: true,
          });
        }
      });
  }

  render() {
    console.log(this.state.month)
    return this.state.expired === true ? (
      <Redirect to="/login" />
    ) :this.state.isLoading === true ? (
      <Spinner
        size="xl"
        style={{ marginLeft: "50%", marginTop: "10%" }}
        animation="border"
      />
    ) : (
      <div>
        <Table striped bordered hover variant="success" className = "text-center" style ={{width : "70%", marginLeft:"15%"}}>
          <thead style ={{fontSize : "150%"}}>
            <tr>
              <th>Attendance Records</th>
            </tr>
          </thead>
          <tbody style ={{fontSize : "120%"}}>
              {this.state.signIn.map((record) => {
                return (<tr key = {record}>
                    <td>{record}</td>
                </tr> 
              )})}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default ViewAttendance;
