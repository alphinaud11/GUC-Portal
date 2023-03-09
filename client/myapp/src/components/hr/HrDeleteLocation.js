import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from "react-router-dom"

export default class HrDeleteLocation extends Component {
    constructor(props) {
        super(props);
        this.onChangeLocationName = this.onChangeLocationName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            location_name: '',
            token: JSON.parse(localStorage.getItem("login")).token,
            isLoggedIn: JSON.parse(localStorage.getItem("login")).isLoggedIn,
            expired: false
        }
    }
    onChangeLocationName(e) {
        this.setState({
            location_name: e.target.value
        })
    }
    onSubmit(e) {
        e.preventDefault();
        const location = {
            location_name: this.state.location_name,
        }
        console.log(location);

        axios.post('http://localhost:3000/hrDeleteLocation', location, {
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
                        <h1>Delete Location</h1>
                        <div className="form-group">
                            <label>Location Name: </label>
                            <input type="text"
                                required
                                className="form-control"
                                value={this.state.location_name}
                                onChange={this.onChangeLocationName}
                            />
                        </div>

                        <div className="form-group">
                            <input type="submit" value="Delete Location"
                                className="btn btn-primary" />
                        </div>
                    </form>
                </div>
            )
    }
}