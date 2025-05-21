import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Admin = () => {
  const [events, setEvents] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const email = localStorage.getItem('email');

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
      const res = await axios.get(`http://localhost:5000/api/notifications/${email}`);
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

  return (
    <div style={{ textAlign: 'center', marginTop: '60px', fontFamily: 'Segoe UI' }}>
      <h2>Admin Panel 🔐</h2>

      {/* Pending Events Section */}
      <h3 style={{ marginTop: '40px' }}>Pending Events</h3>
      {events.length === 0 ? (
        <p>No pending events</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {events.map((event) => (
            <li key={event.id} style={{
              border: '1px solid #ccc',
              margin: '15px auto',
              padding: '15px',
              width: '80%',
              maxWidth: '400px',
              borderRadius: '10px',
              backgroundColor: '#f8f9fa'
            }}>
              <h4>{event.title}</h4>
              <p>{event.description}</p>
              <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
              <button
                onClick={() => handleDecision(event.id, 'approved')}
                style={{ marginRight: '10px', backgroundColor: '#28a745', color: 'white', padding: '5px 10px', borderRadius: '5px', border: 'none' }}
              >
                Approve ✅
              </button>
              <button
                onClick={() => handleDecision(event.id, 'rejected')}
                style={{ backgroundColor: '#dc3545', color: 'white', padding: '5px 10px', borderRadius: '5px', border: 'none' }}
              >
                Reject ❌
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Notifications Section */}
      <div style={{ marginTop: '50px' }}>
        <h3>🔔 Notifications</h3>
        {notifications.length === 0 ? (
          <p>No notifications yet</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {notifications.map((note) => (
              <li key={note.id} style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '10px',
                margin: '10px auto',
                width: '90%',
                maxWidth: '400px',
                background: '#f1f1f1'
              }}>
                <p>{note.message}</p>
                <small>{new Date(note.timestamp).toLocaleString()}</small>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Admin;
