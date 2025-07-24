import React, { useState, useEffect } from 'react';
import './Header.css';
import ThemeToggleButton from "../ui/theme-toggle-button";

// Add GSAP scripts to index.html or install via npm
// For now, we'll implement without GSAP and add it later

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Progress navigation functionality
  useEffect(() => {
    const initProgressNavigation = () => {
      const navProgress = document.querySelector('[data-progress-nav-list]');
      if (!navProgress) return;

      const indicator = navProgress.querySelector('.progress-nav__indicator');
      if (!indicator) return;

      const updateIndicator = (activeLink) => {
        const parentWidth = navProgress.offsetWidth;
        const parentHeight = navProgress.offsetHeight;
        
        const parentRect = navProgress.getBoundingClientRect();
        const linkRect = activeLink.getBoundingClientRect();
        const linkPos = {
          left: linkRect.left - parentRect.left,
          top: linkRect.top - parentRect.top
        };
        
        const linkWidth = activeLink.offsetWidth;
        const linkHeight = activeLink.offsetHeight;
        
        const leftPercent = (linkPos.left / parentWidth) * 100;
        const topPercent = (linkPos.top / parentHeight) * 100;
        const widthPercent = (linkWidth / parentWidth) * 100;
        const heightPercent = (linkHeight / parentHeight) * 100;
        
        // Ensure positive positioning and reasonable values
        const safeLeft = Math.max(0, Math.min(leftPercent, 100));
        const safeWidth = Math.max(15, Math.min(widthPercent, 25));
           
        indicator.style.left = safeLeft + '%';
        indicator.style.top = topPercent + '%';
        indicator.style.width = safeWidth + '%';
        indicator.style.height = heightPercent + '%';
      };

      const handleScroll = () => {
        const sections = ['home', 'skills', 'projects', 'blog', 'contact'];
        let activeSection = 'home';

        // Find which section is currently in view
        sections.forEach(sectionId => {
          const element = document.getElementById(sectionId);
          if (element) {
            const rect = element.getBoundingClientRect();
            const sectionTop = rect.top;
            const sectionBottom = rect.bottom;
            
            // Section is active if its top is near the top of viewport
            if (sectionTop <= 150 && sectionBottom >= 150) {
              activeSection = sectionId;
            }
          }
        });



        const activeLink = navProgress.querySelector(`[data-progress-nav-target="#${activeSection}"]`);
        if (activeLink) {
          navProgress.querySelectorAll('[data-progress-nav-target]').forEach(link => {
            link.classList.remove('is--active');
          });
          activeLink.classList.add('is--active');
          
          // Add has-moved class to allow scroll-based positioning
          if (window.scrollY > 50) {
            navProgress.classList.add('has-moved');
          } else {
            navProgress.classList.remove('has-moved');
          }
          
          updateIndicator(activeLink);
        }
      };

      // Set initial position to Home immediately
      const homeLink = navProgress.querySelector('[data-progress-nav-target="#home"]');
      if (homeLink) {
        homeLink.classList.add('is--active');
        // Force immediate update of indicator position
        updateIndicator(homeLink);
      }

      window.addEventListener('scroll', handleScroll);
      
      // Ensure initial positioning works with multiple attempts
      const ensureInitialPosition = () => {
        if (navProgress.offsetWidth > 0) {
          const homeLink = navProgress.querySelector('[data-progress-nav-target="#home"]');
          if (homeLink) {
            homeLink.classList.add('is--active');
            updateIndicator(homeLink);
            // Force CSS override - use exact button dimensions
            const homeButton = navProgress.querySelector('button[data-progress-nav-target="#home"]');
            if (homeButton) {
              const buttonRect = homeButton.getBoundingClientRect();
              const parentRect = navProgress.getBoundingClientRect();
              const left = ((buttonRect.left - parentRect.left) / parentRect.width) * 100;
              const width = (buttonRect.width / parentRect.width) * 100;
              indicator.style.left = left + '%';
              indicator.style.top = '0%';
              indicator.style.width = width + '%';
              indicator.style.height = '100%';
            }
          }
          handleScroll();
        } else {
          setTimeout(ensureInitialPosition, 50);
        }
      };
      
      // Multiple attempts to ensure it works
      ensureInitialPosition();
      setTimeout(ensureInitialPosition, 100);
      setTimeout(ensureInitialPosition, 500);
      
      // Force HOME to be active on page load
      setTimeout(() => {
        const homeLink = navProgress.querySelector('[data-progress-nav-target="#home"]');
        if (homeLink) {
          // Remove active from all buttons
          navProgress.querySelectorAll('[data-progress-nav-target]').forEach(link => {
            link.classList.remove('is--active');
          });
          // Add active to home
          homeLink.classList.add('is--active');
          updateIndicator(homeLink);
        }
      }, 1000);

      return () => window.removeEventListener('scroll', handleScroll);
    };

    initProgressNavigation();
  }, []);

  return (
    <header className={`progress-nav ${isScrolled ? 'scrolled' : ''}`}>
      <div className="progress-nav__inner">
        <div className="logo">
          <span className="blonden-logo">AIDAN NGUYEN</span>
        </div>
        
        <div className="progress-nav__wrapper">
          <div data-progress-nav-list className="progress-nav__list">
            <div className="progress-nav__indicator"></div>
            <div data-progress-nav-target="#home" className="progress-nav__btn is--before"></div>
            <button data-progress-nav-target="#home" onClick={() => scrollToSection('home')} className="progress-nav__btn">
              <span className="progress-nav__btn-text">Home</span>
              <span className="progress-nav__btn-text is--duplicate">Home</span>
            </button>
            <button data-progress-nav-target="#skills" onClick={() => scrollToSection('skills')} className="progress-nav__btn">
              <span className="progress-nav__btn-text">Skills</span>
              <span className="progress-nav__btn-text is--duplicate">Skills</span>
            </button>
            <button data-progress-nav-target="#projects" onClick={() => scrollToSection('projects')} className="progress-nav__btn">
              <span className="progress-nav__btn-text">Projects</span>
              <span className="progress-nav__btn-text is--duplicate">Projects</span>
            </button>
            <button data-progress-nav-target="#blog" onClick={() => scrollToSection('blog')} className="progress-nav__btn">
              <span className="progress-nav__btn-text">Blog</span>
              <span className="progress-nav__btn-text is--duplicate">Blog</span>
            </button>
            <button data-progress-nav-target="#contact" onClick={() => scrollToSection('contact')} className="progress-nav__btn">
              <span className="progress-nav__btn-text">Contact</span>
              <span className="progress-nav__btn-text is--duplicate">Contact</span>
            </button>
          </div>
        </div>
        
        <ThemeToggleButton 
          isDarkMode={isDarkMode} 
          onToggle={toggleDarkMode}
          className="dark-mode-toggle"
        />
      </div>
    </header>
  );
};

export default Header; 