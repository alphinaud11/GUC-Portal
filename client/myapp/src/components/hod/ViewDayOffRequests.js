import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";
import { Redirect } from "react-router-dom"
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";



class ViewDayOffRequests extends Component{
    constructor() {
        super();
        this.state = {
          token: JSON.parse(localStorage.getItem("login")).token,
          isLoggedIn: JSON.parse(localStorage.getItem("login")).isLoggedIn,
          isLoading: true,
          expired : false,
          requests : []
        };
      }
      componentDidMount() {
        axios
          .get("http://localhost:3000/viewDayOffRequests", {
            headers: { "auth-token": this.state.token },
          })
          .then((response) => {
            const requests = response.data.map((requ)=>{return requ});
            this.setState({
              isLoading: false,
              requests: requests
            });

            console.log(requests);
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
                <th>Day Off Requests</th>
              </tr>
            </thead>
            <tbody style={{ fontSize: "120%" }}>
                {this.state.requests.map((request) => {
                return (
                  <tr key={request.sender}>
                    <td>Sender : {request.sender} - Recipient : {request.recipient} - Day : {request.day} - Reason : {request.reason} - Status : {request.status} - RejectionReason : {request.rejectionReason}</td>
                      {/* <Button
                      style={{ fontSize: "20px", width: "100%" }}
                      variant="success"
                      type="submit"
                      onClick = {this.handleAcceptance}
                    >
                      Accept
                    </Button>
                    
                    <Button
                      style={{ fontSize: "20px", width: "100%" }}
                      variant="success"
                      onClick = {this.handleRejection}
                    >
                      Reject
                    </Button> */}

                    {request.status==="A"? (<Button
                      style={{ fontSize: "20px", width: "100%" }}
                    >
                      Accepted
                    </Button>): request.status === "R"?
                    ( <Button
                      style={{ fontSize: "20px", width: "100%" }}
                    >
                      Rejected
                    </Button>) : (<div> <Button
                      style={{ fontSize: "20px", width: "100%" }}
                      variant="success"
                      type="submit"
                      onClick = {
                        ()=>{
                          
                          axios
                          .post(
                            "http://localhost:3000/acceptDayOffRequest",
                            {
                              id:request._id
                            },
                            {
                              headers: { "auth-token": this.state.token },
                            }
                          )
                          .then((response) => {
                            axios
                            .get("http://localhost:3000/viewDayOffRequests", {
                              headers: { "auth-token": this.state.token },
                            })
                            .then((response) => {
                              const requests = response.data.map((requ)=>{return requ});
                              this.setState({
                                isLoading: false,
                                requests: requests
                              });

                              console.log(requests);
                            })
                            .catch((err) => {
                              if (err.response.data === "Invalid Token") {
                                alert("Your credentials are expired, login again")
                                this.setState({
                                  expired: true,
                                });
                              }
                            });
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
                      }
                    >
                      Accept
                    </Button>
                    
                    <Button
                      style={{ fontSize: "20px", width: "100%" }}
                      variant="success"
                      onClick = {()=>{
                        axios
                        .post(
                          "http://localhost:3000/rejectDayOffRequest",
                          {
                            id:request._id,
                            rejectionReason : "nothing"

                          },
                          {
                            headers: { "auth-token": this.state.token },
                          }
                        )
                        .then((response) => {
                          axios
                          .get("http://localhost:3000/viewDayOffRequests", {
                            headers: { "auth-token": this.state.token },
                          })
                          .then((response) => {
                            const requests = response.data.map((requ)=>{return requ});
                            this.setState({
                              isLoading: false,
                              requests: requests
                            });

                            console.log(requests);
                          })
                          .catch((err) => {
                            if (err.response.data === "Invalid Token") {
                              alert("Your credentials are expired, login again")
                              this.setState({
                                expired: true,
                              });
                            }
                          });
                        })
                        .catch((err) => {
                          if (err.response.data === "Invalid Token") {
                            alert("Your credentials are expired, login again")
                            this.setState({
                              expired: true,
                            });
                          }
                        });
                      }}
                    >
                      Reject
                    </Button></div>)}
                    
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      );
    }
}

export default ViewDayOffRequests;