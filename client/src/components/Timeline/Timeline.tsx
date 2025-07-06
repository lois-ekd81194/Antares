import React, { useEffect, useRef, useState } from 'react';
import { Project } from '../../types/Project';
import TimelineItem from './TimelineItem';
import './Timeline.css';

interface TimelineProps {
  projects: Project[];
}

const Timeline: React.FC<TimelineProps> = ({ projects }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const timelineRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLInputElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const goToProject = (index: number) => {
    setCurrentIndex(index);
  };

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    setCurrentIndex(value);
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTrackClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const percentage = clickX / rect.width;
    const newIndex = Math.round(percentage * (projects.length - 1));
    setCurrentIndex(Math.max(0, Math.min(newIndex, projects.length - 1)));
  };

  // 获取项目的年月
  const getProjectYearMonth = (project: any) => {
    return project.date; // 直接返回 YYYY-MM 格式
  };

  // 获取项目的显示标签（年月）
  const getProjectLabel = (project: any) => {
    const [year, month] = project.date.split('-');
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                       'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  };

  // 获取项目的年份（用于排序）
  const getProjectYear = (project: any) => {
    return parseInt(project.date.split('-')[0]);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // 如果正在滚动中，忽略键盘事件
      if (isScrolling) return;
      
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        setIsScrolling(true);
        nextProject();
        
        // 清除之前的定时器
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
        
        // 设置防抖延迟
        scrollTimeoutRef.current = setTimeout(() => {
          setIsScrolling(false);
        }, 600);
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        setIsScrolling(true);
        prevProject();
        
        // 清除之前的定时器
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
        
        // 设置防抖延迟
        scrollTimeoutRef.current = setTimeout(() => {
          setIsScrolling(false);
        }, 600);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isScrolling]);

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      
      // 如果正在滚动中，忽略新的滚动事件
      if (isScrolling) return;
      
      // 设置滚动阈值，避免小幅滚动触发
      const threshold = 50;
      if (Math.abs(event.deltaY) < threshold) return;
      
      // 设置滚动状态
      setIsScrolling(true);
      
      // 清除之前的定时器
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      // 根据滚动方向切换项目
      if (event.deltaY > 0) {
        nextProject();
      } else if (event.deltaY < 0) {
        prevProject();
      }
      
      // 设置防抖延迟，防止连续滚动
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 600); // 600ms 防抖延迟，匹配CSS过渡时间
    };

    const timelineElement = timelineRef.current;
    if (timelineElement) {
      timelineElement.addEventListener('wheel', handleWheel, { passive: false });
      return () => {
        timelineElement.removeEventListener('wheel', handleWheel);
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
      };
    }
  }, [isScrolling]);

  const backToTop = () => {
    const homeSection = document.querySelector('.hero-section');
    if (homeSection) {
      homeSection.scrollIntoView({ behavior: 'smooth' });
      setShowBackToTop(false); // Hide button when going back to home
    }
  };

  // Show back to top button when timeline section becomes visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Timeline is visible, show button immediately
            setShowBackToTop(true);
          } else {
            // Timeline is not visible, hide button
            setShowBackToTop(false);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px'
      }
    );

    const timelineElement = timelineRef.current;
    if (timelineElement) {
      observer.observe(timelineElement);
      return () => observer.unobserve(timelineElement);
    }
  }, []);

  return (
    <div className="timeline-container" ref={timelineRef}>
      <div className="timeline-horizontal">
        <div 
          className="timeline-track"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {projects.map((project, index) => (
            <TimelineItem
              key={project.id}
              project={project}
              index={index}
              isVisible={index === currentIndex}
              isCurrent={index === currentIndex}
            />
          ))}
        </div>
        
        {/* Slider Control */}
        <div className="timeline-slider-container">
          <div className="timeline-slider-wrapper" onClick={handleTrackClick}>
            <input
              ref={sliderRef}
              type="range"
              min="0"
              max={projects.length - 1}
              value={currentIndex}
              onChange={handleSliderChange}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              className="timeline-slider"
            />
            <div className="timeline-slider-track">
              <div 
                className="timeline-slider-progress"
                style={{ width: `${(currentIndex / (projects.length - 1)) * 100}%` }}
              />
            </div>
            
            {/* Project Markers */}
            <div className="timeline-markers">
              {projects.map((_, index) => (
                <div
                  key={index}
                  className={`timeline-marker ${index === currentIndex ? 'active' : ''}`}
                  style={{ left: `${(index / (projects.length - 1)) * 100}%` }}
                />
              ))}
            </div>
          </div>
          
          {/* Year-Month Labels */}
          <div className="timeline-year-labels">
            {projects.map((project, index) => (
              <div
                key={index}
                className="timeline-year-label"
                style={{ left: `${(index / (projects.length - 1)) * 100}%` }}
              >
                {getProjectLabel(project)}
              </div>
            ))}
          </div>
        </div>
        

        
        {/* Project Counter */}
        <div className={`timeline-counter ${isScrolling ? 'scrolling' : ''}`}>
          {currentIndex + 1} / {projects.length}
          {isScrolling && <div className="scrolling-indicator">⟳</div>}
        </div>
        
        {/* Back to Top Button */}
        {showBackToTop && (
          <button className="back-to-top-btn" onClick={backToTop} title="Back to Top">
            ↑
          </button>
        )}
      </div>
    </div>
  );
};

export default Timeline; 