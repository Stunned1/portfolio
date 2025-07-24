import React, { useState, useMemo, useRef, useEffect } from 'react';
import './Projects.css';
import { 
  SiReact, 
  SiJavascript, 
  SiPython, 
  SiGit, 
  SiDocker,
  SiHtml5,
  SiCss3
} from 'react-icons/si';
import { IoChevronDown } from 'react-icons/io5';
import OllamaIcon from '../ui/ollama-icon';
import FlaskIcon from '../ui/flask-icon';
import JavaIcon from '../ui/java-icon';
import SpringBootIcon from '../ui/springboot-icon';

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTechnologies, setSelectedTechnologies] = useState(['All']);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const dropdownRef = useRef(null);

  // Check for dark mode
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.body.classList.contains('dark-mode'));
    };
    
    checkDarkMode();
    
    // Listen for theme changes
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    
    return () => observer.disconnect();
  }, []);

  // Define all available technologies (matching Skills component)
  const allTechnologies = [
    'HTML', 'CSS', 'Python', 'Java', 'JavaScript', 'Flask', 'Spring Boot', 'Git', 'React', 'Ollama'
  ];

  const projects = [
    {
      title: 'Tsukora',
      description: 'A local voice AI assistant built with Python, Flask, and PyTorch. It features real-time speech recognition, natural language understanding via a local LLM (LLaVA/Ollama), web search with DuckDuckGo and BeautifulSoup, and multilingual text-to-speech using Coqui TTS with voice cloning. Audio playback is handled by sounddevice, and all components run offline for privacy-focused use.',
      technologies: [
        { name: 'Python', icon: SiPython },
        { name: 'Flask', icon: FlaskIcon },
        { name: 'Git', icon: SiGit },
        { name: 'Ollama', icon: OllamaIcon }
      ],
      color: '#667eea',
      previewImage: '/images/projects/tsukora-preview.png',
      liveLink: null,
      githubLink: 'https://github.com/Stunned1'
    },
    {
      title: 'Portfolio Website',
      description: 'My portfolio website built on React, which also includes a backend built on Spring Boot!',
      technologies: [
        { name: 'React', icon: SiReact },
        { name: 'JavaScript', icon: SiJavascript },
        { name: 'HTML', icon: SiHtml5 },
        { name: 'CSS', icon: SiCss3 },
        { name: 'Java', icon: JavaIcon },
        { name: 'Spring Boot', icon: SpringBootIcon },
        { name: 'Git', icon: SiGit }
      ],
      color: '#4facfe',
      previewImage: '/images/projects/portfolio-preview.png',
      liveLink: 'https://aidan-nguyen-portfolio.com',
      githubLink: '#'
    }
  ];

  // Get unique technologies for filtering
  const filterTechnologies = ['All', ...allTechnologies];

  // Handle technology selection/deselection
  const handleTechnologyToggle = (technology) => {
    if (technology === 'All') {
      setSelectedTechnologies(['All']);
    } else {
      setSelectedTechnologies(prev => {
        // Remove "All" when selecting specific technologies
        const newSelection = prev.filter(tech => tech !== 'All');
        
        if (newSelection.includes(technology)) {
          // Remove technology (deselect)
          const filtered = newSelection.filter(tech => tech !== technology);
          return filtered.length === 0 ? ['All'] : filtered;
        } else {
          // Add technology (select)
          return [...newSelection, technology];
        }
      });
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter projects based on search term and technologies
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.technologies.some(tech => tech.name.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesTechnology = selectedTechnologies.includes('All') || 
                               selectedTechnologies.every(tech => 
                                 project.technologies.some(projectTech => projectTech.name === tech)
                               );
      
      return matchesSearch && matchesTechnology;
    });
  }, [searchTerm, selectedTechnologies]);

  return (
    <section id="projects" className="projects">
      <h2 className="section-title">My Projects</h2>
      
      {/* Search and Filter Controls */}
      <div className="projects-controls">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="filter-container">
          <div className="filter-dropdown" ref={dropdownRef}>
            <button
              className="filter-dropdown-btn"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span>
                {selectedTechnologies.includes('All') 
                  ? 'All Technologies' 
                  : `${selectedTechnologies.length} Technology${selectedTechnologies.length !== 1 ? 's' : ''} Selected`
                }
              </span>
              <IoChevronDown className={`dropdown-arrow ${isDropdownOpen ? 'open' : ''}`} />
            </button>
            
            {isDropdownOpen && (
              <div className="filter-dropdown-menu">
                {filterTechnologies.map((technology) => (
                  <label key={technology} className="filter-checkbox">
                    <input
                      type="checkbox"
                      checked={selectedTechnologies.includes(technology)}
                      onChange={() => handleTechnologyToggle(technology)}
                    />
                    <span className="checkbox-custom"></span>
                    <span className="checkbox-label">{technology}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="results-info">
        <p>Showing {filteredProjects.length} of {projects.length} projects</p>
      </div>

      <div className="projects-container">
        {filteredProjects.map((project, index) => (
          <div key={project.title} className="project-card">
            <div className="project-image">
              {project.previewImage ? (
                <img 
                  src={project.previewImage} 
                  alt={project.title}
                  className="project-preview-img"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
              ) : null}
              <div className="project-icon" style={{ 
                display: project.previewImage ? 'none' : 'flex',
                background: `linear-gradient(135deg, ${project.color} 0%, ${project.color}dd 100%)`
              }}>
                <div className="project-logo"></div>
              </div>
            </div>
            <div className="project-content">
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
              <div className="project-technologies">
                {project.technologies.map((tech, techIndex) => {
                  const IconComponent = tech.icon;
                  const iconColor = isDarkMode ? '#ffffff' : '#2d3748';
                  return (
                    <span key={techIndex} className="tech-tag">
                      {IconComponent ? (
                        <IconComponent size={14} color={iconColor} />
                      ) : (
                        <div className="tech-icon-placeholder" style={{ color: iconColor }}>
                          {tech.name.charAt(0)}
                        </div>
                      )}
                      {tech.name}
                    </span>
                  );
                })}
              </div>
              <div className="project-links">
                {project.liveLink && (
                  <a href={project.liveLink} className="btn btn-outline" target="_blank" rel="noopener noreferrer">
                    Live Demo
                  </a>
                )}
                {project.githubLink && project.githubLink !== '#' && (
                  <a href={project.githubLink} className="btn" target="_blank" rel="noopener noreferrer">
                    View Code
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects; 