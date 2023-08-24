import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Frame from './pages/Frame/Frame';
import Login from './pages/Login/Login';
import './App.css';
import Recruitment_Submission from './pages/Recruitment/SubmissionPage/Recruitment_Submission';
import PreScreening_table from './pages/Recruitment/PreScreeningPage/PreScreening_table';
import PreScreening from './pages/Recruitment/PreScreeningPage/PreScreening';
import Recruitment_Dashboard from './pages/Recruitment/DashboardPage/Recruitment_Dashboard';
import Interview_table from './pages/Recruitment/InterviewPage/Interview_table';
import Profile from './pages/Profile/Profile';
import InterviewForm from './pages/Recruitment/InterviewPage/Interview_form';
import Recruitment_Evaluation_Table from './pages/Recruitment/EvaluationPage/EvaluationTable';
import Evaluation_Page from './pages/Recruitment/EvaluationPage/EvaluationPage';
import Registration from './pages/Registration/Registration';
// import Testing from './pages/Testing/Testing';
import UserManagementMinistry from './pages/UserManagement/userManagementMinistry/UserManagementMinistry';
import LeaderRetreat from './pages/Events/Camp/LeaderRetreat/LeaderRetreat';
import UserManagementPastoral from './pages/UserManagement/userManagementPastroal/UserManagementPastoral';
import CampPage from './pages/Events/Camp/CampPage/CampPage';
import ConferencePage from './pages/Events/Conference/ConferencePage/ConferencePage';
import EvangelismPage from './pages/Events/Evangelism/Evangelism/Evangelism';
import UserManagementDashboard from './pages/UserManagement/userManagementDashboard/userManagementDashboard';
import EducationDashboard from './pages/Education/EducationDashboard/EducationDashboard';
import EducationStudents from './pages/Education/EducationStudents/EducationStudents';
import EducationVideos from './pages/Education/EducationVideos/EducationVideos';

import SeatsPage from './pages/Ushering/SeatsPage/index';
import { FirebaseAppProvider } from 'reactfire';
import firebaseConfig from './firebase/config';
import { UsheringDashboard } from './pages/Ushering/UsheringDashboard';
import MyGroupDashboard from './pages/MyGroup/MyGroupDashboard/MyGroupDashboard';
import MyGroupMembers from './pages/MyGroup/MyGroupMember/MyGroupMembers';
import MyGroupAttendance from './pages/MyGroup/MyGroupAttandance/MyGroupAttendance';
import MyGroupPastoring from './pages/MyGroup/MyGroupPastoring/MyGroupPastoring';
import ServicesPage from './pages/Services/ServicesPage/ServicesPage';
import RoomBooking from './pages/Services/RoomBooking/RoomBooking';

function App() {
	return (
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
							element={<InterviewForm />}
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
						<Route path="/education/students" element={<EducationStudents />} />
						<Route path="/education/videos" element={<EducationVideos />} />

						<Route path="/ushering/dashboard" element={<UsheringDashboard />} />
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
					{/* <Route path="/testing" element={<Testing />} /> */}
					<Route path="*" element={<Login />} />
				</Routes>
			</Router>
		</FirebaseAppProvider>
	);
}

export default App;
