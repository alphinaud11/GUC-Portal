import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from "react-router-dom"

export default class HrDeleteStaff extends Component {
    constructor(props) {
        super(props);
        this.onChangeUserName = this.onChangeUserName.bind(this);
        this.onChangeOfficeName = this.onChangeOfficeName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            officeName: '',
            token: JSON.parse(localStorage.getItem("login")).token,
            isLoggedIn: JSON.parse(localStorage.getItem("login")).isLoggedIn,
            expired: false,
        }
    }
    onChangeUserName(e) {
        this.setState({
            username: e.target.value
        })
    }
    onChangeOfficeName(e) {
        this.setState({
            officeName: e.target.value
        })
    }
    onSubmit(e) {
        e.preventDefault();
        const staff = {
            username: this.state.username,
            officeName: this.state.officeName
        }
        axios.post('http://localhost:3000/hrDeleteStaff', staff, {
            headers: { "auth-token": this.state.token }
        })
            .then((res) => {
                alert(res.data)})
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
                    <h1>Delete Staff Member</h1>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUserName}
                        />
                        <label>Office: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.officeName}
                            onChange={this.onChangeOfficeName}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Delete Staff"
                            className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}