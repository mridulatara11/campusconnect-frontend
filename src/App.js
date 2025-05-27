import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Student from './components/student';
import ClubHead from './components/clubhead';
import Admin from './components/admin';
import Sidebar from './components/Sidebar';
import ClubPage from './pages/Clubpage';
import Board from './pages/Board';
import './App.css'; // Make sure you add the layout styles here

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes without Sidebar */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Private Routes with Sidebar */}
        <Route path="*" element={
          <div className="app-layout">
            <Sidebar />
            <div className="main-content">
              <Routes>
                <Route path="/student" element={<Student />} />
                <Route path="/clubhead" element={<ClubHead />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/club/:id" element={<ClubPage />} />
                <Route path="/board" element={<Board />} />
              </Routes>
            </div>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;
