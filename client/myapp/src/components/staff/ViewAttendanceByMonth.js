import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import axios from "axios";
import moment from "moment";
import { Redirect } from "react-router-dom";

class ViewAttendanceByMonth extends Component {
  constructor() {
    super();
    this.state = {
      token: JSON.parse(localStorage.getItem("login")).token,
      isLoggedIn: JSON.parse(localStorage.getItem("login")).isLoggedIn,
      isLoading: true,
      signIn: [],
      signOut: [],
      month: "",
      expired: false,
      count : 0
    };
  }
  handleChange = (event) => {
    event.preventDefault();
    const value = event.target.value;
    this.setState({
      month: value,
    });
    axios
      .post(
        "http://localhost:3000/viewAttendanceByMonth",
        {
          month: value,
        },
        {
          headers: { "auth-token": this.state.token },
        }
      )
      .then((response) => {
        console.log(response);
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
        console.log(err);
      });
  };

  componentDidMount() {
    axios
      .post(
        "http://localhost:3000/viewAttendanceByMonth",
        {
          month: this.state.month,
        },
        {
          headers: { "auth-token": this.state.token },
        }
      )
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
        this.setState(prevState => {
          return {isLoading: false,
          signIn: signIns,
          signOut: signOuts,
          count : prevState.count + 1
        }
        })
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
        <Form inline>
          <Form.Group>
            <Form.Control as="select" size="lg" onChange={this.handleChange}>
              <option value="Choose Month">Choose Month</option>
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="December">December</option>
            </Form.Control>
          </Form.Group>
        </Form>
        <Table
          striped
          bordered
          hover
          variant="success"
          className="text-center"
          style={{ width: "70%", marginLeft: "15%" }}
        >
          <thead style={{ fontSize: "150%" }}>
            <tr>
              <th>Attendance Records</th>
            </tr>
          </thead>
          <tbody style={{ fontSize: "120%" }}>
            {this.state.signIn.map((record) => {
              return (
                <tr key={this.state.count}>
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

export default ViewAttendanceByMonth;
