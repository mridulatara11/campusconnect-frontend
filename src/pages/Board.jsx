import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Board.css'; // Make sure to create this file
import LogoutButton from '../components/Logoutbutton';
const Board = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ type: 'announcement', message: '' });
  const email = localStorage.getItem('email');
  const role = localStorage.getItem('role');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/posts');
      setPosts(res.data);
    } catch (err) {
      console.error('Failed to load board:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newPost.message.trim()) return;

    try {
      await axios.post('http://localhost:5000/api/posts', {
        sender: email,
        role,
        message: newPost.message,
        type: newPost.type
      });

      setNewPost({ type: 'announcement', message: '' });
      fetchPosts();
    } catch (err) {
      console.error('Failed to post:', err);
    }
  };

  return (
    <div className="board-container">
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
      <div className="board-header">
        <h2>📢 Announcements & Queries</h2>
        <LogoutButton />
      </div>

      <form className="post-form" onSubmit={handleSubmit}>
        <select
          value={newPost.type}
          onChange={(e) => setNewPost({ ...newPost, type: e.target.value })}
          className="post-select"
        >
          <option value="announcement">Announcement</option>
          <option value="query">Query</option>
        </select>
        <textarea
          className="post-textarea"
          placeholder="Write your message..."
          value={newPost.message}
          onChange={(e) => setNewPost({ ...newPost, message: e.target.value })}
          required
        />
        <button type="submit" className="post-button">Post</button>
      </form>

      <div className="posts-section">
        {posts.map((post) => (
          <div
            key={post.id}
            className={`post-card ${post.type === 'announcement' ? 'announcement' : 'query'}`}
          >
            <h4>{post.type === 'announcement' ? '📣 Announcement' : '❓ Query'}</h4>
            <p>{post.message}</p>
            <small><strong>By:</strong> {post.sender} | {new Date(post.timestamp).toLocaleString()}</small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Board;
