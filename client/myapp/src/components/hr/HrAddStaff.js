import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from "react-router-dom"

export default class HrAddStaff extends Component {
    constructor(props) {
        super(props);
        this.onChangeUsername = this.onChangeUsername.bind(this)
        this.onChangePassword = this.onChangePassword.bind(this)
        this.onChangeRole = this.onChangeRole.bind(this)
        this.onChangeDisplayName = this.onChangeDisplayName.bind(this)
        this.onChangeGender = this.onChangeGender.bind(this)
        this.onChangeFaculty = this.onChangeFaculty.bind(this)
        this.onChangeDepartment = this.onChangeDepartment.bind(this)
        this.onChangeOfficeLocation = this.onChangeOfficeLocation.bind(this)
        this.onChangeDayOff = this.onChangeDayOff.bind(this)
        this.onChangeSalary = this.onChangeSalary.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            username: '',
            password: '',
            role: '',
            gender: '',
            displayName: '',
            faculty: '',
            department: '',
            officeLocation: '',
            dayOff: '',
            salary: '',
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
    onChangePassword(e) {
        this.setState({
            password: e.target.value
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
    onChangeOfficeLocation(e) {
        this.setState({
            officeLocation: e.target.value
        })
    }
    onChangeDayOff(e) {
        this.setState({
            dayOff: e.target.value
        })
    }
    onChangeSalary(e) {
        this.setState({
            salary: e.target.value
        })
    }
    onSubmit(e) {
        e.preventDefault();
        const staff = {
            username: this.state.username,
            password: this.state.password,
            role: this.state.role,
            gender: this.state.gender,
            displayName: this.state.displayName,
            faculty: this.state.faculty,
            department: this.state.department,
            officeLocation: this.state.officeLocation,
            dayOff: this.state.dayOff,
            salary: parseInt(this.state.salary)
        }
        //console.log(staff);

        axios.post('http://localhost:3000/hrAddStaff', staff, {
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
                }else{
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
                    <h1>Create New Staff member</h1>
                    <div className="form-group">
                        <label>username: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                        />
                        <label>Password: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.password}
                            onChange={this.onChangePassword}
                        />
                        <label>Role: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.role}
                            onChange={this.onChangeRole}
                        />
                        <label>Gender: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.gender}
                            onChange={this.onChangeGender}
                        />
                        <label>Display Name: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.displayName}
                            onChange={this.onChangeDisplayName}
                        />
                        <label>Faculty Name: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.faculty}
                            onChange={this.onChangeFaculty}
                        />
                        <label>Department Name: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.department}
                            onChange={this.onChangeDepartment}
                        />
                        <label>Office Location: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.officeLocation}
                            onChange={this.onChangeOfficeLocation}
                        />
                        <label>DayOff: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.dayOff}
                            onChange={this.onChangeDayOff}
                        />
                        <label>Salary: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.salary}
                            onChange={this.onChangeSalary}
                        />
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Add Staff"
                            className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}