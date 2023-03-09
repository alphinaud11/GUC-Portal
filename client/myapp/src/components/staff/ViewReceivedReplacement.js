import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import Button from 'react-bootstrap/Button'
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";
import moment from "moment"
import { Redirect } from "react-router-dom"

class ViewReceivedReplacement extends Component {
    constructor() {
        super();
        this.state = {
            token: JSON.parse(localStorage.getItem("login")).token,
            isLoggedIn: JSON.parse(localStorage.getItem("login")).isLoggedIn,
            isLoading: true,
            expired: false,
            requests: []
        }
    }

    componentDidMount() {
        axios
        .get("http://localhost:3000/viewReceivedReplacement", {
        headers: { "auth-token": this.state.token },
      })
      .then((response) => {
        this.setState({
            isLoading: false,
            requests: response.data
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

    handleAccept = (event) => {
      event.preventDefault();
        axios
        .post("http://localhost:3000/acceptReplacement",
        {
            requestId: event.target.value
          },
        {
        headers: { "auth-token": this.state.token },
      })
      .then((response) => {
        if (response.data === "Request accepted successfully") {
            const newRequests = this.state.requests.map( request => {
                if (request._id !== event.target.value) {
                    return request;
                }
                else {
                    request.status = "A";
                    return request;
                }
            })
            this.setState({
              requests: newRequests
            });
          }
          alert(response.data);
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

    handleReject = (event) => {
      event.preventDefault();
      axios
        .post("http://localhost:3000/rejectReplacement",
        {
          requestId: event.target.value
          },
        {
        headers: { "auth-token": this.state.token },
      })
      .then((response) => {
        if (response.data === "Request rejected successfully") {
            const newRequests = this.state.requests.map( request => {
                if (request._id !== event.target.value) {
                    return request;
                }
                else {
                    request.status = "R";
                    return request;
                }
            })
            this.setState({
              requests: newRequests
            });
          }
          alert(response.data);
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
              <th>Received Requests</th>
            </tr>
          </thead>
          <tbody style ={{fontSize : "120%"}}>
          {this.state.requests.map((request, index) => {
            return [<tr key = {index}>
                    <td key = {index+1}>{"Status: " + (request.status === "P" ? "Pending" : (request.status === "A" ? "Accepted" : "Rejected")) + " | Course: " + request.slot.course + " | Location: " + request.slot.location + " | Start: " + request.slot.start + " | End: " + request.slot.end + " | Date: " + moment(request.slot.replacement).format("dddd, MMMM Do YYYY") + " | Sender: " + request.sender}</td>
                </tr>,
  <Button variant="success" key = {index+2} value={request._id} onClick={this.handleAccept} style={{marginRight:"5px"}}>
    Accept
  </Button>,
  <Button variant="danger" key = {index+3} value={request._id} onClick={this.handleReject}>
    Reject
  </Button>]
    })}
          </tbody>
        </Table>
            </div>
        )
    }
}

export default ViewReceivedReplacement
