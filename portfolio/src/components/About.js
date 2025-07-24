import React from 'react';
import './About.css';

const About = () => {
  return (
    <section id="about" className="about">
      <h2 className="section-title">About Me</h2>
      <div className="about-container">
        <div className="about-content">
          <div className="about-text">
            <h3>Who I Am</h3>
            <p>
              I'm a passionate software engineer with a love for creating elegant solutions to complex problems. 
              With several years of experience in full-stack development, I specialize in building scalable web 
              applications using modern technologies.
            </p>
            <p>
              My journey in software development started with curiosity and has evolved into a career focused on 
              writing clean, maintainable code and delivering exceptional user experiences. I believe in continuous 
              learning and staying up-to-date with the latest industry trends and best practices.
            </p>
            <p>
              When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, 
              or sharing knowledge with the developer community.
            </p>
          </div>
          <div className="about-stats">
            <div className="stat-item">
              <h4>3+</h4>
              <p>Years Experience</p>
            </div>
            <div className="stat-item">
              <h4>20+</h4>
              <p>Projects Completed</p>
            </div>
            <div className="stat-item">
              <h4>5+</h4>
              <p>Technologies Mastered</p>
            </div>
          </div>
        </div>
        <div className="about-image">
          <div className="about-avatar">
            <div className="avatar-placeholder">
              <div className="avatar-square"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 