import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from "react-router-dom";

export default class HrUpdateStaff extends Component {
    constructor(props) {
        super(props);
        this.onChangeUsername = this.onChangeUsername.bind(this)
        this.onChangeRole = this.onChangeRole.bind(this)
        this.onChangeDisplayName = this.onChangeDisplayName.bind(this)
        this.onChangeGender = this.onChangeGender.bind(this)
        this.onChangeFaculty = this.onChangeFaculty.bind(this)
        this.onChangeDepartment = this.onChangeDepartment.bind(this)
        this.onChangeNewOfficeLocation = this.onChangeNewOfficeLocation.bind(this)
        this.onChangeOldOffice = this.onChangeOldOffice.bind(this)
        this.onChangeDayOff = this.onChangeDayOff.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            username: '',
            role: '',
            gender: '',
            displayName: '',
            faculty: '',
            department: '',
            office: '',
            oldOffice: '',
            dayOff: '',
            token: JSON.parse(localStorage.getItem("login")).token,
            isLoggedIn: JSON.parse(localStorage.getItem("login")).isLoggedIn,
            expired: false
        }
    }
    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        })
    }
    onChangeRole(e) {
        this.setState({
            role: e.target.value
        })
    }
    onChangeGender(e) {
        this.setState({
            gender: e.target.value
        })
    }
    onChangeDisplayName(e) {
        this.setState({
            displayName: e.target.value
        })
    }
    onChangeFaculty(e) {
        this.setState({
            faculty: e.target.value
        })
    }
    onChangeDepartment(e) {
        this.setState({
            department: e.target.value
        })
    }
    onChangeOldOffice(e) {
        this.setState({
            oldOffice: e.target.value
        })
    }
    onChangeNewOfficeLocation(e) {
        this.setState({
            office: e.target.value
        })
    }
    onChangeDayOff(e) {
        this.setState({
            dayOff: e.target.value
        })
    }
    onSubmit(e) {
        e.preventDefault();
        const staff = {
            username: this.state.username,
            role: this.state.role,
            gender: this.state.gender,
            displayName: this.state.displayName,
            faculty: this.state.faculty,
            department: this.state.department,
            oldOffice: this.state.oldOffice,
            office: this.state.office,
            dayOff: this.state.dayOff
        }
        console.log(staff);

        axios.put('http://localhost:3000/hrUpdateStaff', staff, {
            headers: { "auth-token": this.state.token }
        })
            .then((res) => {
                alert(res.data)
            })
            .catch((err) => {
                console.log(err.response.data)
                if (err.response.data === "Invalid Token") {
                    alert("Your credentials are expired, login again")
                    this.setState({
                        expired: true,
                    })
                } else {
                    alert(err.response.data);
                }
            })
        //window.location = '/';
    }

    render() {
        return this.state.expired === true ? (
            <Redirect to="/login" />
        ) : (
            <div>
                <form onSubmit={this.onSubmit} style={{ marginTop: "10%", width: "60%", marginLeft: "20%" }}>
                    <h1>Update a Staff member</h1>
                    <div className="form-group">
                        <label>username: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                        />
                        
                        <label>New/Current Role: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.role}
                            onChange={this.onChangeRole}
                        />
                        <label>New/Current Gender: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.gender}
                            onChange={this.onChangeGender}
                        />
                        <label>New/Current Display Name: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.displayName}
                            onChange={this.onChangeDisplayName}
                        />
                        <label>New/Current Faculty Name: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.faculty}
                            onChange={this.onChangeFaculty}
                        />
                        <label>New/Current Department Name: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.department}
                            onChange={this.onChangeDepartment}
                        />
                        <label>Current Office Location: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.oldOffice}
                            onChange={this.onChangeOldOffice}
                        />
                        <label>New/Cuurent Office Location: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.office}
                            onChange={this.onChangeNewOfficeLocation}
                        />
                        <label>New/same DayOff: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.dayOff}
                            onChange={this.onChangeDayOff}
                        />
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Update Staff"
                            className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}