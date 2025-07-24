import React from 'react';
import './Blog.css';

const Blog = () => {

  return (
    <section id="blog" className="blog">
      <h2 className="section-title">Latest Blog Posts</h2>
      
      <div className="blog-container">
        <div className="coming-soon-container">
          <div className="coming-soon-content">
            <h3>Blog Coming Soon</h3>
            <p></p>
            <div className="coming-soon-icon">📝</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog; 