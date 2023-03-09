import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";
import moment from "moment"
import { Redirect } from "react-router-dom"

class ViewSentRequests extends Component {
    constructor() {
        super();
        this.state = {
            token: JSON.parse(localStorage.getItem("login")).token,
            isLoggedIn: JSON.parse(localStorage.getItem("login")).isLoggedIn,
            isLoading: false,
            expired: false,
            type: "replacement",
            status: "",
            statusWhenViewed: "replacement",
            requests: []
        }
    }

    handleSelect1 = (event) => {
        this.setState({
            type: event
          });
    }

    handleSelect2 = (event) => {
      this.setState({
          status: event
        });
  }

    handleSubmit = (event) => {
      event.preventDefault();
        axios
        .post("http://localhost:3000/viewSentRequests",
        {
            type: this.state.type,
            status: this.state.status
          },
        {
        headers: { "auth-token": this.state.token },
      })
      .then((response) => {
        let requestsModified = [];
        if (this.state.type === "replacement") {
          requestsModified = response.data.map((request, index) => {
            return [<tr key = {index}>
                    <td key = {index+1}>{"Status: " + (request.status === "P" ? "Pending" : (request.status === "A" ? "Accepted" : "Rejected")) + " | Course: " + request.slot.course + " | Location: " + request.slot.location + " | Start: " + request.slot.start + " | End: " + request.slot.end + " | Date: " + moment(request.slot.replacement).format("dddd, MMMM Do YYYY") + " | Recipient: " + request.recipient}</td>
                </tr>,
  <Button variant="danger" key = {index+2} value={request._id} onClick={this.handleCancel1}>
    Cancel
  </Button>]
    });
        }
        else if (this.state.type === "slotLinking") {
          requestsModified = response.data.map((request, index) => {
            return [<tr key = {index}>
                    <td key = {index+1}>{"Status: " + (request.status === "P" ? "Pending" : (request.status === "A" ? "Accepted" : "Rejected")) + " | Course: " + request.course + " | Location: " + request.location + " | Start: " + request.start + " | End: " + request.end + " | Day: " + request.day}</td>
                </tr>,
  <Button variant="danger" key = {index+2} value={request._id} onClick={this.handleCancel2}>
    Cancel
  </Button>]
    });
        }
        else if (this.state.type === "dayoff") {
          requestsModified = response.data.map((request, index) => {
            return [<tr key = {index}>
                    <td key = {index+1}>{"Status: " + (request.status === "P" ? "Pending" : (request.status === "A" ? "Accepted" : "Rejected")) + " | Day: " + request.day + " | Reason: " + (request.reason ? request.reason : "None") + " | Rejection Reason: " + (request.rejectionReason ? request.rejectionReason : "None")}</td>
                </tr>,
  <Button variant="danger" key = {index+2} value={request._id} onClick={this.handleCancel3}>
    Cancel
  </Button>]
    });
        }
        else if (this.state.type === "annual") {
          requestsModified = response.data.map((request, index) => {
            return [<tr key = {index}>
                    <td key = {index+1}>{"Status: " + (request.status === "P" ? "Pending" : (request.status === "A" ? "Accepted" : "Rejected")) + " | Date: " + moment(request.date).format("dddd, MMMM Do YYYY") + " | Reason: " + (request.reason ? request.reason : "None") + " | Replacers: " + (request.replacers.length !== 0 ? request.replacers[0] : "None") + " | Rejection Reason: " + (request.rejectionReason ? request.rejectionReason : "None")}</td>
                </tr>,
  <Button variant="danger" key = {index+2} value={request._id} onClick={this.handleCancel4}>
    Cancel
  </Button>]
    });
        }
        else if (this.state.type === "accidental" || this.state.type === "sick" || this.state.type === "maternity") {
          requestsModified = response.data.map((request, index) => {
            return [<tr key = {index}>
                    <td key = {index+1}>{"Status: " + (request.status === "P" ? "Pending" : (request.status === "A" ? "Accepted" : "Rejected")) + " | Date: " + moment(request.date).format("dddd, MMMM Do YYYY") + " | Reason: " + (request.reason ? request.reason : "None") + " | Rejection Reason: " + (request.rejectionReason ? request.rejectionReason : "None")}</td>
                </tr>,
  <Button variant="danger" key = {index+2} value={request._id} onClick={this.handleCancel4}>
    Cancel
  </Button>]
    });
        }
        else if (this.state.type === "compensation") {
          requestsModified = response.data.map((request, index) => {
            return [<tr key = {index}>
                    <td key = {index+1}>{"Status: " + (request.status === "P" ? "Pending" : (request.status === "A" ? "Accepted" : "Rejected")) + " | Absence Date: " + moment(request.date).format("dddd, MMMM Do YYYY") + " | Compensation Date: " + moment(request.compensationDate).format("dddd, MMMM Do YYYY") + " | Reason: " + (request.reason ? request.reason : "None") + " | Rejection Reason: " + (request.rejectionReason ? request.rejectionReason : "None")}</td>
                </tr>,
  <Button variant="danger" key = {index+2} value={request._id} onClick={this.handleCancel4}>
    Cancel
  </Button>]
    });
        }
        this.setState({
            statusWhenViewed: this.state.type,
            requests: requestsModified
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

    handleCancel1 = (event) => {
      event.preventDefault();
      axios
        .post("http://localhost:3000/cancelReplaceRequest",
        {
          requestId: event.target.value
          },
        {
        headers: { "auth-token": this.state.token },
      })
      .then((response) => {
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

    handleCancel2 = (event) => {
      event.preventDefault();
      axios
        .post("http://localhost:3000/cancelSlotLinking",
        {
          requestId: event.target.value
          },
        {
        headers: { "auth-token": this.state.token },
      })
      .then((response) => {
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

    handleCancel3 = (event) => {
      event.preventDefault();
      axios
        .post("http://localhost:3000/cancelDayOffRequest",
        {
          requestId: event.target.value
          },
        {
        headers: { "auth-token": this.state.token },
      })
      .then((response) => {
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

    handleCancel4 = (event) => {
      event.preventDefault();
      axios
        .post("http://localhost:3000/cancelLeaveRequest",
        {
          requestId: event.target.value
          },
        {
        headers: { "auth-token": this.state.token },
      })
      .then((response) => {
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
            <Form onSubmit={this.handleSubmit} style={{marginLeft:"25px", marginTop:"25px"}}>

<InputGroup className="mb-3">
<DropdownButton
  as={InputGroup.Prepend}
  variant="secondary"
  title="Type"
  id="input-group-dropdown-1"
  onSelect={this.handleSelect1}
>
<Dropdown.Item key="replacement" eventKey="replacement">Replacement</Dropdown.Item>
<Dropdown.Item key="slotLinking" eventKey="slotLinking">Slot Linking</Dropdown.Item>
<Dropdown.Item key="dayoff" eventKey="dayoff">Change Day Off</Dropdown.Item>
<Dropdown.Item key="annual" eventKey="annual">Annual Leave</Dropdown.Item>
<Dropdown.Item key="accidental" eventKey="accidental">Accidental Leave</Dropdown.Item>
<Dropdown.Item key="sick" eventKey="sick">Sick Leave</Dropdown.Item>
<Dropdown.Item key="maternity" eventKey="maternity">Maternity Leave</Dropdown.Item>
<Dropdown.Item key="compensation" eventKey="compensation">Compensation Leave</Dropdown.Item>
</DropdownButton>
</InputGroup>

<InputGroup className="mb-3">
<DropdownButton
  as={InputGroup.Prepend}
  variant="secondary"
  title="Status"
  id="input-group-dropdown-1"
  onSelect={this.handleSelect2}
>
<Dropdown.Item key="all" eventKey="">All</Dropdown.Item>
<Dropdown.Item key="P" eventKey="P">Pending</Dropdown.Item>
<Dropdown.Item key="A" eventKey="A">Accepted</Dropdown.Item>
<Dropdown.Item key="R" eventKey="R">Rejected</Dropdown.Item>
</DropdownButton>
</InputGroup>

<Button variant="primary" type="submit">
View
</Button>

</Form>
            <Table striped bordered hover variant="dark" className = "text-center" style ={{marginTop:"20px"}}>
          <thead style ={{fontSize : "150%"}}>
            <tr>
              <th>{(this.state.statusWhenViewed).charAt(0).toUpperCase() + (this.state.statusWhenViewed).slice(1)} Requests</th>
            </tr>
          </thead>
          <tbody style ={{fontSize : "120%"}}>
          {this.state.requests}
          </tbody>
        </Table>
            </div>
        )
    }
}

export default ViewSentRequests
