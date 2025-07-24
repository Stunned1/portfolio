import React from 'react';
import './Skills.css';
import { 
  SiReact, 
  SiJavascript, 
  SiPython, 
  SiGit, 
  SiHtml5,
  SiCss3
} from 'react-icons/si';
import JavaIcon from '../ui/java-icon';
import FlaskIcon from '../ui/flask-icon';
import SpringBootIcon from '../ui/springboot-icon';
import OllamaIcon from '../ui/ollama-icon';

const Skills = () => {
  const technologies = [
    { name: 'HTML', icon: SiHtml5, color: '#517ee0' },
    { name: 'CSS', icon: SiCss3, color: '#517ee0' },
    { name: 'Python', icon: SiPython, color: '#517ee0' },
    { name: 'Java', icon: JavaIcon, color: '#517ee0' },
    { name: 'JavaScript', icon: SiJavascript, color: '#517ee0' },
    { name: 'Flask', icon: FlaskIcon, color: '#517ee0' },
    { name: 'Spring Boot', icon: SpringBootIcon, color: '#517ee0' },
    { name: 'Git', icon: SiGit, color: '#517ee0' },
    { name: 'React', icon: SiReact, color: '#517ee0' },
    { name: 'Ollama', icon: OllamaIcon, color: '#517ee0' }
  ];

  return (
    <section id="skills" className="skills">
      <h2 className="section-title">Technologies</h2>
      <div className="technologies-grid">
        {technologies.map((tech, index) => {
          return (
            <div key={index} className="tech-item">
              <div className="tech-logo">
                {tech.icon ? (
                  <tech.icon size={24} />
                ) : (
                  <div className="custom-icon" style={{ color: tech.color }}>
                    {tech.name.charAt(0)}
                  </div>
                )}
              </div>
              <span className="tech-name">{tech.name}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Skills; 