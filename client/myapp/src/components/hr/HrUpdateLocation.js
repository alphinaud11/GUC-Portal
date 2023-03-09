import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from "react-router-dom"

export default class HrUpdateLocation extends Component {
    constructor(props) {
        super(props);
        this.onChangeLocationName = this.onChangeLocationName.bind(this);
        this.onChangeUpdatedLocationName = this.onChangeUpdatedLocationName.bind(this);
        this.onChangeUpdatedLocationType = this.onChangeUpdatedLocationType.bind(this);
        this.onChangeUpdatedCapacity = this.onChangeUpdatedCapacity.bind(this);
        this.onChangeUpdatedOccupiedPlaces = this.onChangeUpdatedOccupiedPlaces.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            location_name: '',
            updatedLocation_name: '',
            updatedLocation_type: '',
            updatedCapacity: 0,
            updatedOccupiedPlaces: 0,
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

    onChangeUpdatedLocationName(e) {
        this.setState({
            updatedLocation_name: e.target.value
        })
    }

    onChangeUpdatedLocationType(e) {
        this.setState({
            updatedLocation_type: e.target.value
        })
    }
    onChangeUpdatedCapacity(e) {
        this.setState({
            updatedCapacity: e.target.value
        })
    }
    onChangeUpdatedOccupiedPlaces(e) {
        this.setState({
            updatedOccupiedPlaces: e.target.value
        })
    }
    onSubmit(e) {
        e.preventDefault();
        const location = {
            location_name: this.state.location_name,
            updatedLocation_name: this.state.updatedLocation_name,
            updatedLocation_type: this.state.updatedLocation_type,
            updatedCapacity: parseInt(this.state.updatedCapacity),
            updatedOccupiedPlaces: parseInt(this.state.updatedOccupiedPlaces)
        }
        console.log(location);

        axios.put('http://localhost:3000/hrUpdateLocation', location, {
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
                    <h1>Update Location</h1>
                    <div className="form-group">
                        <label>Old Location Name: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.location_name}
                            onChange={this.onChangeLocationName}
                        />
                        <label>New/Current Location Name: </label>
                        <input type="text"
                            //required
                            className="form-control"
                            value={this.state.updatedLocation_name}
                            onChange={this.onChangeUpdatedLocationName}
                        />
                        <label>New/Current Location Type: </label>
                        <input type="text"
                            //required
                            className="form-control"
                            value={this.state.updatedLocation_type}
                            onChange={this.onChangeUpdatedLocationType}
                        />
                        <label>New/Current Capacity: </label>
                        <input type="text"
                            //required
                            className="form-control"
                            value={this.state.updatedCapacity}
                            onChange={this.onChangeUpdatedCapacity}
                        />
                        <label>New/Current number of Occupied Places: </label>
                        <input type="text"
                            //required
                            className="form-control"
                            value={this.state.updatedOccupiedPlaces}
                            onChange={this.onChangeUpdatedOccupiedPlaces}
                        />
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Update Location"
                            className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}