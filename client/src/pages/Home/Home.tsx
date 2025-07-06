import React, { useEffect, useState, useRef } from 'react';
import Timeline from '../../components/Timeline/Timeline';
import Button from '../../components/Button';
import { projects } from '../../data/projects';
import './Home.css';

const Home: React.FC = () => {
  const [currentSection, setCurrentSection] = useState(0);
  
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let isScrolling = false;  

    const handleScroll = (e: WheelEvent) => {
      e.preventDefault();
      
      if (isScrolling) return;
      
      const delta = e.deltaY;
      const threshold = 50; // Minimum scroll distance to trigger section change
      
      if (Math.abs(delta) > threshold) {
        isScrolling = true;
        
        if (delta > 0 && currentSection === 0) {
          // Scroll down from hero to projects
          setCurrentSection(1);
          const projectsSection = document.getElementById('projects');
          projectsSection?.scrollIntoView({ behavior: 'smooth' });
        } else if (delta < 0 && currentSection === 1) {
          // Scroll up from projects to hero
          setCurrentSection(0);
          const heroSection = document.querySelector('.hero-section');
          heroSection?.scrollIntoView({ behavior: 'smooth' });
        }
        
        // Reset scrolling flag after animation
        setTimeout(() => {
          isScrolling = false;
        }, 1000);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isScrolling) return;
      
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        if (currentSection === 0) {
          isScrolling = true;
          setCurrentSection(1);
          const projectsSection = document.getElementById('projects');
          projectsSection?.scrollIntoView({ behavior: 'smooth' });
          setTimeout(() => { isScrolling = false; }, 1000);
        }
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp' || e.key === 'Home') {
        e.preventDefault();
        if (currentSection === 1) {
          isScrolling = true;
          setCurrentSection(0);
          const heroSection = document.querySelector('.hero-section');
          heroSection?.scrollIntoView({ behavior: 'smooth' });
          setTimeout(() => { isScrolling = false; }, 1000);
        }
      }
    };

    // Snap to nearest section when user stops scrolling
    const handleScrollEnd = () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      scrollTimeoutRef.current = setTimeout(() => {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        
        // If we're somewhere in the middle, snap to the nearest section
        if (scrollY > windowHeight * 0.3 && scrollY < windowHeight * 0.7) {
          if (currentSection === 0) {
            // Snap to projects
            setCurrentSection(1);
            const projectsSection = document.getElementById('projects');
            projectsSection?.scrollIntoView({ behavior: 'smooth' });
          } else {
            // Snap to hero
            setCurrentSection(0);
            const heroSection = document.querySelector('.hero-section');
            heroSection?.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }, 150);
    };

    document.addEventListener('wheel', handleScroll, { passive: false });
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('scroll', handleScrollEnd);
    
    return () => {
      document.removeEventListener('wheel', handleScroll);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('scroll', handleScrollEnd);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [currentSection]);

  const handleViewProjects = () => {
    setCurrentSection(1);
    const projectsSection = document.getElementById('projects');
    projectsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="home">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to Antares</h1>
          <p className="hero-subtitle">A Journey Through My Projects</p>
          <p className="hero-description">
            Explore my portfolio timeline and discover the projects that define my development journey.
          </p>
          <Button variant="primary" size="large" onClick={handleViewProjects}>
            View My Projects
          </Button>
        </div>
      </section>
      
      <section id="projects" className="projects-section">
        <Timeline projects={projects} />
      </section>
    </div>
  );
};

export default Home; 