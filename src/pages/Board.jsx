import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Board = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ type: 'announcement', message: '' });
  const email = localStorage.getItem('email');

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

  const role = localStorage.getItem('role'); // get user's role too

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
    <div style={{ padding: '20px', fontFamily: 'Segoe UI' }}>
      <h2 style={{ textAlign: 'center' }}>📢 Announcements & Queries</h2>
      <form onSubmit={handleSubmit} style={{ margin: '20px auto', maxWidth: '600px' }}>
        <select
          value={newPost.type}
          onChange={(e) => setNewPost({ ...newPost, type: e.target.value })}
          style={{ padding: '10px', marginBottom: '10px', width: '100%' }}
        >
          <option value="announcement">Announcement</option>
          <option value="query">Query</option>
        </select>
        <textarea
          placeholder="Write your message..."
          value={newPost.message}
          onChange={(e) => setNewPost({ ...newPost, message: e.target.value })}
          rows="4"
          style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
          required
        ></textarea>
        <button type="submit" style={{ padding: '10px 20px', width: '100%' }}>Post</button>
      </form>

      <div style={{ marginTop: '40px' }}>
        {posts.map((post) => (
          <div
            key={post.id}
            style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '15px',
              marginBottom: '15px',
              background: post.type === 'announcement' ? '#dff0d8' : '#d9edf7'
            }}
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
