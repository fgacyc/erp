import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Frame from "./components/Frame/Frame.jsx";
import Login from "./pages/Login/Login.jsx";
import "./App.css";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login/>} />
                <Route path="/" element={<Frame/>} />
                <Route path="/dashboard" element={<Frame/>} />
                <Route path="/members" element={<Frame/>} />
                <Route path="/attendance" element={<Frame/>} />
                <Route path="/recruitment_add_recruiter" element={<Frame/>} />
            </Routes>
        </Router>
    )
}

export default App
