import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import Spinner from "react-bootstrap/Spinner";
import Table from 'react-bootstrap/Table'
import { Redirect } from "react-router-dom"
import axios from "axios";

class viewSchedule extends Component {
    constructor() {
        super();
        this.state = {
            token: JSON.parse(localStorage.getItem("login")).token,
            isLoggedIn: JSON.parse(localStorage.getItem("login")).isLoggedIn,
            isLoading: true,
            expired: false,
            schedule: []
        }
    }

    componentDidMount() {
        axios
        .get("http://localhost:3000/viewSchedule", {
        headers: { "auth-token": this.state.token },
      })
      .then((response) => {
        const schedule = response.data;
        const days = ["Saturday","Sunday","Monday","Tuesday","Wednesday","Thursday"];
        let scheduleToBeViewed = [];
        for (let i=0; i<6; i++) {
            const day = schedule.filter(element => {
                return element.day === days[i];
            });
            let slotsToBeViewed = [<td key= "0"></td>, <td key= "1"></td>, <td key= "2"></td>, <td key= "3"></td>, <td key= "4"></td>];
            if (day.length === 1) {
                day[0].slots.forEach(slot => {
                    const slotType = slot.replacement ? "Replacement" : "Normal";
                    if (slot.start === "8:15") {
                        slotsToBeViewed[0] = <td key= "0">
                            <div>Course: {slot.course}</div>
                            <div>Location: {slot.location}</div>
                            <div>Start: {slot.start}</div>
                            <div>End: {slot.end}</div>
                            <div>Type: {slotType}</div>
                        </td>;
                    }
                    else if (slot.start === "10:00") {
                        slotsToBeViewed[1] = <td key= "1">
                            <div>Course: {slot.course}</div>
                            <div>Location: {slot.location}</div>
                            <div>Start: {slot.start}</div>
                            <div>End: {slot.end}</div>
                            <div>Type: {slotType}</div>
                        </td>;
                    }
                    else if (slot.start === "11:45") {
                        slotsToBeViewed[2] = <td key= "2">
                            <div>Course: {slot.course}</div>
                            <div>Location: {slot.location}</div>
                            <div>Start: {slot.start}</div>
                            <div>End: {slot.end}</div>
                            <div>Type: {slotType}</div>
                        </td>;
                    }
                    else if (slot.start === "1:45") {
                        slotsToBeViewed[3] = <td key= "3">
                            <div>Course: {slot.course}</div>
                            <div>Location: {slot.location}</div>
                            <div>Start: {slot.start}</div>
                            <div>End: {slot.end}</div>
                            <div>Type: {slotType}</div>
                        </td>;
                    }
                    else if (slot.start === "3:45") {
                        slotsToBeViewed[4] = <td key= "4">
                            <div>Course: {slot.course}</div>
                            <div>Location: {slot.location}</div>
                            <div>Start: {slot.start}</div>
                            <div>End: {slot.end}</div>
                            <div>Type: {slotType}</div>
                        </td>;
                    }
                });
            }
            scheduleToBeViewed.push(slotsToBeViewed);
        }
        console.log(scheduleToBeViewed);
        this.setState({
            isLoading: false,
            schedule: scheduleToBeViewed
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
              <Table striped bordered hover variant="dark" className = "text-center" style ={{marginTop:"20px", marginBottom:"50px"}}>
              <thead>
    <tr>
      <th>Day</th>
      <th>First Slot</th>
      <th>Second Slot</th>
      <th>Third Slot</th>
      <th>Fourth Slot</th>
      <th>Fifth Slot</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Saturday</td>
      {this.state.schedule[0]}
    </tr>
    <tr>
      <td>Sunday</td>
      {this.state.schedule[1]}
    </tr>
    <tr>
      <td>Monday</td>
      {this.state.schedule[2]}
    </tr>
    <tr>
      <td>Tuesday</td>
      {this.state.schedule[3]}
    </tr>
    <tr>
      <td>Wednesday</td>
      {this.state.schedule[4]}
    </tr>
    <tr>
      <td>Thursday</td>
      {this.state.schedule[5]}
    </tr>
  </tbody>
</Table>
            </div>
          );
    }
}

export default viewSchedule
