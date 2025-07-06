import React from 'react';
import { Project } from '../../types/Project';
import Button from '../Button';
import Card from '../Card';

interface TimelineItemProps {
  project: Project;
  index: number;
  isVisible: boolean;
  isCurrent?: boolean;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ project, index, isVisible, isCurrent }) => {
  // 格式化日期显示
  const formatDate = (dateString: string) => {
    const [year, month] = dateString.split('-');
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                       'July', 'August', 'September', 'October', 'November', 'December'];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  };

  return (
    <div 
      className={`timeline-item ${isVisible ? 'visible' : ''} ${isCurrent ? 'current' : ''}`}
      data-project-id={project.id}
    >
      <div className="timeline-content">
        <div className="timeline-marker"></div>
        <Card variant="timeline" layout="split">
          {/* Left side - Project Info */}
          <div className="card__left">
            <div className="timeline-date">{formatDate(project.date)}</div>
            <h3 className="timeline-title">{project.title}</h3>
            <p className="timeline-description">{project.description}</p>
            
            <div className="timeline-technologies">
              {project.technologies.map((tech, techIndex) => (
                <span key={techIndex} className="tech-tag">{tech}</span>
              ))}
            </div>
          </div>
          
          {/* Right side - Key Highlights & Demo Buttons */}
          <div className="card__right">
            {project.highlights && project.highlights.length > 0 && (
              <div className="timeline-highlights">
                <h4>Key Highlights:</h4>
                <ul>
                  {project.highlights.map((highlight, highlightIndex) => (
                    <li key={highlightIndex}>{highlight}</li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className="timeline-links">
              {project.demoUrl && (
                <Button 
                  variant="secondary" 
                  href={project.demoUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  as="a"
                >
                  View Demo
                </Button>
              )}
              {project.githubUrl && (
                <Button 
                  variant="outline" 
                  href={project.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  as="a"
                >
                  View Code
                </Button>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TimelineItem; 