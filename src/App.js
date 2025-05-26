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

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes without Sidebar */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Private Routes with Sidebar */}
        <Route path="*" element={
          <div style={{ display: 'flex' }}>
            <Sidebar />
            <div style={{ marginLeft: '220px', padding: '20px', width: '100%' }}>
              <Routes>
                <Route path="/student" element={<Student />} />
                <Route path="/clubhead" element={<ClubHead />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/club/:id" element={<ClubPage />} />
                <Route path="/Board" element={<Board />} />
              </Routes>
            </div>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;
