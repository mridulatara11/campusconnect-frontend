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

  return (
    <div style={{ padding: '20px' }}>
      <h2>{club.name}</h2>
      <img 
        src={require(`../assets/${club.logo_url}`)} 
        alt={club.name}
        style={{ width: '100px', marginBottom: '20px' }}
      />
      <p>{club.description}</p>

      <h3>📅 Events</h3>
      {events.length === 0 ? (
        <p>No events yet.</p>
      ) : (
        <ul>
          {events.map(event => (
            <li key={event.id}>
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
