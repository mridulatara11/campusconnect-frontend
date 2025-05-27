
import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear(); // Poof! Be gone.
    navigate('/'); // Back to login
  };

  return (
    <button
      onClick={handleLogout}
      style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        backgroundColor: '#0c2d57',
        color: 'white',
        border: 'none',
        padding: '10px 15px',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: 'bold'
      }}
    >
      Logout 🚪
    </button>
  );
};

export default LogoutButton;
