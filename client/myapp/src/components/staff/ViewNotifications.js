import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";
import { Redirect } from "react-router-dom"

class ViewNotifications extends Component {
    constructor() {
        super();
        this.state = {
            token: JSON.parse(localStorage.getItem("login")).token,
            isLoggedIn: JSON.parse(localStorage.getItem("login")).isLoggedIn,
            isLoading: true,
            expired: false,
            notifications: []
        }
    }

    componentDidMount() {
        axios
        .get("http://localhost:3000/viewNotifications", {
        headers: { "auth-token": this.state.token },
      })
      .then((response) => {
        this.setState({
            isLoading: false,
            notifications: response.data
          });
    })
    .catch((err) => {
        if (err.response.data === "Invalid Token") {
            alert("Your credentials are expired, login again")
            this.setState({
              expired: true
            });
          }
    });
    }

    render() {
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
            <Table striped bordered hover variant="dark" className = "text-center" style ={{marginTop:"20px"}}>
          <thead style ={{fontSize : "150%"}}>
            <tr>
              <th>Notifications</th>
            </tr>
          </thead>
          <tbody style ={{fontSize : "120%"}}>
          {this.state.notifications.map((notification, index) => {
            return <tr key = {index}>
                    <td key = {index+1}>{notification.message}</td>
                </tr>
    })}
          </tbody>
        </Table>
            </div>
        )
    }
}

export default ViewNotifications
