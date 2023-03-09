import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Spinner from "react-bootstrap/Spinner";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { Redirect } from "react-router-dom";

class ViewMissingDays extends Component {
  constructor() {
    super();
    this.state = {
      token: JSON.parse(localStorage.getItem("login")).token,
      isLoggedIn: JSON.parse(localStorage.getItem("login")).isLoggedIn,
      isLoading: true,
      records: [],
      month: "",
      expired: false,
    };
  }
  handleChange = (event) => {
    event.preventDefault();
    const value = event.target.value;
    this.setState({
      month: value,
    });
  };

  componentDidMount() {
    axios
      .get("http://localhost:3000/viewMissingDays", {
        headers: { "auth-token": this.state.token },
      })
      .then((response) => {
        const res = response.data;
        console.log(response);
        const recs = res.map((record) => {
          return record;
        });
        //console.log(response.data[0].signIn);
        //console.log("array sign Ins ", signIns);
        this.setState({
          isLoading: false,
          records: recs,
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
    console.log(this.state.month);
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
              <th>Missing Days</th>
            </tr>
          </thead>
          <tbody style={{ fontSize: "120%" }}>
            {this.state.records.map((record) => {
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

export default ViewMissingDays;
