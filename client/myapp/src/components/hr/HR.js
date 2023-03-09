import React, { Component } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import "../styles/staff.css"

class HR extends Component {
    constructor() {
        super()
        this.state = {
            role: JSON.parse(localStorage.getItem("login")).role,
            token: JSON.parse(localStorage.getItem("login")).token,
            isLoggedIn: JSON.parse(localStorage.getItem("login")).isLoggedIn
        }
    }
    render() {
        //console.log(localStorage.getItem("login"))
        return (
            <ListGroup className="listGroup">
                <ListGroup.Item action href="/staff/viewProfile" variant="dark" >View profile</ListGroup.Item>
                <ListGroup.Item action href="/staff/updateProfile" variant="dark">Update profile</ListGroup.Item>
                <ListGroup.Item action href="/staff/resetPassword" variant="dark">
                    Reset password
        </ListGroup.Item>
                <ListGroup.Item action href="/staff/signIn" variant="dark">
                    Sign In to Campus
        </ListGroup.Item>
                <ListGroup.Item action href="/staff/signOut" variant="dark">
                    Sign Out from Campus
        </ListGroup.Item>
                <ListGroup.Item action href="/staff/viewAttendance" variant="dark">
                    View your Attendance
        </ListGroup.Item>
                <ListGroup.Item action href="/staff/viewAttendanceByMonth" variant="dark">
                    View your Attendance By Month
        </ListGroup.Item>
                <ListGroup.Item action href="/staff/viewMissingDays" variant="dark">
                    View your Missing days
        </ListGroup.Item>
                <ListGroup.Item action href="/staff/viewMissingHours" variant="dark">
                    View your Missing Hours
        </ListGroup.Item>
                <ListGroup.Item action href="/staff/viewExtraHours" variant="dark">
                    View your Extra Hours
        </ListGroup.Item>
                <ListGroup.Item action href="/hr/addLocation" variant="dark">
                    Add Locations
        </ListGroup.Item>
                <ListGroup.Item action href="/hr/updateLocation" variant="dark">
                    Update Locations
        </ListGroup.Item>
                <ListGroup.Item action href="/hr/deleteLocation" variant="dark">
                    Delete Locations
        </ListGroup.Item>
                <ListGroup.Item action href="/hr/addFaculty" variant="dark">
                    Add Faculties
        </ListGroup.Item>
                <ListGroup.Item action href="/hr/updateFaculty" variant="dark">
                    Update Faculties
        </ListGroup.Item>
                <ListGroup.Item action href="/hr/deleteFaculty" variant="dark">
                    Delete Faculties
        </ListGroup.Item>
                <ListGroup.Item action href="/hr/addDepartment" variant="dark">
                    Add Department
        </ListGroup.Item>
                <ListGroup.Item action href="/hr/updateDepartment" variant="dark">
                    Update Department
        </ListGroup.Item>
                <ListGroup.Item action href="/hr/deleteDepartment" variant="dark">
                    Delete Department
        </ListGroup.Item>
                <ListGroup.Item action href="/hr/addCourse" variant="dark">
                    Add Courses
        </ListGroup.Item>
                <ListGroup.Item action href="/hr/updateCourse" variant="dark">
                    Update Courses
        </ListGroup.Item>
                <ListGroup.Item action href="/hr/deleteCourse" variant="dark">
                    Delete Courses
        </ListGroup.Item>
                <ListGroup.Item action href="/hr/addStaff" variant="dark">
                    Add Staff
        </ListGroup.Item>
                <ListGroup.Item action href="/hr/updateStaff" variant="dark">
                    Update Staff
        </ListGroup.Item>
                <ListGroup.Item action href="/hr/deleteStaff" variant="dark">
                    Delete Staff
        </ListGroup.Item>
                <ListGroup.Item action href="/hr/updateSalary" variant="dark">
                    Update Staff Salary
        </ListGroup.Item>
                <ListGroup.Item action href="/hr/viewAttendance" variant="dark">
                    View Staff Attendance
        </ListGroup.Item>
                <ListGroup.Item action href="/hr/viewMissingHoursDays" variant="dark">
                    View Staff with MissingHours &
                    MissingDays
        </ListGroup.Item>
                <ListGroup.Item action href="/hr/addSignInOut" variant="dark">
                    Add Missing SignIn/Out to Staff
        </ListGroup.Item>
        <ListGroup.Item action href="/staff/logout" variant="danger">
                    Logout
        </ListGroup.Item>
            </ListGroup>
        );
    }
}

export default HR;
