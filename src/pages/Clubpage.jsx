import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ClubPage = () => {
  const { id } = useParams();
  const [club, setClub] = useState(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/clubs/${id}`)
      .then(res => setClub(res.data))
      .catch(err => console.error('Failed to load club:', err));

    axios.get(`http://localhost:5000/api/clubs/${id}/events`)
      .then(res => setEvents(res.data))
      .catch(err => console.error('Failed to load events:', err));
  }, [id]);

  if (!club) return <p>Loading club info...</p>;

  // Safely load logo with fallback
  let logoSrc;
  try {
    logoSrc = require(`../assets/${club.logo_url || 'default.png'}`);
  } catch {
    logoSrc = require(`../assets/default.png`);
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Segoe UI' }}>
      <h2>{club.name}</h2>
      <img 
        src={logoSrc} 
        alt={club.name}
        style={{ width: '100px', marginBottom: '20px', borderRadius: '10px' }}
      />
      <p>{club.description || 'No description available for this club.'}</p>

      <h3 style={{ marginTop: '40px' }}>📅 Events</h3>
      {events.length === 0 ? (
        <p>No events yet.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {events.map(event => (
            <li
              key={event.id}
              style={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                marginBottom: '15px',
                padding: '10px',
                background: '#f9f9f9'
              }}
            >
              <strong>{event.title}</strong> – {event.date}
              <p>{event.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ClubPage;
