import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Student = () => {
  const [events, setEvents] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const userEmail = localStorage.getItem('email');

  useEffect(() => {
    fetchEvents();
    fetchNotifications();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/events');
      const approvedEvents = res.data.filter(event => event.status === 'approved');
      setEvents(approvedEvents);
    } catch (err) {
      console.error('Failed to fetch events:', err);
    }
  };

  const fetchNotifications = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/notifications/${userEmail}`);
      setNotifications(res.data);
    } catch (err) {
      console.error('Notification fetch failed:', err);
    }
  };

  const handleRegister = async (eventId) => {
    try {
      await axios.post('http://localhost:5000/api/register-event', {
        studentEmail: userEmail,
        eventId,
      });
      alert('Registered successfully!');
    } catch (err) {
      alert('Registration failed!');
      console.error(err);
    }
  };

  return (
    <div style={{ fontFamily: 'Segoe UI', padding: '20px', textAlign: 'center' }}>
      <h2>Welcome, {userEmail} 👩‍🎓</h2>
      <h3>🔔 Notifications</h3>
      {notifications.length === 0 ? (
        <p>No notifications</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {notifications
  .filter((note) => note.message.startsWith('New event'))
  .map((note) => (

            <li key={note.id} style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '10px',
              margin: '10px auto',
              width: '90%',
              maxWidth: '400px',
              background: '#f9f9f9'
            }}>
              <p>{note.message}</p>
              <small>{new Date(note.timestamp).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      )}

      <h3 style={{ marginTop: '40px' }}>📅 Upcoming Events</h3>
      {events.length === 0 ? (
        <p>No approved events available</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {events.map((event) => (
            <li key={event.id} style={{
              border: '1px solid #ccc',
              margin: '15px auto',
              padding: '15px',
              width: '80%',
              maxWidth: '400px',
              borderRadius: '10px'
            }}>
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <p><strong>Date:</strong> {event.date}</p>
              <button onClick={() => handleRegister(event.id)} style={{ padding: '8px 20px' }}>
                Register
              </button>
            </li>
          ))}
        </ul>
      )}
      <button
  onClick={async () => {
    try {
      const encodedEmail = encodeURIComponent(userEmail);
      await axios.delete(`http://localhost:5000/api/notifications/${encodedEmail}`);
      setNotifications([]);
      alert('Notifications cleared!');
    } catch (err) {
      console.error('Failed to clear notifications:', err);
      alert('Could not clear notifications. Try again later.');
    }
  }}
  style={{
    backgroundColor: '#ff6666',
    color: 'white',
    padding: '6px 12px',
    borderRadius: '5px',
    border: 'none',
    marginBottom: '15px',
    cursor: 'pointer'
  }}
>
  Clear Notifications 🧹
</button>
<Link to="/board">📢 Announcements & Queries</Link>


    </div>
  );
};

export default Student;
