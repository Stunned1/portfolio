import React, { useState, useEffect, useMemo } from 'react';
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
    'Javascript': false,
    'Python': false,
    'Java': false,
    'React': false,
    'Spring Boot': false,
    'Flask': false,
    'Typescript': false,
    'Node': false,
    'Docker': false,
    'C#': false
  });

  // Collapsible sections state
  const [collapsedSections, setCollapsedSections] = useState({
    projects: false,
    experience: false
  });

  // Selected item state
  const [selectedItem, setSelectedItem] = useState(null);

  // Enhanced data structure for projects and experience
  // To add new projects: add a new object to this array with the following structure:
  // {
  //   id: [unique_number],           // Use next available ID (e.g., 107, 108, etc.)
  //   title: 'Project Name',         // Display name
  //   image: '/thumbnail.png',       // Thumbnail image for sidebar (small)
  //   heroImage: '/hero-image.png',  // Hero image for main page (large)
  //   technologies: ['tech1', 'tech2'], // Technologies for filtering
  //   url: 'https://project-url.com' // Live project URL
  // }
  const projectsData = useMemo(() => [
    {
      id: 101,
      title: 'Portfolio Website',
      image: '/portfolio-preview.png',
      heroImage: '/portfolio-preview.png',
      technologies: ['React', 'Javascript', 'Docker', 'Java', 'Spring'],
      url: 'https://anguy98.com'
    },
    {
      id: 102,
      title: 'Tsukora',
      image: '/tsukora-preview.png',
      heroImage: '/tsukora-preview.png',
      technologies: ['Python', 'Flask'],
      url: 'https://github.com/Stunned1/Tsukora'
    },
    {
      id: 103,
      title: 'JWT Authentication Project',
      image: '/springboot.png',
      heroImage: '/authentication.png',
      technologies: ['Java', 'Spring Boot'],
      url: 'https://github.com/Stunned1/JWT-Authentication'
    },
    {
      id: 104,
      title: 'Neural Network',
      image: '/neural-network-icon.png',
      heroImage: '/neural-network-preview.png',
      technologies: ['C#'],
      url: 'https://github.com/Stunned1/Neural-Network'
    }
  ], []);

  // To add new experience: add a new object to this array with the following structure:
  // {
  //   id: [unique_number],           // Use next available ID (e.g., 202, 203, etc.)
  //   title: 'Job Title',            // Job title
  //   image: '/company-logo.png',    // Thumbnail image for sidebar (small)
  //   heroImage: '/hero-image.png',  // Hero image for main page (large)
  //   technologies: ['tech1', 'tech2'], // Technologies used
  //   url: 'https://company-website.com' // Company website or relevant URL
  // }
  const experienceData = useMemo(() => [
    {
      id: 201,
      title: 'Undergraduate Researcher',
      image: '/vt-logo.png',
      heroImage: '/code-world-no-blanket.png',
      technologies: [],
      url: 'https://code-world-no-blanket.github.io/'
    }
  ], []);

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

  // Set default selected item to first project
  useEffect(() => {
    if (projectsData && projectsData.length > 0) {
      setSelectedItem(projectsData[0]);
    }
  }, [projectsData]);

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
      'Javascript': false,
      'Python': false,
      'Java': false,
      'React': false,
      'Spring Boot': false,
      'Flask': false,
      'Typescript': false,
      'Node': false,
      'Docker': false,
      'C#': false
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
      const heroSrc = `${process.env.PUBLIC_URL}${selectedItem.heroImage || selectedItem.image || '/profile_picture.png'}`;
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
                <button 
                  className="project-play-button" 
                  onClick={() => window.open(selectedItem.url || 'https://example.com', '_blank')}
                >
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
          {projectsData.map(project => (
            <div key={project.id} className="library-item">
              <div className="library-item-header">
                <img 
                  src={`${process.env.PUBLIC_URL}${project.image}`} 
                  alt={project.title}
                  className="library-item-icon"
                />
                <h3 className="library-item-title">{project.title}</h3>
              </div>
              <div className="library-item-stats">
                <span className="library-item-date">last played on {currentDate}</span>
              </div>
            </div>
          ))}
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
              <span className="option-text">Projects <span className="option-count">({projectsData.length})</span></span>
            </div>
            
            <div 
              className="dropdown-option"
              onClick={() => toggleOption('experience')}
            >
              <div className={`checkbox ${selectedOptions.experience ? 'checked' : ''}`}></div>
              <span className="option-text">Experience <span className="option-count">({experienceData.length})</span></span>
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

