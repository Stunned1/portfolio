import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import SteamHeader from './components/SteamHeader';
import './components/SteamHeader.css';
import ChatPopup from './components/ChatPopup';
import Library from './components/Library';
import Store from './components/Store';
import Community from './components/Community';

// Helper function to subtract days from current date
const subtractDays = (days) => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric' 
  });
};

function App() {
  const [cinematicMode, setCinematicMode] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [currentDate, setCurrentDate] = useState('');
  const [hoveredFriend, setHoveredFriend] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('profile');
  const profileDropdownRef = useRef(null);

  // Get current date in EST format
  const getCurrentDateEST = () => {
    const now = new Date();
    const estOptions = {
      timeZone: 'America/New_York',
      month: 'short',
      day: 'numeric'
    };
    return now.toLocaleString('en-US', estOptions);
  };

  // Update date on component mount
  useEffect(() => {
    setCurrentDate(getCurrentDateEST());
  }, []);

  const toggleCinematicMode = () => {
    setCinematicMode(!cinematicMode);
  };

  const closeDropdown = () => {
    if (showProfileDropdown && !isFadingOut) {
      setIsFadingOut(true);
      setTimeout(() => {
        setShowProfileDropdown(false);
        setIsFadingOut(false);
      }, 200);
    }
  };

  const toggleProfileDropdown = () => {
    if (showProfileDropdown) {
      closeDropdown();
    } else {
      setShowProfileDropdown(true);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Handle clicking outside the profile dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showProfileDropdown, isFadingOut]);

  return (
      <div className="App">
      <style>
        {`
          .custom-checkbox.checked .checkmark {
            opacity: 1 !important;
          }
          
          .subscribe-tooltip {
            position: relative;
          }
          
          .subscribe-tooltip::after {
            content: attr(data-tooltip);
            position: absolute;
            top: -72px;
            left: 0;
            background: #c0c4c7;
            color: #313337;
            padding: 5px;
            border-radius: 3px;
            font-size: 11px;
            white-space: normal;
            width: 235px;
            opacity: 0;
            pointer-events: none;
            z-index: 1000;
            transition: opacity 0.2s ease-out;
          }
          
          .subscribe-tooltip:hover::after {
            opacity: 1;
            transition: opacity 0.3s ease-in;
          }
          
          .pdf-icon-tooltip {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          
          .pdf-icon-tooltip::after {
            content: attr(data-tooltip);
            position: absolute;
            top: -37px;
            left: 0;
            background: #c0c4c7;
            color: #313337;
            padding: 5px;
            border-radius: 3px;
            font-size: 12px;
            white-space: nowrap;
            opacity: 0;
            pointer-events: none;
            z-index: 1000;
            transition: opacity 0.2s ease-out;
            visibility: hidden;
          }
          
          .pdf-icon-tooltip:hover::after {
            opacity: 1;
            visibility: visible;
          }
        `}
      </style>
        <SteamHeader 
          cinematicMode={cinematicMode} 
          toggleCinematicMode={toggleCinematicMode} 
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
        
      {/* Page Content */}
      {currentPage === 'profile' && (
        <>
          {/* Center Column - spans from top to bottom */}
          <div className={`center-column ${cinematicMode ? 'cinematic' : ''}`}>
        {/* Profile Header Content */}
        <div className="profile_header_content">
          {/* Profile Picture - 164x164px square, all the way to the left */}
          <div className="profile_picture">
            <img 
              src={`${process.env.PUBLIC_URL}/profile_picture.png`} 
              alt="Profile Picture"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
      </div>
          
          {/* Profile Header Text Content - 436px wide, 36px from profile picture */}
          <div className="profile_header_text_content">
            <div className="profile_name_section" ref={profileDropdownRef}>
              <div className="profile_name" onClick={toggleProfileDropdown}>Aidan Nguyen</div>
              <svg className="name_dropdown_arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" onClick={toggleProfileDropdown}>
                <path d="M6 9L12 15L18 9" fill="#e1e1e1"/>
              </svg>
              {(showProfileDropdown || isFadingOut) && (
                <div className={`profile_name_dropdown ${isFadingOut ? 'fade-out' : 'fade-in'}`}>
                  <div className="profile_dropdown_text">This user has also played as:</div>
                  <div className="profile_dropdown_username">anguy98</div>
                </div>
              )}
            </div>
            <div className="profile_location_section">
              <img 
                src={`${process.env.PUBLIC_URL}/us.png`} 
                alt="US Flag"
                className="flag-icon"
              />
              <div className="profile_location">Virginia, United States</div>
            </div>
            <div className="profile_details_section">
              <div className="profile_details">
                Welcome to my profile :D<br />
                Email: aidan.ngu98@gmail.com
              </div>
            </div>
          </div>
          
          {/* Header Badge Content - 268x168px, all the way to the right, 18px from text content */}
          <div className="header_badge_content">
            <div className="level_section">
              <span className="level_text">Level</span>
              <div className="level_circle">
                <span className="level_number">12</span>
              </div>
            </div>
            <div 
              className="favorite-badge"
              style={{
                width: '268px',
                height: '70px',
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                borderRadius: '3px',
                padding: '8px',
                marginTop: '13px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer'
              }}
              onClick={() => {
                const link = document.createElement('a');
                link.href = `${process.env.PUBLIC_URL}/aidan_nguyen_resume.pdf`;
                link.download = 'aidan_nguyen_resume.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}>
              <div className="pdf-icon-tooltip" data-tooltip="Download Aidan's Resume!">
                <img 
                  src={`${process.env.PUBLIC_URL}/pdf-icon.png`}
                  alt="Favorite badge icon"
                  style={{ width: '54px', height: '54px', objectFit: 'contain' }}
                />
              </div>
                            <div className="favorite-badge-text">
                <span>Download Resume</span>
                <span>100 XP</span>
              </div>
            </div>
            <div className="button_container">
              <button className="message_button" onClick={() => setIsChatOpen(true)}>Message</button>
                            <button className="more_button">
                More...
                <svg className="dropdown_arrow" width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M6 9L12 15L18 9" fill="#9eaec8"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* New content div - 952x1955px, positioned 34px below profile header */}
        <div 
          style={{
            width: '952px',
            height: '1955px',
            marginTop: '34px',
            marginBottom: '48px',
            position: 'relative'
          }}
        >
          {/* Right overlay div - 288x808px with blur effect */}
          <div 
            style={{
              position: 'absolute',
              right: '0px',
              top: '0px',
              width: '288px',
              height: '785px',
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              backdropFilter: 'blur(20px)',
              borderRadius: '3px',
              padding: '10px',
              zIndex: 10
            }}
          >
            <div style={{
              color: '#56c7db',
              fontSize: '20px',
              fontFamily: 'MotivaSans, sans-serif',
              fontWeight: 100
            }}>
              Currently Online
            </div>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              marginTop: '45px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'flex-end',
                gap: '8px'
              }}>
                <div 
                  className="links-text"
                  style={{
                    color: '#ebebeb',
                    fontSize: '14px',
                    fontFamily: 'MotivaSans, sans-serif'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.textDecoration = 'underline';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.textDecoration = 'none';
                  }}
                >
                  Links
                </div>
                <div style={{
                  color: '#9b9b9b',
                  fontSize: '24px',
                  fontFamily: 'MotivaSans, sans-serif',
                  transform: 'translateY(3px)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.parentElement.querySelector('.links-text').style.textDecoration = 'underline';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.parentElement.querySelector('.links-text').style.textDecoration = 'none';
                }}
                >
                  4
                </div>
              </div>
              <div style={{
                display: 'flex',
                gap: '17px',
                marginTop: '4px'
              }}>
                <div 
                  className="social-icon"
                  data-tooltip="LinkedIn"
                  onClick={() => window.open('https://www.linkedin.com/in/anguy98/', '_blank')}
                >
                  <img 
                    src={`${process.env.PUBLIC_URL}/linkedin-logo.png`} 
                    alt="LinkedIn"
                  />
                </div>
                <div 
                  className="social-icon"
                  data-tooltip="GitHub"
                  onClick={() => window.open('https://github.com/Stunned1', '_blank')}
                >
                  <img 
                    src={`${process.env.PUBLIC_URL}/github-logo.png`} 
                    alt="GitHub"
                  />
                </div>
                <div 
                  className="social-icon-rounded"
                  data-tooltip="X (Twitter)"
                  onClick={() => window.open('https://x.com/Aidan_Ngu1', '_blank')}
                >
                  <img 
                    src={`${process.env.PUBLIC_URL}/x-logo.png`} 
                    alt="X (Twitter)"
                  />
                </div>
                <div 
                  className="social-icon-rounded"
                  data-tooltip="Instagram"
                  onClick={() => window.open('https://www.instagram.com/ainguy98/', '_blank')}
                >
                  <img 
                    src={`${process.env.PUBLIC_URL}/insta-logo.png`} 
                    alt="Instagram"
                  />
                </div>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'flex-end',
                gap: '8px',
                marginTop: '52px'
              }}>
                <div 
                  className="projects-text"
                  style={{
                    color: '#ebebeb',
                    fontSize: '14px',
                    fontFamily: 'MotivaSans, sans-serif',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.textDecoration = 'underline';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.textDecoration = 'none';
                  }}
                  onClick={() => handlePageChange('library')}
                >
                  Projects
                </div>
                <div style={{
                  color: '#9b9b9b',
                  fontSize: '24px',
                  fontFamily: 'MotivaSans, sans-serif',
                  transform: 'translateY(3px)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.parentElement.querySelector('.projects-text').style.textDecoration = 'underline';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.parentElement.querySelector('.projects-text').style.textDecoration = 'none';
                }}
                >
                  5
                </div>
              </div>
              <div style={{
                marginTop: '12px'
              }}>
                <div 
                  className="experience-text"
                  style={{
                    color: '#ebebeb',
                    fontSize: '14px',
                    fontFamily: 'MotivaSans, sans-serif',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.textDecoration = 'underline';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.textDecoration = 'none';
                  }}
                  onClick={() => handlePageChange('library')}
                >
                  Experience
                </div>
              </div>
              <div style={{
                marginTop: '12px'
              }}>
                <div 
                  className="inventory-text"
                  style={{
                    color: '#ebebeb',
                    fontSize: '14px',
                    fontFamily: 'MotivaSans, sans-serif'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.textDecoration = 'underline';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.textDecoration = 'none';
                  }}
                >
                  Inventory
                </div>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'flex-end',
                gap: '8px',
                marginTop: '68px'
              }}>
                <div 
                  className="friends-text"
                  style={{
                    color: '#ebebeb',
                    fontSize: '14px',
                    fontFamily: 'MotivaSans, sans-serif'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.textDecoration = 'underline';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.textDecoration = 'none';
                  }}
                >
                  Friends
                </div>
                <div style={{
                  color: '#9b9b9b',
                  fontSize: '24px',
                  fontFamily: 'MotivaSans, sans-serif',
                  transform: 'translateY(3px)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.parentElement.querySelector('.friends-text').style.textDecoration = 'underline';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.parentElement.querySelector('.friends-text').style.textDecoration = 'none';
                }}
                >
                  165
                </div>
              </div>
            </div>
            <div 
              className="friend-div"
              style={{
                width: '268px',
                height: '284px',
                backgroundColor: 'transparent',
                marginTop: '12px',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                justifyContent: 'space-between'
              }}
            >
              {/* Friend slot 1 */}
              <div 
                className="friend-block"
                style={{
                  width: '268px',
                  height: '44px',
                  backgroundColor: hoveredFriend === 1 ? '#3a3a3a' : 'transparent',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease',
                  padding: '4px 0px 4px 4px',
                  display: 'flex',
                  alignItems: 'center'
                }}
                onMouseEnter={() => setHoveredFriend(1)}
                onMouseLeave={() => setHoveredFriend(null)}
              >
                <img 
                  src={`${process.env.PUBLIC_URL}/friend1.png`} 
                  alt="Friend 1"
                  style={{ 
                    width: '32px', 
                    height: '32px', 
                    objectFit: 'cover',
                    border: '1px solid #6a6a6a',
                    outline: '1px solid #898989',
                    outlineOffset: '0px'
                  }}
                />
                                <div style={{
                  marginLeft: '8px',
                  color: '#898989',
                  fontSize: '11px',
                  fontFamily: 'MotivaSans, sans-serif',
                  lineHeight: '13px'
                }}>
                  KIYIOS<br />
                  Offline<br />
                  &nbsp;
                </div>
                <svg 
                  width="36" 
                  height="36" 
                  viewBox="0 0 36 36"
                  style={{
                    marginLeft: 'auto',
                    marginRight: '4px'
                  }}
                >
                  <circle 
                    cx="18" 
                    cy="18" 
                    r="16" 
                    fill="none" 
                    stroke="#542437" 
                    strokeWidth="2"
                  />
                  <text 
                    x="18" 
                    y="22" 
                    textAnchor="middle" 
                    fill="#e5e5e5" 
                    fontSize="16px"
                    fontFamily="MotivaSans, sans-serif"
                  >
                    88
                  </text>
                </svg>
                </div>
                
                {/* Friend slot 2 */}
              <div 
                className="friend-block"
                style={{
                  width: '268px',
                  height: '44px',
                  backgroundColor: hoveredFriend === 2 ? '#3a3a3a' : 'transparent',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease',
                  padding: '4px 0px 4px 4px',
                  display: 'flex',
                  alignItems: 'center'
                }}
                onMouseEnter={() => setHoveredFriend(2)}
                onMouseLeave={() => setHoveredFriend(null)}
              >
                <img 
                  src={`${process.env.PUBLIC_URL}/friend2.png`} 
                  alt="Friend 2"
                  style={{ 
                    width: '32px', 
                    height: '32px', 
                    objectFit: 'cover',
                    border: '1px solid #6a6a6a',
                    outline: '1px solid #898989',
                    outlineOffset: '0px'
                  }}
                />
                <div style={{
                  marginLeft: '8px',
                  color: '#898989',
                  fontSize: '11px',
                  fontFamily: 'MotivaSans, sans-serif',
                  lineHeight: '13px'
                }}>
                  bananacat447<br />
                  Offline<br />
                  &nbsp;
                </div>
                <svg 
                  width="36" 
                  height="36" 
                  viewBox="0 0 36 36"
                  style={{
                    marginLeft: 'auto',
                    marginRight: '4px'
                  }}
                >
                  <circle 
                    cx="18" 
                    cy="18" 
                    r="16" 
                    fill="none" 
                    stroke="#542437" 
                    strokeWidth="2"
                  />
                  <text 
                    x="18" 
                    y="22" 
                    textAnchor="middle" 
                    fill="#e5e5e5" 
                    fontSize="16px"
                    fontFamily="MotivaSans, sans-serif"
                  >
                    83
                  </text>
                </svg>
              </div>
              
              {/* Friend slot 3 */}
              <div 
                className="friend-block"
                style={{
                  width: '268px',
                  height: '44px',
                  backgroundColor: hoveredFriend === 3 ? '#3a3a3a' : 'transparent',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease',
                  padding: '4px 0px 4px 4px',
                  display: 'flex',
                  alignItems: 'center'
                }}
                onMouseEnter={() => setHoveredFriend(3)}
                onMouseLeave={() => setHoveredFriend(null)}
              >
                <img 
                  src={`${process.env.PUBLIC_URL}/friend3.png`} 
                  alt="Friend 3"
                  style={{ 
                    width: '32px', 
                    height: '32px', 
                    objectFit: 'cover',
                    border: '1px solid #84aa37',
                    outline: '1px solid #90ba3c',
                    outlineOffset: '0px'
                  }}
                />
                <div style={{
                  marginLeft: '8px',
                  color: '#90ba3c',
                  fontSize: '11px',
                  fontFamily: 'MotivaSans, sans-serif',
                  lineHeight: '13px'
                }}>
                  InterviewCrackTTV<br />
                  In-Game<br />
                  LeetCode
                </div>
                <svg 
                  width="36" 
                  height="36" 
                  viewBox="0 0 36 36"
                  style={{
                    marginLeft: 'auto',
                    marginRight: '4px'
                  }}
                >
                  <circle 
                    cx="18" 
                    cy="18" 
                    r="16" 
                    fill="none" 
                    stroke="#7652c9" 
                    strokeWidth="2"
                  />
                  <text 
                    x="18" 
                    y="22" 
                    textAnchor="middle" 
                    fill="#e5e5e5" 
                    fontSize="16px"
                    fontFamily="MotivaSans, sans-serif"
                  >
                    66
                  </text>
                </svg>
              </div>
              
              {/* Friend slot 4 */}
              <div 
                className="friend-block"
                style={{
                  width: '268px',
                  height: '44px',
                  backgroundColor: hoveredFriend === 4 ? '#3a3a3a' : 'transparent',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease',
                  padding: '4px 0px 4px 4px',
                  display: 'flex',
                  alignItems: 'center'
                }}
                onMouseEnter={() => setHoveredFriend(4)}
                onMouseLeave={() => setHoveredFriend(null)}
              >
                <img 
                  src={`${process.env.PUBLIC_URL}/friend4.png`} 
                  alt="Friend 4"
                  style={{ 
                    width: '32px', 
                    height: '32px', 
                    objectFit: 'cover',
                    border: '1px solid #84aa37',
                    outline: '1px solid #90ba3c',
                    outlineOffset: '0px'
                  }}
                />
                <div style={{
                  marginLeft: '8px',
                  color: '#90ba3c',
                  fontSize: '11px',
                  fontFamily: 'MotivaSans, sans-serif',
                  lineHeight: '13px'
                }}>
                  XDragonite682X<br />
                  In-Game<br />
                  HackerRank
                </div>
                <svg 
                  width="36" 
                  height="36" 
                  viewBox="0 0 36 36"
                  style={{
                    marginLeft: 'auto',
                    marginRight: '4px'
                  }}
                >
                  <circle 
                    cx="18" 
                    cy="18" 
                    r="16" 
                    fill="none" 
                    stroke="#467a3c" 
                    strokeWidth="2"
                  />
                  <text 
                    x="18" 
                    y="22" 
                    textAnchor="middle" 
                    fill="#e5e5e5" 
                    fontSize="16px"
                    fontFamily="MotivaSans, sans-serif"
                  >
                    46
                  </text>
                </svg>
              </div>
              
              {/* Friend slot 5 */}
              <div 
                className="friend-block"
                style={{
                  width: '268px',
                  height: '44px',
                  backgroundColor: hoveredFriend === 5 ? '#3a3a3a' : 'transparent',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease',
                  padding: '4px 0px 4px 4px',
                  display: 'flex',
                  alignItems: 'center'
                }}
                onMouseEnter={() => setHoveredFriend(5)}
                onMouseLeave={() => setHoveredFriend(null)}
              >
                <img 
                  src={`${process.env.PUBLIC_URL}/friend5.png`} 
                  alt="Friend 5"
                  style={{ 
                    width: '32px', 
                    height: '32px', 
                    objectFit: 'cover',
                    border: '1px solid #46a4b3',
                    outline: '1px solid #57cbde',
                    outlineOffset: '0px'
                  }}
                />
                <div style={{
                  marginLeft: '8px',
                  color: '#57cbde',
                  fontSize: '11px',
                  fontFamily: 'MotivaSans, sans-serif',
                  lineHeight: '13px'
                }}>
                  kev<br />
                  Online<br />
                  &nbsp;
                </div>
                <svg 
                  width="36" 
                  height="36" 
                  viewBox="0 0 36 36"
                  style={{
                    marginLeft: 'auto',
                    marginRight: '4px'
                  }}
                >
                  <circle 
                    cx="18" 
                    cy="18" 
                    r="16" 
                    fill="none" 
                    stroke="#467a3c" 
                    strokeWidth="2"
                  />
                  <text 
                    x="18" 
                    y="22" 
                    textAnchor="middle" 
                    fill="#e5e5e5" 
                    fontSize="16px"
                    fontFamily="MotivaSans, sans-serif"
                  >
                    42
                  </text>
                </svg>
              </div>
              
              {/* Friend slot 6 */}
              <div 
                className="friend-block"
                style={{
                  width: '268px',
                  height: '44px',
                  backgroundColor: hoveredFriend === 6 ? '#3a3a3a' : 'transparent',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease',
                  padding: '4px 0px 4px 4px',
                  display: 'flex',
                  alignItems: 'center'
                }}
                onMouseEnter={() => setHoveredFriend(6)}
                onMouseLeave={() => setHoveredFriend(null)}
              >
                <img 
                  src={`${process.env.PUBLIC_URL}/friend6.png`} 
                  alt="Friend 6"
                  style={{ 
                    width: '32px', 
                    height: '32px', 
                    objectFit: 'cover',
                    border: '1px solid #6a6a6a',
                    outline: '1px solid #898989',
                    outlineOffset: '0px'
                  }}
                />
                <div style={{
                  marginLeft: '8px',
                  color: '#898989',
                  fontSize: '11px',
                  fontFamily: 'MotivaSans, sans-serif',
                  lineHeight: '13px'
                }}>
                  Mimiko<br />
                  Offline<br />
                  &nbsp;
                </div>
                <svg 
                  width="36" 
                  height="36" 
                  viewBox="0 0 36 36"
                  style={{
                    marginLeft: 'auto',
                    marginRight: '4px'
                  }}
                >
                  <circle 
                    cx="18" 
                    cy="18" 
                    r="16" 
                    fill="none" 
                    stroke="#c02942" 
                    strokeWidth="2"
                  />
                  <text 
                    x="18" 
                    y="22" 
                    textAnchor="middle" 
                    fill="#e5e5e5" 
                    fontSize="16px"
                    fontFamily="MotivaSans, sans-serif"
                  >
                    14
                  </text>
                </svg>
              </div>
            </div>
          </div>
          {/* Skills Showcase header */}
          <div 
            style={{
              width: '652px',
              height: '40px',
              padding: '5px 10px 5px 10px',
              fontSize: '16px',
              color: '#dcdedf',
              background: 'transparent',
              display: 'flex',
              alignItems: 'center',
              borderRadius: '3px 3px 0px 0px',
              zIndex: '1',
              position: 'relative'
            }}
          >
            {/* Background overlay for Skills Showcase header */}
            <div 
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to right, #2f2644, #3c283a)',
                opacity: cinematicMode ? 0 : 1,
                transition: 'opacity 0.8s ease-in-out',
                pointerEvents: 'none',
                zIndex: -1,
                borderRadius: '3px 3px 0px 0px'
              }}
            />
            Skills Showcase
          </div>
          
          {/* Skills Showcase content div - seamless continuation */}
          <div 
            style={{
              width: '652px',
              height: 'auto',
              padding: '60px 10px 11px 10px',
              backgroundColor: '#0000004d',
              backdropFilter: 'blur(20px)',
              borderRadius: '3px',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '5px',
              justifyContent: 'flex-start',
              marginTop: '-40px'
            }}
          >
              {/* Skill buttons */}
              <div 
                className="skill-button"
                data-tooltip="Python"
                style={{ border: '1px solid #FFD700' }}
              >
                <img 
                  src={`${process.env.PUBLIC_URL}/Python-logo.png`} 
                  alt="Python"
                />
              </div>
              
              <div 
                className="skill-button"
                data-tooltip="Java"
                style={{ border: '1px solid #FFD700' }}
              >
                <img 
                  src={`${process.env.PUBLIC_URL}/java.png`} 
                  alt="Java"
                />
              </div>
              
              <div 
                className="skill-button"
                data-tooltip="JavaScript"
                style={{ border: '1px solid #CF6A32' }}
              >
                <img 
                  src={`${process.env.PUBLIC_URL}/javascript-logo.png`} 
                  alt="JavaScript"
                />
              </div>
              
              <div 
                className="skill-button"
                data-tooltip="C#"
                style={{ border: '1px solid white' }}
              >
                <img 
                  src={`${process.env.PUBLIC_URL}/csharp_logo.png`} 
                  alt="C#"
                />
              </div>
              
              <div 
                className="skill-button"
                data-tooltip="HTML"
                style={{ border: '1px solid #8650AC' }}
              >
                <img 
                  src={`${process.env.PUBLIC_URL}/html-logo.png`} 
                  alt="HTML"
                />
              </div>
              
              <div 
                className="skill-button"
                data-tooltip="CSS"
                style={{ border: '1px solid #8650AC' }}
              >
                <img 
                  src={`${process.env.PUBLIC_URL}/css-logo.png`} 
                  alt="CSS"
                />
              </div>
              
              <div 
                className="skill-button"
                data-tooltip="Spring Boot"
                style={{ border: '1px solid white' }}
              >
                <img 
                  src={`${process.env.PUBLIC_URL}/springboot.png`} 
                  alt="Spring Boot"
                />
              </div>
              
              <div 
                className="skill-button"
                data-tooltip="Flask"
                style={{ border: '1px solid white' }}
              >
                <img 
                  src={`${process.env.PUBLIC_URL}/flask.png`} 
                  alt="Flask"
                />
              </div>
              
              <div 
                className="skill-button"
                data-tooltip="React"
                style={{ border: '1px solid white' }}
              >
                <img 
                  src={`${process.env.PUBLIC_URL}/react-logo.png`} 
                  alt="React"
                />
              </div>
              
              <div 
                className="skill-button"
                data-tooltip="Docker"
                style={{ border: '1px solid white' }}
              >
                <img 
                  src={`${process.env.PUBLIC_URL}/docker-logo.png`} 
                  alt="Docker"
                />
              </div>
              
              <div 
                className="skill-button"
                data-tooltip="Git"
                style={{ border: '1px solid white' }}
              >
                <img 
                  src={`${process.env.PUBLIC_URL}/git-logo.png`} 
                  alt="Git"
                />
              </div>
              
              <div 
                className="skill-button"
                data-tooltip="PostgreSQL"
                style={{ border: '1px solid white' }}
              >
                <img 
                  src={`${process.env.PUBLIC_URL}/postgres-logo.png`} 
                  alt="PostgreSQL"
                />
              </div>
              
              <div 
                className="skill-button"
                data-tooltip="SQLite"
                style={{ border: '1px solid white' }}
              >
                <img 
                  src={`${process.env.PUBLIC_URL}/sqlite-logo.png`} 
                  alt="SQLite"
                />
              </div>
              
                            <div 
                className="skill-button"
                data-tooltip="Ollama"
                style={{ border: '1px solid #CF6A32' }}
              >
                <img 
                  src={`${process.env.PUBLIC_URL}/ollama.png`} 
                  alt="Ollama"
                />
              </div>
              
              {/* Skills counter */}
              <div 
                style={{
                  marginLeft: '12px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#ffffff';
                  e.currentTarget.querySelector('.skills-number').style.color = '#ffffff';
                  e.currentTarget.querySelector('.skills-label').style.color = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#9b9b9b';
                  e.currentTarget.querySelector('.skills-number').style.color = '#ffffff';
                  e.currentTarget.querySelector('.skills-label').style.color = '#9b9b9b';
                }}
              >
                <div 
                  className="skills-number"
                  style={{
                    color: '#ffffff',
                    fontSize: '34px',
                    fontFamily: 'MotivaSans, sans-serif',
                    fontWeight: '100',
                    lineHeight: '1'
                  }}
                >
                  14
                </div>
                <div 
                  className="skills-label"
                  style={{
                    color: '#9b9b9b',
                    fontSize: '17px',
                    fontFamily: 'MotivaSans, sans-serif',
                    lineHeight: '1'
                  }}
                >
                  Skills Learned
                </div>
              </div>
            </div>
            <div 
            style={{
              width: '652px',
              height: '40px',
              padding: '5px 10px 5px 10px',
              fontSize: '16px',
              color: '#ffffff',
              background: 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderRadius: '3px 3px 0px 0px',
              marginTop: '10px',
              zIndex: '1000',
              position: 'relative'
            }}
          >
            {/* Background overlay for Recent Activity header */}
            <div 
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to right, #2f2644, #3c283a)',
                opacity: cinematicMode ? 0 : 1,
                transition: 'opacity 0.8s ease-in-out',
                pointerEvents: 'none',
                zIndex: -1,
                borderRadius: '3px 3px 0px 0px'
              }}
            />
            {/* Recent Activity header */}
            <div style={{
              color: '#ffffff',
              fontSize: '16px',
              fontFamily: 'MotivaSans, sans-serif'
            }}>
              Recent Activity
            </div>
            {/* Recent Activity hours */}
            <div style={{
              color: '#ffffff',
              fontSize: '16px',
              fontFamily: 'MotivaSans, sans-serif'
            }}>
              162.7 Hours past 2 weeks
            </div>
          </div>
          
          {/* Recent Activity Background Div */}
          <div style={{
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            backdropFilter: 'blur(20px)',
            width: '652px',
            height: '536px',
            padding: '68px 10px 11px 10px',
            marginTop: '-40px',
            borderRadius: '3px'
          }}>
            {/* Inner darker gray div */}
            <div style={{
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              backdropFilter: 'blur(20px)',
              width: '632px',
              height: '85px',
              padding: '8px 10px',
              marginBottom: '21px',
              borderRadius: '3px',
              position: 'relative'
            }}>
              <img 
                src={`${process.env.PUBLIC_URL}/vs-logo.png`} 
                alt="VS Code Logo"
                style={{ 
                  width: '184px', 
                  height: '69px', 
                  objectFit: 'cover',
                  float: 'left'
                }}
              />
              <div 
                style={{
                  fontSize: '14px',
                  color: '#ebebeb',
                  paddingTop: '10px',
                  paddingLeft: '192px',
                  fontWeight: '300',
                  fontFamily: 'MotivaSans, sans-serif',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = '#66c0f4';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = '#ebebeb';
                }}
                onClick={() => window.open('https://code.visualstudio.com/', '_blank')}
              >
                Visual Studio
              </div>
              <div style={{
                fontSize: '13px',
                color: '#969696',
                fontFamily: 'MotivaSans, sans-serif',
                position: 'absolute',
                bottom: '8px',
                right: '10px',
                textAlign: 'right'
              }}>
                1,248.3 hrs on record<br />
                last played on {currentDate}
              </div>
            </div>
            <div style={{
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              backdropFilter: 'blur(20px)',
              width: '632px',
              height: '145px',
              padding: '8px 10px',
              marginBottom: '21px',
              borderRadius: '3px'
            }}>
              {/* Top horizontal div - transparent */}
              <div style={{
                width: '612px',
                height: '69px',
                backgroundColor: 'transparent',
                position: 'relative'
              }}>
                <img 
                  src={`${process.env.PUBLIC_URL}/leetcode-logo.png`} 
                  alt="LeetCode Logo"
                  style={{ 
                    width: '184px', 
                    height: '69px', 
                    objectFit: 'cover',
                    float: 'left'
                  }}
                />
                <div 
                  style={{
                    fontSize: '14px',
                    color: '#ebebeb',
                    paddingTop: '10px',
                    paddingLeft: '192px',
                    fontWeight: '300',
                    fontFamily: 'MotivaSans, sans-serif',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = '#66c0f4';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = '#ebebeb';
                  }}
                  onClick={() => window.open('https://leetcode.com/', '_blank')}
                >
                  LeetCode
                </div>
                <div style={{
                  fontSize: '13px',
                  color: '#969696',
                  fontFamily: 'MotivaSans, sans-serif',
                  position: 'absolute',
                  bottom: '0px',
                  right: '0px',
                  textAlign: 'right'
                }}>
                  30.3 hrs on record<br />
                  last played on {currentDate}
                </div>
              </div>
                            {/* Bottom horizontal div */}
              <div style={{
                width: '612px',
                height: '51px',
                marginTop: '9px',
                borderRadius: '3px',
                padding: '9px 11px 10px',
                backgroundColor: '#4d2a34',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                flexWrap: 'nowrap'
              }}>
                <div style={{
                  width: '361px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <div style={{
                    fontSize: '13px',
                    color: '#EBEBEB',
                    fontFamily: 'MotivaSans, sans-serif'
                  }}>
                    Achievement Progress
                  </div>
                  <div style={{
                    fontSize: '13px',
                    color: '#969696',
                    fontFamily: 'MotivaSans, sans-serif',
                    marginLeft: '8px'
                  }}>
                    1 of 1
                  </div>
                  <div style={{
                    height: '12px',
                    padding: '1px',
                    width: '145px',
                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                    border: '1px solid rgba(0, 0, 0, 0.7)',
                    borderTop: '1px solid rgba(0, 0, 0, 0.8)',
                    borderBottom: '1px solid rgba(0, 0, 0, 0.8)',
                    borderRadius: '5px',
                    boxShadow: '1px 1px 1px rgba(255, 255, 255, .1)',
                    marginLeft: '8px',
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    <div style={{
                      height: '8px',
                      borderRadius: '4px',
                      background: 'linear-gradient(180deg, rgba(255, 255, 255, .4) 0%, #5a4a6a 50%, #3c283a 100%)',
                      width: '100%'
                    }}>
                    </div>
                  </div>
                </div>
                <div 
                  className="achievement-icon"
                  data-tooltip="Welcome to Hell..."
                  style={{ 
                    width: '32px', 
                    height: '32px',
                    cursor: 'pointer'
                  }}
                >
                  <img 
                    src={`${process.env.PUBLIC_URL}/leetcode.png`} 
                    alt="LeetCode"
                    style={{ 
                      width: '100%', 
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </div>
              </div>
            </div>
            <div style={{
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              backdropFilter: 'blur(20px)',
              width: '632px',
              height: '145px',
              padding: '8px 10px',
              marginBottom: '21px',
              borderRadius: '3px'
            }}>
              {/* Top horizontal div - transparent */}
              <div style={{
                width: '612px',
                height: '69px',
                backgroundColor: 'transparent',
                position: 'relative'
              }}>
                <img 
                  src={`${process.env.PUBLIC_URL}/vt-logo.png`} 
                  alt="Virginia Tech Logo"
                  style={{ 
                    width: '184px', 
                    height: '69px', 
                    objectFit: 'cover',
                    float: 'left'
                  }}
                />
                <div 
                  style={{
                    fontSize: '14px',
                    color: '#ebebeb',
                    paddingTop: '10px',
                    paddingLeft: '192px',
                    fontWeight: '300',
                    fontFamily: 'MotivaSans, sans-serif',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = '#66c0f4';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = '#ebebeb';
                  }}
                  onClick={() => window.open('https://cs.vt.edu/', '_blank')}
                >
                  Virginia Tech
                </div>
                <div style={{
                  fontSize: '13px',
                  color: '#969696',
                  fontFamily: 'MotivaSans, sans-serif',
                  position: 'absolute',
                  bottom: '0px',
                  right: '0px',
                  textAlign: 'right'
                }}>
                  93.2 hrs on record<br />
                  last played on {currentDate}
                </div>
              </div>
              {/* Bottom horizontal div */}
              <div style={{
                width: '612px',
                height: '51px',
                marginTop: '9px',
                borderRadius: '3px',
                padding: '9px 11px 10px',
                backgroundColor: '#4d2a34',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                flexWrap: 'nowrap'
              }}>
                <div style={{
                  width: '361px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <div style={{
                    fontSize: '13px',
                    color: '#EBEBEB',
                    fontFamily: 'MotivaSans, sans-serif'
                  }}>
                    Achievement Progress
                  </div>
                  <div style={{
                    fontSize: '13px',
                    color: '#969696',
                    fontFamily: 'MotivaSans, sans-serif',
                    marginLeft: '8px'
                  }}>
                    1 of 2
                  </div>
                                                                                 <div style={{
                        height: '12px',
                        padding: '1px',
                        width: '145px',
                        backgroundColor: 'rgba(0, 0, 0, 0.3)',
                        border: '1px solid rgba(0, 0, 0, 0.7)',
                        borderTop: '1px solid rgba(0, 0, 0, 0.8)',
                        borderBottom: '1px solid rgba(0, 0, 0, 0.8)',
                        borderRadius: '5px',
                        boxShadow: '1px 1px 1px rgba(255, 255, 255, .1)',
                        marginLeft: '8px',
                        display: 'flex',
                        alignItems: 'center'
                      }}>
                      <div style={{
                        height: '8px',
                        borderRadius: '4px',
                        background: 'linear-gradient(180deg, rgba(255, 255, 255, .4) 0%, #5a4a6a 50%, #3c283a 100%)',
                        width: '50%'
                      }}>
                      </div>
                    </div>
                </div>
                                 <div 
                   className="achievement-icon"
                   data-tooltip="You're a Hokie!"
                   style={{ 
                     width: '32px', 
                     height: '32px',
                     cursor: 'pointer'
                   }}
                 >
                   <img 
                     src={`${process.env.PUBLIC_URL}/hokie.png`} 
                     alt="Hokie"
                     style={{ 
                       width: '100%', 
                       height: '100%',
                       objectFit: 'cover'
                     }}
                   />
                 </div>
              </div>
            </div>
            <div className="recent-activity-nav">
              <span className="nav-text">View</span>
              <span className="nav-link">All Recently Played</span>
              <span className="nav-text">|</span>
              <span className="nav-link">Wishlist</span>
            </div>
          </div>

          <div 
            className="comment-section-header"
            style={{
              width: '652px',
              height: '42px',
              padding: '6px 10px',
              background: 'transparent',
              borderRadius: '5px 5px 0px 0px',
              marginTop: '84px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              position: 'relative'
            }}>
            {/* Background overlay for Comments section header */}
            <div 
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to right, #2f2644, #3c283a)',
                opacity: cinematicMode ? 0 : 1,
                transition: 'opacity 0.8s ease-in-out',
                pointerEvents: 'none',
                zIndex: -1,
                borderRadius: '5px 5px 0px 0px'
              }}
            />
            <span style={{
              fontSize: '16px',
              color: '#FFFFFF'
            }}>
              Comments
            </span>
            <div 
              className="subscribe-container"
              style={{
                width: '143.23px',
                height: '30px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
              <div
                className="custom-checkbox"
                style={{
                  width: '12px',
                  height: '12px',
                  border: '1px solid rgba(255, 255, 255, .1)',
                  borderTopColor: 'rgba(255, 255, 255, 0.2)',
                  borderLeftColor: 'rgba(255, 255, 255, 0.2)',
                  background: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: '0px 1px 0px 1px',
                  margin: 0,
                  padding: 0,
                  position: 'relative',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start'
                }}
                onClick={() => {
                  const checkbox = document.querySelector('.custom-checkbox');
                  checkbox.classList.toggle('checked');
                }}
              >
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 11 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    opacity: 0
                  }}
                  className="checkmark"
                >
                  <path
                    d="M1 7L5 11L13 -3"
                    stroke="#509fbe"
                    strokeWidth="2"
                    strokeLinecap="flat"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span 
                style={{
                  fontSize: '12px',
                  color: '#FFFFFF',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer'
                }}
                onClick={() => {
                  const checkbox = document.querySelector('.custom-checkbox');
                  checkbox.classList.toggle('checked');
                }}
              >
                Subscribe to thread
              </span>
              <span 
                className="subscribe-tooltip"
                style={{
                  fontSize: '10px',
                  color: '#FFFFFF',
                  alignSelf: 'flex-start',
                  marginTop: '2px'
                }}
                data-tooltip="Subscribe to a thread to receive a comment notification whenever someone posts a new comment. (This does nothing)"
              >
                (<span style={{ color: '#66c0f4' }}>?</span>)
              </span>
            </div>
          </div>
          <div className="comment-section"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              backdropFilter: 'blur(20px)',
              width: '652px',
              padding: '19px 10px 10px 10px',
              borderRadius: '0px 0px 5px 5px'
            }}>
                            <div className="comment-container">
                <img 
                  src={`${process.env.PUBLIC_URL}/friend6.png`} 
                  alt="Comment 1"
                />
                <div className="comment-content">
                  <div className="comment-name-date">
                    <div className="comment-name">Mimiko</div>
                    <div className="comment-date">{subtractDays(2)} @ 8:34am</div>
                  </div>
                  <div className="comment-text">+rep THIS SITE IS PRETTY COOL BRO</div>
                </div>
              </div>
              <div className="comment-container">
                <img 
                  src={`${process.env.PUBLIC_URL}/friend2.png`} 
                  alt="Comment 2"
                />
                <div className="comment-content">
                  <div className="comment-name-date">
                    <div className="comment-name">bananacat447</div>
                    <div className="comment-date">{subtractDays(8)} @ 6:33pm</div>
                  </div>
                  <div className="comment-text">IM BANANA CAT :3 IM BANANA CAT :3 IM BANANA CAT :3 IM BANANA CAT :3 IM BANANA CAT :3 IM BANANA CAT :3 IM BANANA CAT :3 IM BANANA CAT :3 IM BANANA CAT :3 IM BANANA CAT :3 IM BANANA CAT :3 IM BANANA CAT :3</div>
                </div>
              </div>
              <div className="comment-container">
                <img 
                  src={`${process.env.PUBLIC_URL}/comment1.png`} 
                  alt="Comment 3"
                  style={{ 
                    border: '1px solid #46a4b3',
                    outline: '1px solid #57cbde'
                  }}
                />
                <div className="comment-content">
                  <div className="comment-name-date">
                    <div className="comment-name">BMW M3 F80</div>
                    <div className="comment-date">{subtractDays(38)} @ 3:12pm</div>
                  </div>
                  <div className="comment-text">best codewars player?</div>
                </div>
              </div>
              <div className="comment-container">
                <img 
                  src={`${process.env.PUBLIC_URL}/comment2.png`} 
                  alt="Comment 4"
                />
                <div className="comment-content">
                  <div className="comment-name-date">
                    <div className="comment-name">GilbertSprayContr0l</div>
                    <div className="comment-date">{subtractDays(149)} @ 12:59am</div>
                  </div>
                  <div className="comment-text">
                    {`⣿⣿⣿⡉⢀⣾⣿⡟⣩⣭⣭⡈⠙⢿⣿⣿⣿⣿⣿⡿⣻⣿⣿⣿⣿⣿⣿⣿⡇⠄
⣿⣿⡗⠄⣼⣿⣿⢸⡿⠉⠉⢻⡆⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⢠⠄
⣿⡻⠁⢠⣿⣿⣿⣦⡛⠢⠴⠛⠁⣸⣿⣿⣿⣿⡿⠛⢉⣉⣉⡙⢻⣿⣿⣗⠄⠄
⠷⠁⠄⢰⣿⣿⣿⣷⣬⣭⣼⣷⣿⣿⣿⣿⣿⡏⢀⣾⠟⠛⢿⣿⣄⣿⣿⡏⠄⠄
⠄⠄⠄⢹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⠄⠳⢀⣀⡼⢟⣼⣿⡟⠄⠄⠄
⠄⠄⠄⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣮⣒⣲⣶⣾⣿⣿⠏⠄⠄⠄⢠
⠄⠄⠄⠸⣿⣽⣿⣿⣿⣿⣉⣿⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠟⠁⠄⠄⠄⢠⣷
⠄⠄⠄⠄⢻⣷⢻⣿⣿⣿⣿⣿⣷⣿⣿⣿⣿⣿⣿⣿⣿⠏⠄⠄⠄⠄⠄⢀⣾⣿
⠄⠄⠄⠄⠄⢻⣧⡙⢿⣿⣿⣿⣿⣿⡿⣿⣿⣿⠿⠛⠁⠄⠄⠄⠄⠄⢠⣿⣿⣿
⠄⠄⠄⡀⠄⠈⣿⣿⣶⣭⣭⣭⣿⣾⡿⠟⠋⠁⠄⠄⠄⠄⠄⠄⠄⢠⣿⣿⣿⣿
⠄⠄⠎⠄⠄⣨⣿⣿⣿⣿⣿⣿⠋⠁⠄⠄⠄⠄⠄⠄⠄⠄⠄⣀⡲⣿⣿⣿⣿`}
                  </div>
                </div>
              </div>
              <div className="comment-container">
                <img 
                  src={`${process.env.PUBLIC_URL}/comment3.png`} 
                  alt="Comment 5"
                  style={{ 
                    border: '1px solid #46a4b3',
                    outline: '1px solid #57cbde'
                  }}
                />
                <div className="comment-content">
                  <div className="comment-name-date">
                    <div className="comment-name">juntaio</div>
                    <div className="comment-date">May 6, 2024 @ 11:16pm</div>
                  </div>
                  <div className="comment-text">+rep keep it up bro..</div>
                </div>
              </div>
            </div>
          
        </div>
      </div> {/* Close center-column */}
      
      {/* Top profile background section (PNG or MP4 based on cinematic mode) */}
      <section className="profile-hero">
        {/* MP4 Background with its own fade */}
        <div style={{ 
          position: 'absolute', 
          top: '108px', 
          left: 0, 
          right: 0, 
          height: '100vh',
          opacity: cinematicMode ? 1 : 0,
          transition: 'opacity 0.8s ease-in-out'
        }}>
          <video
            className="profile-video"
            autoPlay
            muted
            loop
            playsInline
            poster={`${process.env.PUBLIC_URL}/profile_background.jpg`}
            onError={(e) => console.error('Video error:', e)}
            onLoadStart={() => console.log('Video loading started')}
            onCanPlay={() => console.log('Video can play')}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          >
            <source src={`${process.env.PUBLIC_URL}/profile_background.mp4`} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* MP4 fade overlay */}
          <div style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: '40vh',
            background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 60%, rgba(0,0,0,0.2) 70%, rgba(0,0,0,0.5) 80%, rgba(0,0,0,0.8) 90%, rgba(0,0,0,0.95) 95%, rgba(0,0,0,1) 100%)',
            pointerEvents: 'none',
            zIndex: 1
          }} />
        </div>

        {/* PNG Background with its own fade */}
        <div style={{ 
          position: 'absolute', 
          top: '108px', 
          left: 0, 
          right: 0, 
          height: '100vh',
          opacity: cinematicMode ? 0 : 1,
          transition: 'opacity 0.8s ease-in-out'
        }}>
          <img
            className="profile-image"
            src={`${process.env.PUBLIC_URL}/profile_background.jpg`}
            alt="profile backdrop"
          />
          {/* PNG fade overlay */}
          <div style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: '60vh',
            background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.8) 70%, rgba(0,0,0,0.95) 80%, rgba(0,0,0,1) 100%)',
            pointerEvents: 'none',
            zIndex: 1
          }} />
        </div>
      </section>

          {/* Spacer to allow scrolling below the image */}
          <div className="scroll-spacer page-body" />
        </>
      )}
      
      {/* Store Page */}
      {currentPage === 'store' && (
        <Store />
      )}
      
      {/* Library Page */}
      {currentPage === 'library' && (
        <Library />
      )}
      
      {/* Community Page */}
      {currentPage === 'community' && (
        <Community />
      )}
      
      {/* Chat Popup */}
      <ChatPopup isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
}

export default App;
