import React, { useState, useEffect } from 'react';
import './Hero.css';

const API_URL = process.env.REACT_APP_API_URL_STICKY;

const Hero = () => {
  const [currentNoteIndex, setCurrentNoteIndex] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [welcomeIndex, setWelcomeIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [noteForm, setNoteForm] = useState({ statement: '', name: '', role: '' });

  const welcomeMessages = [
    'Welcome',
    '환영합니다',
    '欢迎',
    'ようこそ',
    'Aidan Nguyen'
  ];

  const stickyNotes = [
    { text: "This is the first stickynote!", author: "Aidan Nguyen", role: "", date: "07.19.25", color: "#ffeb3b", x: -60, y: -50, rotation: -15 },
    { text: "", author: "", role: "", date: "", color: "#ff9800", x: 250, y: -65, rotation: 25 },
    { text: "", author: "", role: "", date: "", color: "#4caf50", x: 50, y: 300, rotation: -8 },
    { text: "", author: "", role: "", date: "", color: "#e91e63", x: 280, y: 70, rotation: 12 },
    { text: "", author: "", role: "", date: "", color: "#9c27b0", x: 200, y: 380, rotation: -30 },
    { text: "", author: "", role: "", date: "", color: "#2196f3", x: 20, y: -80, rotation: 5 },
    { text: "", author: "", role: "", date: "", color: "#ff5722", x: -40, y: 350, rotation: -22 },
    { text: "", author: "", role: "", date: "", color: "#00bcd4", x: 290, y: -15, rotation: 18 },
    { text: "", author: "", role: "", date: "", color: "#8bc34a", x: -40, y: 350, rotation: -50 },
    { text: "", author: "", role: "", date: "", color: "#ffc107", x: 130, y: 250, rotation: 30 },
    { text: "", author: "", role: "", date: "", color: "#795548", x: -70, y: 25, rotation: -18 },
    { text: "", author: "", role: "", date: "", color: "#607d8b", x: 85, y: -45, rotation: 8 },
    { text: "", author: "", role: "", date: "", color: "#f44336", x: -50, y: -85, rotation: -25 },
    { text: "", author: "", role: "", date: "", color: "#3f51b5", x: 300, y: 320, rotation: 15 },
    { text: "", author: "", role: "", date: "", color: "#009688", x: -30, y: 90, rotation: -12 }
  ];

  const nextNote = () => {
    setCurrentNoteIndex((prev) => (prev + 1) % stickyNotes.length);
  };

  const prevNote = () => {
    setCurrentNoteIndex((prev) => (prev - 1 + stickyNotes.length) % stickyNotes.length);
  };

  // Welcome text animation
  useEffect(() => {
    const interval = setInterval(() => {
      if (welcomeIndex < welcomeMessages.length - 1) {
        setIsFading(true);
        setTimeout(() => {
          setWelcomeIndex(prev => prev + 1);
          setIsFading(false);
        }, 400);
      } else {
        clearInterval(interval);
      }
    }, 500); // Change every 1 second

    return () => clearInterval(interval);
  }, [welcomeIndex, welcomeMessages.length]);



  return (
    <section id="home" className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            <div className="hero-name-container">
              <span className={`hero-name ${isFading ? 'fade-out' : ''}`}>
                {welcomeMessages[welcomeIndex]}
              </span>
            </div>
          </h1>
          <div className="hero-education">
            Virginia Tech '27
            <img src="/virginia-tech-logo.png" alt="Virginia Tech" className="vt-logo" />
          </div>
          <h2 className="hero-subtitle">Software Engineer</h2>
          <div className="hero-buttons">
            <button className="btn" onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}>
              View My Work
            </button>
            <button className="btn btn-outline" onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>
              Contact Me!
            </button>
            <button className="btn btn-resume" onClick={() => window.open('/resume.pdf', '_blank')}>
              <svg className="download-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7,10 12,15 17,10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              Download Resume
            </button>
          </div>
        </div>
        <div className="hero-image">
          <div className="sticky-notes-container">
            <div className="sticky-notes-stack">
              {stickyNotes.map((note, index) => {
                const isTopNote = index === currentNoteIndex;
                const isVisible = true; // All notes are always visible
                const zIndex = stickyNotes.length - index;
                
                return (
                  <div
                    key={index}
                    className={`sticky-note ${isTopNote ? 'top-note' : ''} ${isVisible ? 'visible' : ''}`}
                    style={{
                      backgroundColor: note.color,
                      zIndex: zIndex,
                      transform: `rotate(${isTopNote ? 0 : note.rotation}deg) translate(${isTopNote ? 120 : note.x}px, ${isTopNote ? 160 : note.y}px) scale(${isTopNote ? 1.08 : 1})`,
                      opacity: isTopNote ? 1 : 0.85
                    }}
                  >
                    <div className="note-content">
                      <p className="note-text">{note.text}</p>
                      <p className="note-author">{note.author}</p>
                      <p className="note-role">{note.role}</p>
                      <p className="note-date">{note.date}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="sticky-notes-navigation">
              <button className="nav-arrow nav-left" onClick={prevNote}>
                ‹
              </button>
              <button className="nav-arrow nav-right" onClick={nextNote}>
                ›
              </button>
            </div>
            
            <div className="sticky-notes-counter">
              {currentNoteIndex + 1} / {stickyNotes.length}
            </div>
            
            <div className="add-note-icon">
              <button className="add-note-btn-small" onClick={() => setShowForm(!showForm)}>?</button>
            </div>
            
                        <div className={`add-sticky-note-section ${showForm ? 'show' : ''}`}>
              <h3 className="add-note-title">Add Your Own Sticky Note!</h3>
              <p className="add-note-subtitle">These are real endorsements</p>
              <div className="add-note-form">
                <form onSubmit={async e => {
                  e.preventDefault();
                  try {
                    const response = await fetch(API_URL, {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify(noteForm)
                    });
                    if (!response.ok) {
                      throw new Error('Failed to submit form');
                    }
                    const data = await response.json(); //remove before deploying
                    console.log('Form submitted:', data); //remove before deploying
                  } catch (error) {
                    console.error('Error submitting form:', error);
                  }
                  setSubmitted(true);
                  setNoteForm({ statement: '', name: '', role: '' });
                }}>
                  <div className="form-group">
                    <label>Your Statement:</label>
                    <textarea
                      placeholder="Write your endorsement here..."
                      className="form-input"
                      value={noteForm.statement}
                      onChange={e => setNoteForm({ ...noteForm, statement: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Your Name:</label>
                    <input
                      type="text"
                      placeholder="Your full name"
                      className="form-input"
                      value={noteForm.name}
                      onChange={e => setNoteForm({ ...noteForm, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Position/Role:</label>
                    <input
                      type="text"
                      placeholder="e.g., SWE @ Amazon, Professor @ Virginia Tech"
                      className="form-input"
                      value={noteForm.role}
                      onChange={e => setNoteForm({ ...noteForm, role: e.target.value })}
                      required
                    />
                  </div>
                  <button className="add-note-btn" type="submit">Add My Sticky Note!</button>
                  {submitted && <p className="submission-message">Your sticky note was sent for approval!</p>}
                </form>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 