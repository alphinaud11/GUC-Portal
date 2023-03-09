import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from "react-router-dom"

export default class HrAddMissingSignInOut extends Component {
    constructor(props) {
        super(props);
        this.onChangeUserName = this.onChangeUserName.bind(this);
        this.onChangeSignIn = this.onChangeSignIn.bind(this);
        this.onChangeSignOut = this.onChangeSignOut.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            staffUsername: '',
            signIn: '',
            signOut: '',
            token: JSON.parse(localStorage.getItem("login")).token,
            isLoggedIn: JSON.parse(localStorage.getItem("login")).isLoggedIn,
            expired: false
        }
    }
    onChangeUserName(e) {
        this.setState({
            staffUsername: e.target.value
        })
    }
    onChangeSignIn(e) {
        this.setState({
            signIn: e.target.value
        })
    }
    onChangeSignOut(e) {
        this.setState({
            signOut: e.target.value
        })
    }
    onSubmit(e) {
        e.preventDefault();
        const info = {
            staffUsername: this.state.staffUsername,
            signIn: this.state.signIn,
            signOut: this.state.signOut
        }
        axios.post('http://localhost:3000/hrAddSignInSignOut', info, {
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
        //console.log(info)
    }

    render() {
        return this.state.expired === true ? (
            <Redirect to="/login" />
        ) : (
            <div>
                <form onSubmit={this.onSubmit} style={{ marginTop: "10%", width: "60%", marginLeft: "20%" }}>
                    <h1>Add Missing SignIn/Out</h1>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.StaffUsername}
                            onChange={this.onChangeUserName}
                        />
                        <label>Missing SignIn: </label><br></br>
                        <label>Date Example: December 29, 2020 6:00:00 </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.signIn}
                            onChange={this.onChangeSignIn}
                        />
                        <label>Missing SignOut: </label><br></br>
                        <label>Date Example: December 29, 2020 6:00:00 </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.signOut}
                            onChange={this.onChangeSignOut}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Add"
                            className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}