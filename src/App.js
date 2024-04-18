import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadPosts();
  }, [currentPage]);

  const loadPosts = async () => {
    setLoading(true);
    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?_page=${currentPage}&_limit=10`);
    setPosts((prevPosts) => [...prevPosts, ...response.data]);
    setLoading(false);
  };

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200 && !loading) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loading]);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Posts</h1>
      <ul style={styles.postList}>
        {posts.map((post) => (
          <li key={`${post.userId}${post.body}`} style={styles.postItem}>
            <h2 style={styles.postTitle}>{post.title}</h2>
            <p style={styles.postBody}>{post.body}</p>
          </li>
        ))}
      </ul>
      {loading && (
        <div style={styles.loading}>
          <div style={styles.elasticLoader}></div>
          <p>Loading...</p>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
  },
  title: {
    fontSize: '24px',
    marginBottom: '20px',
    textAlign: 'center',
  },
  postList: {
    listStyleType: 'none',
    padding: '0',
  },
  postItem: {
    border: '1px solid #ccc',
    marginBottom: '10px',
    padding: '10px',
    borderRadius: '4px',
  },
  postTitle: {
    fontSize: '20px',
    marginBottom: '5px',
  },
  postBody: {
    marginTop: '5px',
  },
  loading: {
    textAlign: 'center',
    marginTop: '20px',
    fontSize: '18px',
  },
  elasticLoader: {
    width: '50px',
    height: '20px',
    background: '#333',
    borderRadius: '10px',
    position: 'relative',
    margin: '0 auto',
    animation: 'elastic 1s infinite',
  },
};

export default App;
