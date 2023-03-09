import "./App.css";
import Login from "./components/Login";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./components/Home";
import About from "./components/About"
import StaffProfile from "./components/staff/StaffProfile"
import Staff from "./components/staff/Staff"
import UpdateProfile from "./components/staff/UpdateProfile"
import ResetPassword from "./components/staff/ResetPassword"
import StaffSignIn from "./components/staff/StaffSignIn"
import StaffSignOut from "./components/staff/StaffSignOut"
import ViewMissingHours from "./components/staff/ViewMissingHours"
import ViewExtraHours from "./components/staff/ViewExtraHours"
import ViewAttendance from "./components/staff/ViewAttendance"
import ViewAttendanceByMonth from "./components/staff/ViewAttendanceByMonth"
import ViewMissingDays from "./components/staff/ViewMissingDays"
import Logout from "./components/staff/Logout"
import HR from "./components/hr/HR"
import HrAddLocation from "./components/hr/HrAddLocation";
import HrUpdateLocation from "./components/hr/HrUpdateLocation";
import HrDeleteLocation from "./components/hr/HrDeleteLocation";
import HrAddFaculty from "./components/hr/HrAddFaculty";
import HrUpdateFaculty from "./components/hr/HrUpdateFaculty";
import HrDeleteFaculty from "./components/hr/HrDeleteFaculty";
import HrAddDepartment from "./components/hr/HrAddDepartment";
import HrUpdateDepartment from "./components/hr/HrUpdateDepartment";
import HrDeleteDepartment from "./components/hr/HrDeleteDepartment";
import HrAddCourse from "./components/hr/HrAddCourse";
import HrUpdateCourse from "./components/hr/HrUpdateCourse";
import HrDeleteCourse from "./components/hr/HrDeleteCourse";
import HrAddStaff from "./components/hr/HrAddStaff";
import HrUpdateStaff from "./components/hr/HrUpdateStaff";
import HrDeleteStaff from "./components/hr/HrDeleteStaff";
import HrUpdateSalary from "./components/hr/HrUpdateSalary";
import HrAddMissingSignInOut from "./components/hr/HrAddMissingSignInOut";
import HrViewAttendance from "./components/hr/HrViewAttendance";
import HrViewMissingHoursDays from "./components/hr/HrViewMissingHoursDays";
import ViewCourseCoverage from "./components/instructor/ViewCourseCoverage"
import ViewSlotsAssignment from "./components/instructor/ViewSlotsAssignment"
import AssignToSlot from "./components/instructor/AssignToSlot"
import RemoveSlotAssignment from "./components/instructor/RemoveSlotAssignment"
import UpdateSlotAssignment from "./components/instructor/UpdateSlotAssignment"
import AssignCoordinator from "./components/instructor/AssignCoordinator"
import AssignAcademicMember from "./components/instructor/AssignAcademicMember"
import ViewStaffInCourse from "./components/instructor/ViewStaffInCourse"
import ViewStaffInDepartment from "./components/instructor/ViewStaffInDepartment"
import ViewSchedule from "./components/staff/ViewSchedule"
import SendReplacement from './components/staff/SendReplacement'
import ViewSentRequests from './components/staff/ViewSentRequests'
import ViewReceivedReplacement from './components/staff/ViewReceivedReplacement'
import SendSlotLinking from './components/staff/SendSlotLinking'
import SendChangeDayOff from './components/staff/SendChangeDayOff'
import SendLeaveRequest from './components/staff/SendLeaveRequest'
import ViewSlotLinkingRequests from './components/coordinator/ViewSlotLinkingRequests'
import ModifyCourseSlot from './components/coordinator/ModifyCourseSlot'
import ViewNotifications from './components/staff/ViewNotifications'
import AssignCourseInstructor from './components/hod/AssignCourseInstructor'
import DeleteCourseInstructor from './components/hod/DeleteCourseInstructor'
import UpdateCourseInstructor from './components/hod/UpdateCourseInstructor'
import ViewCoursesCoverageHOD from './components/hod/ViewCoursesCoverage'
import ViewDayOffAllStaff from './components/hod/ViewDayOffAllStaff'
import ViewDayOffRequests from './components/hod/ViewDayOffRequests'
import ViewDayOffSingleStaff from './components/hod/ViewDayOffSingleStaff'
import ViewLeaveRequests from './components/hod/ViewLeaveRequests'
import ViewStaffInHODDepartment from './components/hod/ViewStaffInDepartment'
import ViewTeachingAssignments from './components/hod/ViewTeachingAssignments'

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/about" exact component={About} />
          <Route path="/login" component={Login} />
          <Route path="/staff" exact component = {Staff} />
          <Route path="/staff/viewProfile" exact component = {StaffProfile} />
          <Route path="/staff/updateProfile" exact component = {UpdateProfile} />
          <Route path="/staff/resetPassword" exact component = {ResetPassword} />
          <Route path="/staff/signIn" exact component = {StaffSignIn} />
          <Route path="/staff/signOut" exact component = {StaffSignOut} />
          <Route path="/staff/viewMissingHours" exact component = {ViewMissingHours} />
          <Route path="/staff/viewExtraHours" exact component = {ViewExtraHours} />
          <Route path="/staff/viewAttendance" exact component = {ViewAttendance} />
          <Route path="/staff/viewMissingDays" exact component = {ViewMissingDays} />
          <Route path="/staff/viewAttendanceByMonth" exact component = {ViewAttendanceByMonth} />
          <Route path="/staff/logout" exact component = {Logout} />
          <Route path="/hr" exact component={HR} />
          <Route path="/hr/addLocation" exact component={HrAddLocation} />
          <Route path="/hr/updateLocation" exact component={HrUpdateLocation} />
          <Route path="/hr/deleteLocation" exact component={HrDeleteLocation} />
          <Route path="/hr/addFaculty" exact component={HrAddFaculty} />
          <Route path="/hr/updateFaculty" exact component={HrUpdateFaculty} />
          <Route path="/hr/deleteFaculty" exact component={HrDeleteFaculty} />
          <Route path="/hr/addDepartment" exact component={HrAddDepartment} />
          <Route path="/hr/updateDepartment" exact component={HrUpdateDepartment} />
          <Route path="/hr/deleteDepartment" exact component={HrDeleteDepartment} />
          <Route path="/hr/addCourse" exact component={HrAddCourse} />
          <Route path="/hr/updateCourse" exact component={HrUpdateCourse} />
          <Route path="/hr/deleteCourse" exact component={HrDeleteCourse} />
          <Route path="/hr/addStaff" exact component={HrAddStaff} />
          <Route path="/hr/updateStaff" exact component={HrUpdateStaff} />
          <Route path="/hr/deleteStaff" exact component={HrDeleteStaff} />
          <Route path="/hr/updateSalary" exact component={HrUpdateSalary} />
          <Route path="/hr/addSignInOut" exact component={HrAddMissingSignInOut} />
          <Route path="/hr/viewAttendance" exact component={HrViewAttendance} />
          <Route path="/hr/viewMissingHoursDays" exact component={HrViewMissingHoursDays} />
          <Route path="/staff/viewCourseCoverage" exact component = {ViewCourseCoverage} />
          <Route path="/staff/viewSlotsAssignment" exact component = {ViewSlotsAssignment} />
          <Route path="/staff/assignToSlot" exact component = {AssignToSlot} />
          <Route path="/staff/removeSlotAssignment" exact component = {RemoveSlotAssignment} />
          <Route path="/staff/updateSlotAssignment" exact component = {UpdateSlotAssignment} />
          <Route path="/staff/assignCoordinator" exact component = {AssignCoordinator} />
          <Route path="/staff/assignAcademicMember" exact component = {AssignAcademicMember} />
          <Route path="/staff/viewStaffInCourse" exact component = {ViewStaffInCourse} />
          <Route path="/staff/viewStaffInDepartment" exact component = {ViewStaffInDepartment} />
          <Route path="/staff/viewSchedule" exact component = {ViewSchedule} />
          <Route path="/staff/sendReplacement" exact component = {SendReplacement} />
          <Route path="/staff/viewSentRequests" exact component = {ViewSentRequests} />
          <Route path="/staff/viewReceivedReplacement" exact component = {ViewReceivedReplacement} />
          <Route path="/staff/sendSlotLinking" exact component = {SendSlotLinking} />
          <Route path="/staff/sendChangeDayOff" exact component = {SendChangeDayOff} />
          <Route path="/staff/sendLeaveRequest" exact component = {SendLeaveRequest} />
          <Route path="/staff/viewSlotLinkingRequests" exact component = {ViewSlotLinkingRequests} />
          <Route path="/staff/modifyCourseSlot" exact component = {ModifyCourseSlot} />
          <Route path="/staff/viewNotifications" exact component = {ViewNotifications} />
          <Route path="/staff/assignCourseInstructor" exact component = {AssignCourseInstructor} />
          <Route path="/staff/deleteCourseInstructor" exact component = {DeleteCourseInstructor} />
          <Route path="/staff/updateCourseInstructor" exact component = {UpdateCourseInstructor} />
          <Route path="/staff/viewCoursesCoverageHOD" exact component = {ViewCoursesCoverageHOD} />
          <Route path="/staff/viewDayOffAllStaff" exact component = {ViewDayOffAllStaff} />
          <Route path="/staff/viewDayOffRequests" exact component = {ViewDayOffRequests} />
          <Route path="/staff/viewDayOffSingleStaff" exact component = {ViewDayOffSingleStaff} />
          <Route path="/staff/viewLeaveRequests" exact component = {ViewLeaveRequests} />
          <Route path="/staff/viewStaffInHODDepartment" exact component = {ViewStaffInHODDepartment} />
          <Route path="/staff/viewTeachingAssignments" exact component = {ViewTeachingAssignments} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
