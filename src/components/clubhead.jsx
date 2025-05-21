import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
      await axios.post('http://localhost:5000/api/propose-event', event);
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
      if (!userEmail) {
        console.warn('No email found in localStorage for notifications');
        return;
      }
      const res = await axios.get(`http://localhost:5000/api/notifications/${userEmail}`);
      setNotifications(res.data);
    } catch (err) {
      console.error('Error fetching notifications:', err);
    }
  };

  return (
    <div style={{ fontFamily: 'Segoe UI', padding: '20px', textAlign: 'center' }}>
      <h2>Propose a New Event 💼</h2>
      <form onSubmit={handleSubmit} style={{ marginTop: '30px' }}>
        <input
          type="text"
          name="title"
          placeholder="Event Title"
          value={event.title}
          onChange={handleChange}
          required
          style={{ margin: '10px', padding: '10px', width: '250px' }}
        />
        <br />
        <textarea
          name="description"
          placeholder="Event Description"
          value={event.description}
          onChange={handleChange}
          required
          style={{ margin: '10px', padding: '10px', width: '250px', height: '100px' }}
        />
        <br />
        <input
          type="date"
          name="date"
          value={event.date}
          onChange={handleChange}
          required
          style={{ margin: '10px', padding: '10px', width: '250px' }}
        />
        <br />
        <select
          name="club_name"
          value={event.club_name}
          onChange={handleChange}
          required
          style={{ margin: '10px', padding: '10px', width: '250px' }}
        >
          <option value="">Select Club</option>
          {clubs.map((club) => (
            <option key={club.id} value={club.name}>{club.name}</option>
          ))}
        </select>
        <br />
        <button type="submit" style={{ padding: '10px 20px' }}>Submit Event</button>
      </form>

      <div style={{ marginTop: '50px' }}>
        <h3>🔔 Notifications</h3>
        {notifications && notifications.length > 0 ? (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {notifications.map((note) => (
              <li
                key={note.id}
                style={{
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  padding: '10px',
                  margin: '10px auto',
                  width: '90%',
                  maxWidth: '400px',
                  background: '#f9f9f9',
                }}
              >
                <p>{note.message}</p>
                <small>{new Date(note.timestamp).toLocaleString()}</small>
              </li>
            ))}
          </ul>
        ) : (
          <p>No notifications yet</p>
        )}
      </div>
    </div>
  );
};

export default ClubHead;
