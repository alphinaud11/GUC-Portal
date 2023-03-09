import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from "react-router-dom"

export default class HrUpdateDepartment extends Component {
    constructor(props) {
        super(props);
        this.onChangeFacultyName = this.onChangeFacultyName.bind(this)
        this.onChangeDepartmentName = this.onChangeDepartmentName.bind(this)
        this.onChangeUpdatedDepartmentName = this.onChangeUpdatedDepartmentName.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            facultyName: '',
            departmentName:'',
            newdepartmentName: '',
            token: JSON.parse(localStorage.getItem("login")).token,
            isLoggedIn: JSON.parse(localStorage.getItem("login")).isLoggedIn,
            expired: false
        }
    }
    onChangeFacultyName(e) {
        this.setState({
            facultyName: e.target.value
        })
    }
    onChangeDepartmentName(e) {
        this.setState({
            departmentName: e.target.value
        })
    }
    onChangeUpdatedDepartmentName(e) {
        this.setState({
            newdepartmentName: e.target.value
        })
    }
    onSubmit(e) {
        e.preventDefault();
        const department = {
            facultyName: this.state.facultyName,
            departmentName: this.state.departmentName,
            newdepartmentName: this.state.newdepartmentName
        }
        //console.log(department);

        axios.put('http://localhost:3000/hrUpdateDepartment', department, {
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
                    <h1>Update Department</h1>
                    <div className="form-group">
                        <label>Faculty Name: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.facultyName}
                            onChange={this.onChangeFacultyName}
                        />
                        <label>Department Name: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.departmentName}
                            onChange={this.onChangeDepartmentName}
                        />
                        <label>New Department Name: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.newdepartmentName}
                            onChange={this.onChangeUpdatedDepartmentName}
                        />
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Update Department"
                            className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}