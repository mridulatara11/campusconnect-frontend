import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import LogoutButton from '../components/Logoutbutton';
import './Student.css';

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

  const handleClearNotifications = async () => {
    try {
      const encodedEmail = encodeURIComponent(userEmail);
      await axios.delete(`http://localhost:5000/api/notifications/${encodedEmail}`);
      setNotifications([]);
      alert('Notifications cleared!');
    } catch (err) {
      console.error('Failed to clear notifications:', err);
      alert('Could not clear notifications. Try again later.');
    }
  };

  return (
    <div className="student-container">
      <img
        src={require('../assets/logo.png')}
        alt="MGIT"
        style={{
          width: '160px',
          marginBottom: '20px',
          display: 'block',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      />
      <div className="student-header">
        <h2 className="student-title">Welcome, {userEmail} 👩‍🎓</h2>
        <LogoutButton />
      </div>

      <section className="student-section">
        <h3 className="section-title">📅 Upcoming Events</h3>
        {events.length === 0 ? (
          <p>No approved events available</p>
        ) : (
          <ul className="event-list">
            {events.map(event => (
              <li key={event.id} className="event-card">
                <h4>{event.title}</h4>
                <p>{event.description}</p>
                <p><strong>Date:</strong> {event.date}</p>
                <button onClick={() => handleRegister(event.id)} className="register-btn">
                  Register
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
      <section className="student-section">
        <h3 className="section-title">🔔 Notifications</h3>
        {notifications.length === 0 ? (
          <p>No notifications</p>
        ) : (
          <ul className="notification-list">
            {notifications.filter(note => note.message.startsWith('New event')).map(note => (
              <li key={note.id} className="notification-card">
                <p>{note.message}</p>
                <small>{new Date(note.timestamp).toLocaleString()}</small>
              </li>
            ))}
          </ul>
        )}
        <button onClick={handleClearNotifications} className="clear-btn">
          Clear Notifications 🧹
        </button>
        <Link to="/board" className="board-link">📢 Announcements & Queries</Link>
      </section>
    </div>
  );
};

export default Student;
