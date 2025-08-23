import React, { useState, useEffect } from 'react';
import './Library.css';

const Library = () => {
  const [currentDate, setCurrentDate] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({
    projects: true,
    experience: true
  });
  
  // Search bar states
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [languageFilters, setLanguageFilters] = useState({
    javascript: false,
    python: false,
    java: false,
    react: false,
    spring: false,
    flask: false
  });

  // Collapsible sections state
  const [collapsedSections, setCollapsedSections] = useState({
    projects: false,
    experience: false
  });

  // Selected item state
  const [selectedItem, setSelectedItem] = useState(null);

  // Sample data for projects and experience
  const projectsData = [
    {
      id: 101,
      title: 'Portfolio Website',
      image: '/portfolio-preview.png',
      technologies: ['react', 'javascript']
    },
    {
      id: 102,
      title: 'Tsukora',
      image: '/tsukora-preview.png',
      technologies: ['react', 'javascript']
    },
    {
      id: 103,
      title: 'Spring Boot Backend',
      image: '/springboot.png',
      technologies: ['java', 'spring']
    },
    {
      id: 104,
      title: 'Flask Web App',
      image: '/flask.png',
      technologies: ['python', 'flask']
    },
    {
      id: 105,
      title: 'AI Integration',
      image: '/ollama.png',
      technologies: ['python']
    },
    {
      id: 106,
      title: 'Containerized Apps',
      image: '/docker-logo.png',
      technologies: ['docker']
    }
  ];

  const experienceData = [
    {
      id: 201,
      title: 'Software Engineer Intern',
      image: '/vs-logo.png',
      technologies: ['java', 'spring']
    }
  ];

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

  // Close filter menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const filterMenu = document.querySelector('.filter-menu');
      const filterButton = document.querySelector('.search-bar .filter-button');
      
      if (isFilterOpen && 
          filterMenu && 
          !filterMenu.contains(event.target) && 
          filterButton && 
          !filterButton.contains(event.target)) {
        setIsFilterOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isFilterOpen]);

  // Filter data based on search query and selected filters
  const filterData = (data) => {
    return data.filter(item => {
      const matchesSearch = !searchQuery.trim() || 
        item.title.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesFilters = selectedFilters.length === 0 || 
        selectedFilters.some(filter => item.technologies.includes(filter));
      
      return matchesSearch && matchesFilters;
    });
  };

  // Get filtered data
  const filteredProjects = filterData(projectsData);
  const filteredExperience = filterData(experienceData);

  // Toggle collapsible section
  const toggleSection = (section) => {
    setCollapsedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Handle item selection
  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  // Get dropdown display text based on selections and search
  const getDropdownText = () => {
    if (searchQuery.trim()) {
      return 'Search Results';
    }
    
    const { projects, experience } = selectedOptions;
    if (projects && experience) {
      return 'Projects and Experience';
    } else if (projects) {
      return 'Projects';
    } else if (experience) {
      return 'Experience';
    } else {
      return 'Select options';
    }
  };

  // Toggle dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Toggle option selection
  const toggleOption = (option) => {
    setSelectedOptions(prev => ({
      ...prev,
      [option]: !prev[option]
    }));
  };

  // Search bar handlers
  const handleSearchFocus = () => {
    setIsSearchFocused(true);
    setIsSearchMode(true);
    setIsFilterOpen(false);
  };

  const handleSearchBlur = () => {
    setIsSearchFocused(false);
    if (!searchQuery.trim() && selectedFilters.length === 0) {
      setIsSearchMode(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setIsSearchMode(false);
  };

  // Filter handlers
  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
    setIsSearchFocused(false);
  };

  const toggleLanguageFilter = (language) => {
    const currentState = languageFilters[language];
    const newState = !currentState;
    
    setLanguageFilters(prev => ({
      ...prev,
      [language]: newState
    }));
    
    // Add or remove tag based on the new state
    if (newState) {
      // Adding the filter
      setSelectedFilters(prev => {
        if (!prev.includes(language)) {
          return [...prev, language];
        }
        return prev;
      });
    } else {
      // Removing the filter
      setSelectedFilters(prev => prev.filter(filter => filter !== language));
    }
  };

  const addFilterTag = (language) => {
    if (!selectedFilters.includes(language)) {
      setSelectedFilters(prev => [...prev, language]);
    }
  };

  const removeFilterTag = (language) => {
    setSelectedFilters(prev => prev.filter(filter => filter !== language));
    setLanguageFilters(prev => ({
      ...prev,
      [language]: false
    }));
  };

  const clearAllFilters = () => {
    setSelectedFilters([]);
    setLanguageFilters({
      javascript: false,
      python: false,
      java: false,
      react: false,
      spring: false,
      flask: false
    });
    setIsFilterOpen(false);
  };

  // Get search placeholder text
  const getSearchPlaceholder = () => {
    if (isFilterOpen) {
      return 'Search by Type';
    }
    return isSearchFocused ? 'Search by Name' : '';
  };

  // Render main content based on selected item
  const renderMainContent = () => {
    if (selectedItem) {
      const heroSrc = `${process.env.PUBLIC_URL}${selectedItem.image || '/profile_picture.png'}`;
      const placeholderSrc = `${process.env.PUBLIC_URL}/profile_picture.png`;
      const imageSrc = selectedItem.image ? heroSrc : placeholderSrc;

      return (
        <div className="project-screen">
          {/* Hero Canvas */}
          <section className="project-hero">
            <img src={imageSrc} alt="project hero" className="hero-img hero-img--top" />
            <img src={imageSrc} alt="project hero reflection" className="hero-img hero-img--bottom" />
            <div className="hero-join-fade" />
            <div className="hero-top-shade" />
          </section>

          {/* Overlapping Panel */}
          <div className="project-panel-wrapper">
            <div className="project-panel">
              <div className="project-panel-content">
                <button className="project-play-button" onClick={() => window.open('https://example.com', '_blank')}>
                  <svg className="play-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 5v14l11-7z" fill="currentColor"/>
                  </svg>
                  <span className="play-text">PLAY</span>
                </button>
              </div>
            </div>
          </div>
          </div>
      );
    }

    return (
      <div className="library-content">
        <input
          type="text"
          className="library-search"
          placeholder="Search your library..."
        />
        
        <div className="library-filters">
          <button className="filter-button active">All Games</button>
          <button className="filter-button">Recently Played</button>
          <button className="filter-button">Favorites</button>
          <button className="filter-button">Installed</button>
        </div>
        
        <div className="library-grid">
          {/* Project 1 */}
          <div className="library-item">
            <div className="library-item-header">
              <img 
                src={`${process.env.PUBLIC_URL}/portfolio-preview.png`} 
                alt="Portfolio Project"
                className="library-item-icon"
              />
              <h3 className="library-item-title">Portfolio Website</h3>
            </div>
            <p className="library-item-description">
              A Steam-themed portfolio website built with React and modern web technologies.
            </p>
            <div className="library-item-stats">
              <span className="library-item-hours">48.2 hrs on record</span>
              <span className="library-item-date">last played on {currentDate}</span>
            </div>
          </div>
          
          {/* Project 2 */}
          <div className="library-item">
            <div className="library-item-header">
              <img 
                src={`${process.env.PUBLIC_URL}/tsukora-preview.png`} 
                alt="Tsukora Project"
                className="library-item-icon"
              />
              <h3 className="library-item-title">Tsukora</h3>
            </div>
            <p className="library-item-description">
              A full-stack web application with real-time features and modern UI design.
            </p>
            <div className="library-item-stats">
              <span className="library-item-hours">32.7 hrs on record</span>
              <span className="library-item-date">last played on {currentDate}</span>
            </div>
          </div>
          
          {/* Project 3 */}
          <div className="library-item">
            <div className="library-item-header">
              <img 
                src={`${process.env.PUBLIC_URL}/springboot.png`} 
                alt="Spring Boot Project"
                className="library-item-icon"
              />
              <h3 className="library-item-title">Spring Boot Backend</h3>
            </div>
            <p className="library-item-description">
              RESTful API backend built with Spring Boot, featuring contact forms and data persistence.
            </p>
            <div className="library-item-stats">
              <span className="library-item-hours">24.1 hrs on record</span>
              <span className="library-item-date">last played on {currentDate}</span>
            </div>
          </div>
          
          {/* Project 4 */}
          <div className="library-item">
            <div className="library-item-header">
              <img 
                src={`${process.env.PUBLIC_URL}/flask.png`} 
                alt="Flask Project"
                className="library-item-icon"
              />
              <h3 className="library-item-title">Flask Web App</h3>
            </div>
            <p className="library-item-description">
              Python web application using Flask framework with database integration.
            </p>
            <div className="library-item-stats">
              <span className="library-item-hours">18.9 hrs on record</span>
              <span className="library-item-date">last played on {currentDate}</span>
            </div>
          </div>
          
          {/* Project 5 */}
          <div className="library-item">
            <div className="library-item-header">
              <img 
                src={`${process.env.PUBLIC_URL}/ollama.png`} 
                alt="AI Project"
                className="library-item-icon"
              />
              <h3 className="library-item-title">AI Integration</h3>
            </div>
            <p className="library-item-description">
              Machine learning project integrating Ollama for local AI model deployment.
            </p>
            <div className="library-item-stats">
              <span className="library-item-hours">15.3 hrs on record</span>
              <span className="library-item-date">last played on {currentDate}</span>
            </div>
          </div>
          
          {/* Project 6 */}
          <div className="library-item">
            <div className="library-item-header">
              <img 
                src={`${process.env.PUBLIC_URL}/docker-logo.png`} 
                alt="Docker Project"
                className="library-item-icon"
              />
              <h3 className="library-item-title">Containerized Apps</h3>
            </div>
            <p className="library-item-description">
              Docker containerization projects for scalable application deployment.
            </p>
            <div className="library-item-stats">
              <span className="library-item-hours">12.8 hrs on record</span>
              <span className="library-item-date">last played on {currentDate}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="library-page">
      <aside className="sidebar">
        <div className="sidebar-top">
          {/* Sidebar top content will go here */}
          <div className="top-banner">Home</div>
          <div className="window">
            <div className="window-grid-item"></div>
            <div className="window-grid-item"></div>
            <div className="window-grid-item"></div>
            <div className="window-grid-item"></div>
          </div>
        </div>
        
        <div className="sidebar-dropdown">
          <div className="dropdown-icons">
            <div className="icon-circle">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
                <polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="icon-circle">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                <polygon points="8,7 8,17 17,12" fill="currentColor"/>
              </svg>
            </div>
          </div>
          
          <button 
            className={`dropdown-button ${isDropdownOpen ? 'open' : ''}`}
            onClick={toggleDropdown}
          >
            {getDropdownText()}
          </button>
          
          <div className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`}>
            <div 
              className="dropdown-option"
              onClick={() => toggleOption('projects')}
            >
              <div className={`checkbox ${selectedOptions.projects ? 'checked' : ''}`}></div>
              <span className="option-text">Projects <span className="option-count">(4)</span></span>
            </div>
            
            <div 
              className="dropdown-option"
              onClick={() => toggleOption('experience')}
            >
              <div className={`checkbox ${selectedOptions.experience ? 'checked' : ''}`}></div>
              <span className="option-text">Experience <span className="option-count">(1)</span></span>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="search-container">
          <div className={`search-bar ${(isFilterOpen || selectedFilters.length > 0) ? 'filter-mode' : ''}`}>
            <div className={`search-input-container ${(isFilterOpen || selectedFilters.length > 0) ? 'filter-mode' : ''}`}>
              <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" fill="none"/>
                <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              
              {isFilterOpen ? (
                <>
                  {selectedFilters.length === 0 && <div className="search-type-text">Search by Type</div>}
                  <div className="filter-tags">
                    {selectedFilters.map(filter => (
                      <span key={filter} className="filter-tag">
                        {filter}
                        <button 
                          className="tag-remove" 
                          onClick={() => removeFilterTag(filter)}
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </>
              ) : selectedFilters.length > 0 ? (
                <div className="filter-tags">
                  {selectedFilters.map(filter => (
                    <span key={filter} className="filter-tag">
                      {filter}
                      <button 
                        className="tag-remove" 
                        onClick={() => removeFilterTag(filter)}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              ) : (
                <input
                  type="text"
                  className="search-input"
                  placeholder={getSearchPlaceholder()}
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onFocus={handleSearchFocus}
                  onBlur={handleSearchBlur}
                />
              )}
              
              {(isSearchFocused || searchQuery || selectedFilters.length > 0) && (
                <button className="clear-button" onClick={isSearchMode ? clearSearch : clearAllFilters}>
                  ×
                </button>
              )}
            </div>
            
            <button 
              className={`filter-button ${isFilterOpen ? 'active' : ''} ${searchQuery.trim() ? 'disabled' : ''} ${selectedFilters.length > 0 ? 'has-filters' : ''}`}
              onClick={toggleFilter}
              disabled={searchQuery.trim().length > 0}
              style={{ pointerEvents: searchQuery.trim().length > 0 ? 'none' : 'auto' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 6h18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6 12h12" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 18h6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          
          {/* Filter Menu */}
          <div className={`filter-menu ${isFilterOpen ? 'show' : ''}`}>
            <div className="filter-options">
              {Object.keys(languageFilters).map(language => (
                <div 
                  key={language}
                  className={`filter-option ${languageFilters[language] ? 'selected' : ''}`}
                  onClick={() => toggleLanguageFilter(language)}
                >
                  <div className={`filter-checkbox ${languageFilters[language] ? 'checked' : ''}`}></div>
                  <span className="filter-text">{language}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Collapsible Category Sections */}
        <div className="category-sections">
          {/* Projects Section */}
          <div className="category-section">
            <button 
              className={`category-header ${collapsedSections.projects ? 'collapsed' : ''}`}
              onClick={() => toggleSection('projects')}
            >
              <span className="expand-icon">
                {collapsedSections.projects ? '+' : '-'}
              </span>
              <span className="category-title">Projects</span>
              <span className="category-count">({filteredProjects.length})</span>
            </button>
            
            {!collapsedSections.projects && (
              <div className="category-content">
                {filteredProjects.map(project => (
                  <div 
                    key={project.id} 
                    className={`category-item ${selectedItem?.id === project.id ? 'selected' : ''}`}
                    onClick={() => handleItemClick(project)}
                  >
                    <img 
                      src={`${process.env.PUBLIC_URL}${project.image}`}
                      alt={project.title}
                      className="category-item-image"
                    />
                    <span className="category-item-title">{project.title}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Experience Section */}
          <div className="category-section">
            <button 
              className={`category-header ${collapsedSections.experience ? 'collapsed' : ''}`}
              onClick={() => toggleSection('experience')}
            >
              <span className="expand-icon">
                {collapsedSections.experience ? '+' : '-'}
              </span>
              <span className="category-title">Experience</span>
              <span className="category-count">({filteredExperience.length})</span>
            </button>
            
            {!collapsedSections.experience && (
              <div className="category-content">
                {filteredExperience.map(experience => (
                  <div 
                    key={experience.id} 
                    className={`category-item ${selectedItem?.id === experience.id ? 'selected' : ''}`}
                    onClick={() => handleItemClick(experience)}
                  >
                    <img 
                      src={`${process.env.PUBLIC_URL}${experience.image}`}
                      alt={experience.title}
                      className="category-item-image"
                    />
                    <span className="category-item-title">{experience.title}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* Sidebar content will go here */}
      </aside>
      
      <main className="library-main">
        <div className="library-header">
          <h1 className="library-title">Library</h1>
        </div>
        
        {renderMainContent()}
      </main>
    </div>
  );
};

export default Library;

