import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from "react-router-dom"

export default class HrUpdateFaculty extends Component {
    constructor(props) {
        super(props);
        this.onChangeFacultyName = this.onChangeFacultyName.bind(this)
        this.onChangeUpdatedFacultyName = this.onChangeUpdatedFacultyName.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            facultyName: '',
            updatedName: '',
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
    onChangeUpdatedFacultyName(e) {
        this.setState({
            updatedName: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();
        const faculty = {
            facultyName: this.state.facultyName,
            updatedName: this.state.updatedName
        }
        //console.log(faculty);

        axios.put('http://localhost:3000/hrUpdateFaculty', faculty, {
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
                    <h1>Update Faculty</h1>
                    <div className="form-group">
                        <label>Faculty Name: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.facultyName}
                            onChange={this.onChangeFacultyName}
                        />
                        <label>New Faculty Name: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.updatedName}
                            onChange={this.onChangeUpdatedFacultyName}
                        />
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Update Faculty"
                            className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}