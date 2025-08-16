import React, { useState, useRef, useEffect } from 'react';

const SteamHeader = ({ cinematicMode, toggleCinematicMode }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const profileDropdownRef = useRef(null);
  const headerProfileDropdownRef = useRef(null);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  // Handle clicking outside the dropdowns to close them
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close profile name dropdown if clicking outside
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
      
      // Close header profile dropdown if clicking outside
      if (headerProfileDropdownRef.current && !headerProfileDropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="steam-header">
      {/* Top Menu Bar */}
      <div className="top-menu-bar">
        <div className="menu-left">
          <div className="steam-logo">
            <span className="steam-icon">S</span>
            <span className="menu-item">Steam</span>
          </div>
          <div className="menu-items">
            <span className="menu-item">View</span>
            <span className="menu-item">Friends</span>
            <span className="menu-item">Games</span>
            <span className="menu-item">Help</span>
          </div>
        </div>
        
        <div className="menu-right">
          <div className="volume-btn" data-tooltip="View News from Aidan">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M3 9v6h4l5 5V4L7 9H3z" fill="#8b929a"/>
              <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" fill="#8b929a"/>
              <path d="M14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" fill="#8b929a"/>
            </svg>
          </div>
          <div className="notification-btn" data-tooltip="View Notifications">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" fill="#8b929a"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0" fill="#8b929a"/>
            </svg>
          </div>
          <div className="header-profile-wrapper" ref={headerProfileDropdownRef}>
            <div className={`user-profile ${showDropdown ? 'dropdown-open' : ''}`} data-tooltip={showDropdown ? '' : "View Aidan's account"} onClick={toggleDropdown}>
              <div 
                className="profile-avatar" 
                style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/profile_picture.png)` }}
              ></div>
              <span className="username">Aidan Nguyen</span>
              <svg className="dropdown-arrow" width="8" height="8" viewBox="0 0 24 24" fill="none">
                <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            
            {showDropdown && (
              <div className="profile-dropdown">
                <div className="dropdown-item">View my profile</div>
                <div className="dropdown-item">
                  Account details: <span className="profile-username">Aidan Nguyen</span>
                </div>
                <div className="dropdown-item">Store preferences</div>
                <div className="dropdown-item">View my wallet</div>
                <div className="dropdown-separator"></div>
                <div className="dropdown-item">Change Account...</div>
                <div className="dropdown-item">Sign out of account...</div>
              </div>
            )}
          </div>

          {/* TV Icon */}
          <div className="tv-icon" 
            data-tooltip={cinematicMode ? "Exit Cinematic Mode" : "Enter Cinematic Mode"}
            style={{ 
              width: '32px', 
              height: '24px', 
              background: 'transparent', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              cursor: 'pointer', 
              borderRadius: '2px',
              marginLeft: '8px',
              transition: 'background-color 0.2s',
              position: 'relative'
            }}
            onClick={toggleCinematicMode}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#3c434e'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
            >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2" stroke="#67707b" strokeWidth="2" fill="none"/>
              <rect x="10" y="17" width="4" height="3" fill="#67707b"/>
              {cinematicMode && (
                <line x1="3" y1="4" x2="21" y2="18" stroke="#67707b" strokeWidth="2" strokeLinecap="round"/>
              )}
            </svg>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="main-nav-bar">
        <div className="nav-arrows">
          <div className="nav-arrow left">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="nav-arrow right">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        <div className="nav-tabs">
          <div className="nav-tab">STORE</div>
          <div className="nav-tab">LIBRARY</div>
          <div className="nav-tab">COMMUNITY</div>
          <div className="nav-tab active">AIDAN NGUYEN</div>
        </div>
      </div>

      {/* URL Bar */}
      <div className="url-bar">
        <span className="refresh-icon">⟳</span>
        <svg className="lock-icon" width="12" height="12" viewBox="0 0 24 24" fill="#646c77" aria-hidden="true">
          <path d="M12 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm6-6h-1V7a5 5 0 0 0-10 0v4H6a2 2 0 0 0-2 2v7h16v-7a2 2 0 0 0-2-2zm-3 0H9V7a3 3 0 0 1 6 0v4z" />
        </svg>
        <span className="url-text">https://anguy98.com/</span>
      </div>
    </div>
  );
};

export default SteamHeader;
