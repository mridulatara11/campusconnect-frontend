import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import LogoutButton from '../components/Logoutbutton';
import './Admin.css';

const Admin = () => {
  const [events, setEvents] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const userEmail = localStorage.getItem('email');

  useEffect(() => {
    fetchPendingEvents();
    fetchNotifications();
  }, []);

  const fetchPendingEvents = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/events');
      setEvents(res.data);
    } catch (err) {
      console.error('Error fetching pending events:', err);
    }
  };

  const fetchNotifications = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/notifications/${userEmail}`);
      setNotifications(res.data);
    } catch (err) {
      console.error('Error fetching notifications:', err);
    }
  };

  const handleDecision = async (eventId, decision) => {
    try {
      await axios.post('http://localhost:5000/api/admin/event-decision', {
        eventId,
        decision,
      });
      alert(`Event ${decision}`);
      fetchPendingEvents();
    } catch (err) {
      console.error('Error updating event:', err);
    }
  };

  const handleClearNotifications = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/notifications/${userEmail}`);
      setNotifications([]);
      alert('Notifications cleared!');
    } catch (err) {
      console.error('Failed to clear notifications:', err);
    }
  };

  return (
    <div className="admin-container">
      <img
        src={require('../assets/logo.png')}
        alt="MGIT"
      />
      <div className="admin-header">
        <h2 className="admin-title">Admin Panel 🔐</h2>
        <LogoutButton />
      </div>

      <section className="admin-section">
        <h3>Pending Events</h3>
        {events.length === 0 ? (
          <p>No pending events</p>
        ) : (
          <ul className="admin-events-list">
            {events.map((event) => (
              <li key={event.id} className="event-card">
                <h4>{event.title}</h4>
                <p>{event.description}</p>
                <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
                <div className="event-buttons">
                  <button
                    onClick={() => handleDecision(event.id, 'approved')}
                    className="approve-btn"
                  >
                    Approve ✅
                  </button>
                  <button
                    onClick={() => handleDecision(event.id, 'rejected')}
                    className="reject-btn"
                  >
                    Reject ❌
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="admin-section">
        <h3>🔔 Notifications</h3>
        {notifications.length === 0 ? (
          <p>No notifications yet</p>
        ) : (
          <ul className="notification-list">
            {notifications.map((note) => (
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

export default Admin;
