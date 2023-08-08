import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Frame from './pages/Frame/Frame.jsx';
import Login from './pages/Login/Login.jsx';
import './App.css';
import Recruitment_Submission from './pages/Recruitment/SubmissionPage/Recruitment_Submission.jsx';
import PreScreening_table from './pages/Recruitment/PreScreeningPage/PreScreening_table.jsx';
import PreScreening from './pages/Recruitment/PreScreeningPage/PreScreening.jsx';
import Recruitment_Dashboard from './pages/Recruitment/DashboardPage/Recruitment_Dashboard.jsx';
import Interview_table from './pages/Recruitment/InterviewPage/Interview_table.jsx';
import Profile from './pages/Profile/Profile.jsx';
import Interview_form from './pages/Recruitment/InterviewPage/Interview_form.jsx';
import Recruitment_Evaluation_Table from './pages/Recruitment/EvaluationPage/EvaluationTable.jsx';
import Evaluation_Page from './pages/Recruitment/EvaluationPage/EvaluationPage.jsx';
import Registration from './pages/Registration/Registration.jsx';
import Testing from './pages/Testing/Testing.jsx';
import UserManagementMinistry from './pages/UserManagement/userManagementMinistry/UserManagementMinistry.jsx';
import LeaderRetreat from './pages/Events/Camp/LeaderRetreat/LeaderRetreat.jsx';
import UserManagementPastoral from './pages/UserManagement/userManagementPastroal/UserManagementPastoral.jsx';
import CampPage from './pages/Events/Camp/CampPage/CampPage.jsx';
import ConferencePage from './pages/Events/Conference/ConferencePage/ConferencePage.jsx';
import EvangelismPage from './pages/Events/Evangelism/Evangelism/Evangelism.jsx';
import UserManagementDashboard from './pages/UserManagement/userManagementDashboard/userManagementDashboard.jsx';
import EducationDashboard from './pages/Education/EducationDashboard/EducationDashboard.jsx';
import EducationStudents from './pages/Education/EducationStudents/EducationStudents.jsx';
import SeatsPage from './pages/Ushering/SeatsPage';
import { FirebaseAppProvider } from 'reactfire';
import firebaseConfig from './firebase/config.js';
import { UsheringDashboard } from './pages/Ushering/UsheringDashboard.jsx';
import MyGroupDashboard from './pages/MyGroup/MyGroupDashboard/MyGroupDashboard.jsx';
import MyGroupMembers from './pages/MyGroup/MyGroupMember/MyGroupMembers.jsx';
import MyGroupAttendance from './pages/MyGroup/MyGroupAttandance/MyGroupAttendance.jsx';
import MyGroupPastoring from './pages/MyGroup/MyGroupPastoring/MyGroupPastoring.jsx';
import ServicesPage from './pages/Services/ServicesPage/ServicesPage.jsx';
import RoomBooking from './pages/Services/RoomBooking/RoomBooking.jsx';
import { hostURL } from './config.js';

function App() {
	console.log(hostURL);
	return (
		<>
			<FirebaseAppProvider firebaseConfig={firebaseConfig}>
				<Router>
					<Routes>
						<Route path="/login" element={<Login />} />
						<Route path="/" element={<Frame />}>
							<Route
								path="/recruitment_dashboard"
								element={<Recruitment_Dashboard />}
							/>
							<Route
								path="/recruitment_add_candidate"
								element={<Recruitment_Submission />}
							/>
							<Route
								path="/recruitment_pre_screening"
								element={<PreScreening_table />}
							/>
							<Route
								path="/recruitment_pre_screening/:RID"
								element={<PreScreening />}
							/>
							<Route
								path="/recruitment_interview"
								element={<Interview_table />}
							/>
							<Route
								path="/recruitment_interview/form/:RID/:partID"
								element={<Interview_form />}
							/>
							<Route
								path="/recruitment_evaluation"
								element={<Recruitment_Evaluation_Table />}
							/>
							<Route
								path="/recruitment_evaluation/form/:RID"
								element={<Evaluation_Page />}
							/>

							<Route
								path="/users/dashboard"
								element={<UserManagementDashboard />}
							/>
							<Route
								path="/users/ministry"
								element={<UserManagementMinistry />}
							/>
							<Route
								path="/users/pastoral"
								element={<UserManagementPastoral />}
							/>

							<Route path="/events/camp" element={<CampPage />} />
							<Route path="/events/conference" element={<ConferencePage />} />
							<Route path="/events/evangelism" element={<EvangelismPage />} />
							<Route
								path="/events/camp/leader_retreat"
								element={<LeaderRetreat />}
							/>

							<Route
								path="/education/dashboard"
								element={<EducationDashboard />}
							/>
							<Route
								path="/education/students"
								element={<EducationStudents />}
							/>

							<Route
								path="/ushering/dashboard"
								element={<UsheringDashboard />}
							/>
							<Route path="/ushering/seats" element={<SeatsPage />} />

							<Route path="/group/dashboard" element={<MyGroupDashboard />} />
							<Route path="/group/members" element={<MyGroupMembers />} />
							<Route path="/group/attendance" element={<MyGroupAttendance />} />
							<Route path="/group/pastoring" element={<MyGroupPastoring />} />

							<Route path="/services" element={<ServicesPage />} />
							<Route path="/services/room_booking" element={<RoomBooking />} />
						</Route>
						<Route path="/registration" element={<Registration />} />
						<Route path="/profile" element={<Profile />} />
						<Route path="/testing" element={<Testing />} />
						<Route path="*" element={<Login />} />
					</Routes>
				</Router>
			</FirebaseAppProvider>
		</>
	);
}

export default App;
