import React, { useState, useEffect, useRef } from 'react';
import './ChatPopup.css';

const ChatPopup = ({ isOpen, onClose }) => {
  const [message, setMessage] = useState('');
  const [isInputExpanded, setIsInputExpanded] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    message: ''
  });
  const [tooltip, setTooltip] = useState({ show: false, message: '', type: 'error' });
  
  // Get current date in the format you want
  const getCurrentDate = () => {
    const now = new Date();
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return now.toLocaleDateString('en-US', options);
  };
  
  // Drag state
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const windowRef = useRef(null);

  // Initialize position to center of screen
  useEffect(() => {
    if (isOpen && windowRef.current) {
      const centerX = (window.innerWidth - 500) / 2; // Changed from 400 to 500
      const centerY = (window.innerHeight - 600) / 2; // Changed from 500 to 600
      setPosition({ x: centerX, y: centerY });
    }
  }, [isOpen]);

  // Close popup when Escape key is pressed
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  // Prevent body scroll when popup is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Drag handlers
  const handleMouseDown = (e) => {
    // Don't start dragging if clicking on close buttons
    if (e.target.closest('.chat-popup-close-tab') || e.target.closest('.chat-popup-control.close')) {
      return;
    }
    
    if (e.target.closest('.chat-popup-header') || e.target.closest('.chat-popup-tab')) {
      setIsDragging(true);
      setDragOffset({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      });
      e.preventDefault();
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;
      
      // Keep window within viewport bounds
      const maxX = window.innerWidth - 500; // Changed from 400 to 500
      const maxY = window.innerHeight - 600; // Changed from 500 to 600
      
      setPosition({
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY))
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Add global mouse event listeners for dragging
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isOpen, isDragging, dragOffset]);

  const handleSendMessage = () => {
    if (message.trim()) {
      // Here you would typically send the message to your backend
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  const handleFormInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFormSubmit = async () => {
    // Basic validation
    if (!formData.email || !formData.name || !formData.message) {
      setTooltip({ show: true, message: 'Please fill in all fields', type: 'error' });
      setTimeout(() => {
        setTooltip(prev => ({ ...prev, show: false }));
        setTimeout(() => setTooltip({ show: false, message: '', type: 'error' }), 300);
      }, 3000);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setTooltip({ show: true, message: 'Please enter a valid email address', type: 'error' });
      setTimeout(() => {
        setTooltip(prev => ({ ...prev, show: false }));
        setTimeout(() => setTooltip({ show: false, message: '', type: 'error' }), 300);
      }, 3000);
      return;
    }

    try {
      // Show loading state
      setTooltip({ show: true, message: 'Sending message...', type: 'info' });
      
      // Send form data to email API
      const response = await fetch('/api/email/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        // Show success message
        setTooltip({ show: true, message: 'Message sent successfully!', type: 'success' });
        
        // Reset form
        setFormData({
          email: '',
          name: '',
          message: ''
        });
        
        // Close the expanded area after a short delay
        setTimeout(() => {
          setTooltip(prev => ({ ...prev, show: false }));
          setTimeout(() => {
            setIsInputExpanded(false);
            setTooltip({ show: false, message: '', type: 'success' });
          }, 300);
        }, 1500);
      } else {
        throw new Error(result.message || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setTooltip({ 
        show: true, 
        message: error.message || 'Failed to send message. Please try again.', 
        type: 'error' 
      });
      
      setTimeout(() => {
        setTooltip(prev => ({ ...prev, show: false }));
        setTimeout(() => setTooltip({ show: false, message: '', type: 'error' }), 300);
      }, 3000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="chat-popup-overlay">
      <div 
        ref={windowRef}
        className="chat-popup-window" 
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          cursor: 'default'
        }}
        onMouseDown={handleMouseDown}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Window Header */}
        <div className="chat-popup-header">
          <div className="chat-popup-tab">
            <div className="chat-popup-icon">
              <img 
                src="/profile_picture.png" 
                alt="Profile" 
                style={{
                  width: '25px',
                  height: '25px',
                  border: '1px solid #383c43',
                  borderRight: '2px solid #6dcff6',
                  objectFit: 'cover'
                }}
              />
            </div>
            <span className="chat-popup-title">Aidan Nguyen</span>
            <button className="chat-popup-close-tab" onClick={onClose}>×</button>
          </div>
          <div className="chat-popup-controls">
            <button className="chat-popup-control minimize">−</button>
            <button className="chat-popup-control maximize">□</button>
            <button className="chat-popup-control close" onClick={onClose}>×</button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="chat-popup-content">
          <div className="chat-popup-date">{getCurrentDate()}</div>
        </div>

        {/* Input Area */}
        <div 
          className={`chat-popup-input-area ${isInputExpanded ? 'expanded' : ''}`}
          onClick={() => {
            if (!isInputExpanded) {
              setIsInputExpanded(true);
            }
          }}
        >
          <div className="chat-popup-input">
            <input
              type="text"
              className="chat-popup-input-text"
              readOnly
            />
            <button className="chat-popup-send-button" onClick={handleSendMessage}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M2 21L23 12L1 3L2.5 11.5L16 12L2.5 13.5L1 21Z" fill="#5f5f5f" stroke="#5f5f5f" strokeWidth="0.5" strokeLinejoin="round" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
          <div className="chat-popup-side-box">
            <div className="chat-popup-inner-box">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" fill="#848484"/>
                <circle cx="8" cy="10" r="1.7" fill="#2b2f35"/>
                <circle cx="16" cy="10" r="1.7" fill="#2b2f35"/>
                <path d="M7 15L7 17L10 19L12 19L14 19L17 17L17 15Z" fill="#2b2f35"/>
              </svg>
            </div>
            <div className="chat-popup-inner-box">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M16.5 6V17.5C16.5 19.71 14.71 21.5 12.5 21.5C10.29 21.5 8.5 19.71 8.5 17.5V5C8.5 3.62 9.62 2.5 11 2.5C12.38 2.5 13.5 3.62 13.5 5V15.5C13.5 16.05 13.05 16.5 12.5 16.5C11.95 16.5 11.5 16.05 11.5 15.5V6H10V15.5C10 16.88 11.12 18 12.5 18C13.88 18 15 16.88 15 15.5V5C15 2.79 13.21 1 11 1C8.79 1 7 2.79 7 5V17.5C7 20.54 9.46 23 12.5 23C15.54 23 18 20.54 18 17.5V6H16.5Z" fill="#848484"/>
              </svg>
            </div>
          </div>
          <div className="chat-mic-container">
                     <svg viewBox="0 0 640 640">
             <path d="M320 64C267 64 224 107 224 160L224 288C224 341 267 384 320 384C373 384 416 341 416 288L416 160C416 107 373 64 320 64zM176 248C176 234.7 165.3 224 152 224C138.7 224 128 234.7 128 248L128 288C128 385.9 201.3 466.7 296 478.5L296 528L248 528C234.7 528 224 538.7 224 552C224 565.3 234.7 576 248 576L392 576C405.3 576 416 565.3 416 552C416 538.7 405.3 528 392 528L344 528L344 478.5C438.7 466.7 512 385.9 512 288L512 248C512 234.7 501.3 224 488 224C474.7 224 464 234.7 464 248L464 288C464 367.5 399.5 432 320 432C240.5 432 176 367.5 176 288L176 248z" fill="#36393e"/>
           </svg>
          </div>
          <div 
            className="chat-popup-expanded-inputs"
            onClick={(e) => e.stopPropagation()}
          >
            <input
              type="email"
              className="chat-popup-expanded-input"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => handleFormInputChange('email', e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
            <input
              type="text"
              className="chat-popup-expanded-input"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => handleFormInputChange('name', e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
            <textarea
              className="chat-popup-expanded-input message"
              placeholder="Message (max 300 words)"
              value={formData.message}
              onChange={(e) => {
                const words = e.target.value.trim().split(/\s+/).filter(word => word.length > 0);
                if (words.length <= 300 || e.target.value.length < formData.message.length) {
                  handleFormInputChange('message', e.target.value);
                }
              }}
              onClick={(e) => e.stopPropagation()}
            />
            <div style={{ 
              fontSize: '12px', 
              color: '#9eaec8', 
              textAlign: 'right',
              marginTop: '5px'
            }}>
              {formData.message.trim().split(/\s+/).filter(word => word.length > 0).length}/300 words
            </div>
            <div className="chat-popup-expanded-buttons">
              <button 
                className="chat-popup-expanded-button submit"
                onClick={(e) => {
                  e.stopPropagation();
                  handleFormSubmit();
                }}
                style={{ position: 'relative' }}
              >
                Submit
                <div className={`chat-popup-tooltip ${tooltip.type} ${tooltip.show ? 'show' : ''}`}>
                  {tooltip.message}
                </div>
              </button>
              <button 
                className="chat-popup-expanded-button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsInputExpanded(false);
                }}
              >
                Close
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ChatPopup;
