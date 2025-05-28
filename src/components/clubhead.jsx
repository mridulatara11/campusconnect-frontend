import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import LogoutButton from '../components/Logoutbutton';
import './Clubhead.css';

const ClubHead = () => {
  const [clubs, setClubs] = useState([]);
  const [event, setEvent] = useState({
    title: '',
    description: '',
    date: '',
    club_name: '',
  });

  const [notifications, setNotifications] = useState([]);
  const userEmail = localStorage.getItem('email');

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/clubs');
        setClubs(res.data);
      } catch (err) {
        console.error('Failed to load clubs', err);
      }
    };
    fetchClubs();
    fetchNotifications();
  }, [userEmail]);

  const handleChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/propose-event', {
        ...event,
        proposed_by: userEmail,
      });
      alert('Event proposal submitted!');
      setEvent({ title: '', description: '', date: '', club_name: '' });
      fetchNotifications();
    } catch (err) {
      console.error('Event proposal failed:', err);
      alert('Submission failed!');
    }
  };

  const fetchNotifications = async () => {
    try {
      if (!userEmail) return;
      const res = await axios.get(`http://localhost:5000/api/notifications/${userEmail}`);
      setNotifications(res.data);
    } catch (err) {
      console.error('Error fetching notifications:', err);
    }
  };

  const handleClear = async () => {
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
    <div className="clubhead-container">
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
      <div className="clubhead-header">
        <h2 className="page-title">Propose a New Event <span role="img" aria-label="briefcase">💼</span></h2>

        <LogoutButton />
      </div>

      <form onSubmit={handleSubmit} className="event-form">
        <input
          type="text"
          name="title"
          placeholder="Event Title"
          value={event.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Event Description"
          value={event.description}
          onChange={handleChange}
          required
        ></textarea>
        <input
          type="date"
          name="date"
          value={event.date}
          onChange={handleChange}
          required
        />
        <select
          name="club_name"
          value={event.club_name}
          onChange={handleChange}
          required
        >
          <option value="">Select Club</option>
          {clubs.map((club) => (
            <option key={club.id} value={club.name}>{club.name}</option>
          ))}
        </select>
        <button type="submit" className="submit-btn">Submit Event</button>
      </form>

      <div className="notification-section">
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
        <button onClick={handleClear} className="clear-btn">Clear Notifications 🧹</button>
        <Link to="/board" className="board-link">📢 Announcements & Queries</Link>
      </div>
    </div>
  );
};

export default ClubHead;
