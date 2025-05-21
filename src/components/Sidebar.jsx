import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Sidebar = () => {
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/clubs')
      .then(res => setClubs(res.data))
      .catch(err => console.error('Error loading clubs:', err));
  }, []);

  const userRole = localStorage.getItem('role');

  const getDashboardRoute = () => {
    if (userRole === 'student') return '/student';
    if (userRole === 'clubHead') return '/clubhead';
    if (userRole === 'admin') return '/admin';
    return '/';
  };

  const getLogoSrc = (logo_url) => {
    try {
      if (!logo_url) throw new Error('Missing logo_url');
      return require(`../assets/${logo_url}`);
    } catch (err) {
      console.warn(`Logo not found for ${logo_url}, using fallback.`);
      return require(`../assets/default.png`);
    }
  };

  return (
    <div style={{
      width: '220px',
      height: '100vh',
      backgroundColor: '#f1f1f1',
      padding: '20px',
      overflowY: 'auto',
      boxShadow: '2px 0 5px rgba(0,0,0,0.1)'
    }}>
      <h3 style={{ marginBottom: '20px' }}>Clubs</h3>

      <Link
        to={getDashboardRoute()}
        style={{
          display: 'block',
          margin: '10px 0 20px 0',
          fontWeight: 'bold',
          color: '#333',
          textDecoration: 'none'
        }}
      >
        ← Back to Dashboard
      </Link>

      {clubs.map((club) => (
        <Link
          to={`/club/${club.id}`}
          key={club.id}
          style={{
            textDecoration: 'none',
            color: '#333',
            display: 'flex',
            alignItems: 'center',
            marginBottom: '15px',
            padding: '5px',
            borderRadius: '5px',
            transition: 'background 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = '#e0e0e0'}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          <img
            src={getLogoSrc(club.logo_url)}
            alt={club.name}
            style={{
              width: '30px',
              height: '30px',
              marginRight: '10px',
              borderRadius: '50%',
              objectFit: 'cover'
            }}
          />
          {club.name}
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
