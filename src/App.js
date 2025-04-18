import {Routes, Route, Navigate, HashRouter, BrowserRouter} from 'react-router-dom';
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import DonePage from "./pages/DonePage";

import './App.css';
import {useState} from "react";
import {UserContext} from "./index";
import NonePage from "./pages/NonePage";
import SignUpPage from "./pages/SignUpPage";
import AdminPage from "./pages/AdminPage";
import TotalPage from "./pages/TotalPage";

function App() {

    const [ user, setUser ] = useState();
    const [ link, setLink ] = useState();

    return (
        <BrowserRouter basename='/images-quiz'>
            <UserContext.Provider value={{ user, setUser, link, setLink }}>
                <div className="main">
                    <Routes>
                        <Route path="/" element={<NonePage />} />
                        <Route path="/:lindId" element={<MainPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/signup" element={<SignUpPage />} />
                        <Route path="/done" element={<DonePage />} />
                        <Route path="/admin" element={<AdminPage />} />
                        <Route path="/total" element={<TotalPage />} />
                        <Route path="*" element={<Navigate to="/" />} />
                        {/*<Route path="/login" element={<LoginPage />} />*/}
                        {/*<Route path="/protocol/:uuid" element={<ProtocolPage/>} />*/}
                    </Routes>
                </div>
            </UserContext.Provider>
        </BrowserRouter>
    );
}

export default App;
