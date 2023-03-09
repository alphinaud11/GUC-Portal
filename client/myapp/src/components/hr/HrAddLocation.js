import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from "react-router-dom"

export default class HrAddLocation extends Component {
    constructor(props) {
        super(props);
        this.onChangeLocationName = this.onChangeLocationName.bind(this)
        this.onChangeLocationType = this.onChangeLocationType.bind(this)
        this.onChangeCapacity = this.onChangeCapacity.bind(this)
        this.onChangeOccupiedPlaces = this.onChangeOccupiedPlaces.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            location_name: '',
            location_type: '',
            capacity: 0,
            occupiedPlaces: 0,
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
    onChangeLocationType(e) {
        this.setState({
            location_type: e.target.value
        })
    }
    onChangeCapacity(e) {
        this.setState({
            capacity: e.target.value
        })
    }
    onChangeOccupiedPlaces(e) {
        this.setState({
            occupiedPlaces: e.target.value
        })
    }
    onSubmit(e) {
        e.preventDefault();
        const location = {
            location_name: this.state.location_name,
            location_type: this.state.location_type,
            capacity: parseInt(this.state.capacity),
            occupiedPlaces: parseInt(this.state.occupiedPlaces)
        }
        console.log(location);

        axios.post('http://localhost:3000/hrAddLocation', location, {
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
                    <h1>Create New Location</h1>
                    <div className="form-group" >
                        <label>Location Name: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.location_name}
                            onChange={this.onChangeLocationName}
                        />
                        <label>Location Type: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.location_type}
                            onChange={this.onChangeLocationType}
                        />
                        <label>Capacity: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.capacity}
                            onChange={this.onChangeCapacity}
                        />
                        <label>Occupied Places: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.occupiedPlaces}
                            onChange={this.onChangeOccupiedPlaces}
                        />
                    </div>

                    <div className="form-group" >
                        <input type="submit" value="Create Location"
                            className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}