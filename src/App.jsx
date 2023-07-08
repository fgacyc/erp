import {BrowserRouter as Router, Routes, Route, useNavigate} from 'react-router-dom';
import Frame from "./components/Frame/Frame.jsx";
import Login from "./components/Login/Login.jsx";
import "./App.css";
import Discussion from "./components/Discussion/Discussion.jsx";
import { useEffect } from 'react';

function App() {



    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Frame />} />
                <Route path="/dashboard" element={<Frame />} />
                <Route path="/members" element={<Frame />} />
                <Route path="/attendance" element={<Frame />} />
                <Route path="/discussion" element={<Discussion />} />
                {/*<Route path="/signUp" element={<SignUp/>} />*/}
                {/*<Route path="/home/search" element={<Home/>} />*/}
                {/*<Route path="/home" element={<Home/>} />*/}
                {/*<Route path="/room" element={<Room/>} />*/}
                {/*<Route path="/room/:roomID" element={<Room/>} />*/}
                {/*<Route path="/post" element={<Post/>} />*/}
                {/*<Route path="/profile" element={<Profile/>} />*/}
                {/*<Route path="/about" element={<About/>} />*/}
                {/*<Route path="/modify/:roomID" element={<Post/>} />*/}
                {/*<Route path="/modify" element={<Post/>} />*/}
                {/*<Route path="/Terms-and-Privacy" element={<Privacy />} />*/}
                {/*<Route path="/error-404" element={<Error404 />} />*/}
                {/*<Route path="/" element={<Landing />} />*/}
                {/*<Route path="*" element={<Error404 />} />*/}
            </Routes>
        </Router>
    )
}

export default App
