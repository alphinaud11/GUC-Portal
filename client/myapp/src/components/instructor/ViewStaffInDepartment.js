import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";
import { Redirect } from "react-router-dom";
import InputGroup from 'react-bootstrap/InputGroup'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import Table from "react-bootstrap/Table";

class ViewStaffInDepartment extends Component
{
    constructor() 
    {
        super();
        this.state = {
          token: JSON.parse(localStorage.getItem("login")).token,
          isLoggedIn: JSON.parse(localStorage.getItem("login")).isLoggedIn,
          isLoading: true,
          result: [],
          expired: false
        };
    }


    componentDidMount()
    {
        axios
            .get("http://localhost:3000/viewStaffInDepartmentProfile", {
                headers: {"auth-token": this.state.token}
            })
            .then((response) => {
                console.log(response);
                this.setState({
                  isLoading: false,
                  result: response.data
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

    render() 
    {
        return this.state.expired === true ? (
            <Redirect to="/login" />
          ) : this.state.isLoading === true ? (
            <Spinner
              size="xl"
              style={{ marginLeft: "50%", marginTop: "10%" }}
              animation="border"
            />
          ) : (
            <div style={{marginLeft:"25px", marginTop:"25px"}}>
                  <Table striped bordered hover variant="dark" className = "text-center" style ={{marginTop:"20px", marginBottom:"50px"}}>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Office</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.result.map((res) => {
                        return (
                          <tr>
                            <td>{res.username}</td>
                            <td>{res.email}</td>
                            <td>{res.office}</td>
                          </tr>  
                          )
                      })}
                    </tbody>
                  </Table>
            </div>    
          );
    } 
  }

export default ViewStaffInDepartment;