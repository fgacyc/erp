import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Frame from "./pages/Frame/Frame.jsx";
import Login from "./pages/Login/Login.jsx";
import "./App.css";
import Recruitment_Submission from "./pages/Recruitment/SubmissionPage/Recruitment_Submission.jsx";
import PreScreening_table from "./pages/Recruitment/PreScreeningPage/PreScreening_table.jsx";
import PreScreening from "./pages/Recruitment/PreScreeningPage/PreScreening.jsx";
import Recruitment_Dashboard from "./pages/Recruitment/DashboardPage/Recruitment_Dashboard.jsx";
import Recruitment_Appointment from "./pages/Recruitment/Appointment/Recruitment_Appointment.jsx";
import Profile from "./pages/Profile/Profile.jsx";

function App() {



    return (
        <>
             <Router>
                    <Routes>
                        <Route path="/login" element={<Login/>} />
                        <Route path="/" element={<Frame/>} >
                            <Route path="/recruitment_dashboard" element={<Recruitment_Dashboard/>} />
                            <Route path="/recruitment_add_candidate" element={<Recruitment_Submission/>} />
                            <Route path="/recruitment_pre_screening" element={<PreScreening_table/>} />
                            <Route path="/recruitment_pre_screening/:RID" element={<PreScreening/>} />
                            <Route path="/recruitment_pre_appointment" element={<Recruitment_Appointment/>} />
                        </Route>
                        <Route path="/profile" element={<Profile/>} />
                        <Route path="*" element={<Login/>} />
                    </Routes>
            </Router>
        </>

    )
}

export default App
