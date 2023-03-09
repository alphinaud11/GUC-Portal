import React, { Component } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import "../styles/staff.css"
import axios from "axios";

class Staff extends Component {
  constructor(){
    super()
    this.state = {
      role : JSON.parse(localStorage.getItem("login")).role,
      token : JSON.parse(localStorage.getItem("login")).token,
      isLoggedIn : JSON.parse(localStorage.getItem("login")).isLoggedIn,
      variant : "dark" 
    }
  }

  componentDidMount() {
    axios
    .get("http://localhost:3000/getNotificationCount", {
    headers: { "auth-token": this.state.token },
  })
  .then((response) => {
    let variant = "dark";
    if (response.data !== 0) {
      variant = "success";
    }
    this.setState({
        isLoading: false,
        variant: variant
      });
})
.catch((err) => {
    if (err.response.data === "Invalid Token") {
        alert("Your credentials are expired, login again")
        this.setState({
          expired: true
        });
      }
});
}

  render() {
    //console.log(this.state.token)
    //console.log(this.state.role)
    //console.log(this.state.isLoggedIn)
    return (
      <ListGroup className = "listGroup">
      <ListGroup.Item action href="/staff/viewNotifications" variant={this.state.variant} >View Notifications</ListGroup.Item>
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
          View Attendance
        </ListGroup.Item>
        <ListGroup.Item action href="/staff/viewAttendanceByMonth" variant="dark">
        View Attendance By Month
        </ListGroup.Item>
        <ListGroup.Item action href="/staff/viewMissingDays" variant="dark">
          View Missing days
        </ListGroup.Item>
        <ListGroup.Item action href="/staff/viewMissingHours" variant="dark">
          View Missing Hours
        </ListGroup.Item>
        <ListGroup.Item action href="/staff/viewExtraHours" variant="dark">
          View Extra Hours
        </ListGroup.Item>
        <ListGroup.Item action href="/staff/viewSchedule" variant="dark">
          View Schedule
        </ListGroup.Item>
        <ListGroup.Item action href="/staff/sendReplacement" variant="dark">
          Send Replacement Request
        </ListGroup.Item>
        <ListGroup.Item action href="/staff/viewSentRequests" variant="dark">
          View Sent Requests
        </ListGroup.Item>
        <ListGroup.Item action href="/staff/viewReceivedReplacement" variant="dark">
          View Received Replacement Requests
        </ListGroup.Item>
        <ListGroup.Item action href="/staff/sendSlotLinking" variant="dark">
          Send Slot Linking Request
        </ListGroup.Item>
        <ListGroup.Item action href="/staff/sendChangeDayOff" variant="dark">
          Send Change Day Off Request
        </ListGroup.Item>
        <ListGroup.Item action href="/staff/sendLeaveRequest" variant="dark">
          Send Leave Request
        </ListGroup.Item>
        
        {this.state.role === "CI" ? ([
        <ListGroup.Item action href="/staff/viewCourseCoverage" variant="dark">View Course Coverage</ListGroup.Item>,
        <ListGroup.Item action href="/staff/viewSlotsAssignment" variant="dark">View Slots Assignment</ListGroup.Item>,
        <ListGroup.Item action href="/staff/assignToSlot" variant="dark">Assign to Unassigned Slots</ListGroup.Item>,
        <ListGroup.Item action href="/staff/removeSlotAssignment" variant="dark">Remove Slot Assignment</ListGroup.Item>,
        <ListGroup.Item action href="/staff/updateSlotAssignment" variant="dark">Update Slot Assignment</ListGroup.Item>,
        <ListGroup.Item action href="/staff/assignCoordinator" variant="dark">Assign Coordinator</ListGroup.Item>,
        <ListGroup.Item action href="/staff/assignAcademicMember" variant="dark">Assign Academic Member</ListGroup.Item>,
        <ListGroup.Item action href="/staff/viewStaffInCourse" variant="dark">View Staff in Course</ListGroup.Item>,
        <ListGroup.Item action href="/staff/viewStaffInDepartment" variant="dark">View Staff in Department</ListGroup.Item>
        ]) : ""}

        {this.state.role === "CC" ? ([<ListGroup.Item action href="/staff/viewSlotLinkingRequests" variant="dark">
          View Received Slot Linking Requests
        </ListGroup.Item>, <ListGroup.Item action href="/staff/modifyCourseSlot" variant="dark">
          Add / Update / Delete Course Slot
        </ListGroup.Item>]) : ("")}

        {this.state.role === "HOD"?([
        <ListGroup.Item action href="/staff/assignCourseInstructor" variant="dark">Assign Course Instructor</ListGroup.Item>,
        <ListGroup.Item action href="/staff/deleteCourseInstructor" variant="dark">Delete Course Instructor</ListGroup.Item>,
        <ListGroup.Item action href="/staff/updateCourseInstructor" variant="dark">Update Course Instructor</ListGroup.Item>,
        <ListGroup.Item action href="/staff/viewCoursesCoverageHOD" variant="dark">View Course Coverage</ListGroup.Item>,
        <ListGroup.Item action href="/staff/viewDayOffAllStaff" variant="dark">View Day Off All Staff</ListGroup.Item>,
        <ListGroup.Item action href="/staff/viewDayOffRequests" variant="dark">View Day Off Requests</ListGroup.Item>,
        <ListGroup.Item action href="/staff/viewDayOffSingleStaff" variant="dark">View Day Off Single Staff</ListGroup.Item>,
        <ListGroup.Item action href="/staff/viewLeaveRequests" variant="dark">View Leave Requests</ListGroup.Item>,
        <ListGroup.Item action href="/staff/viewStaffInHODDepartment" variant="dark">View Staff In Department</ListGroup.Item>,
        <ListGroup.Item action href="/staff/viewTeachingAssignments" variant="dark">View Teaching Assignments</ListGroup.Item>
        ]):""}

        <ListGroup.Item action href="/staff/logout" variant="danger">
          Logout
        </ListGroup.Item>
      </ListGroup>
    );
  }
}

export default Staff;
