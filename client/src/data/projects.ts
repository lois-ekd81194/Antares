import { Project } from '../types/Project';

export const projects: Project[] = [
  {
    id: 'project-1',
    title: 'Memo. ',
    description: 'a reminder app that allows you to set reminders for your tasks and events with your voice input',
    technologies: ['React Native', '.Net' ],
    date: '2024-10',
    highlights: [
      'Voice input for reminders',
      'Reminders are sent to your phone',
      'Reminders are sent to your email',
      'Reminders are sent to your phone'
    ],
    demoUrl: 'https://www.figma.com/design/aKlSWacJFi8RZ8MOA6yEzQ/Untitled?node-id=152-20&t=J9rPQw7gb6lCMcjx-1',
    githubUrl: 'https://github.com/username/ecommerce-platform'
  },
  {
    id: 'project-2',
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
    technologies: ['React', 'TypeScript', 'Socket.io', 'PostgreSQL', 'Docker'],
    date: '2023-09',
    highlights: [
      'Real-time collaboration with WebSocket integration',
      'Drag-and-drop task organization with React DnD',
      'Advanced filtering and search capabilities',
      'Containerized deployment with Docker'
    ],
    demoUrl: 'https://taskapp.example.com',
    githubUrl: 'https://github.com/username/task-manager'
  },
  {
    id: 'project-3',
    title: 'Weather Dashboard',
    description: 'A responsive weather application with real-time data visualization and location-based forecasting.',
    technologies: ['Vue.js', 'Chart.js', 'OpenWeather API', 'CSS3'],
    date: '2024-05',
    highlights: [
      'Interactive weather charts and graphs',
      'Geolocation-based weather detection',
      'Multi-city weather comparison',
      'Responsive design for all devices'
    ],
    demoUrl: 'https://weather.example.com',
    githubUrl: 'https://github.com/username/weather-dashboard'
  },
  {
    id: 'project-4',
    title: 'Social Media Analytics',
    description: 'Analytics dashboard for social media performance tracking with data visualization and reporting features.',
    technologies: ['Angular', 'D3.js', 'Node.js', 'MySQL', 'Redis'],
    date: '2024-02',
    highlights: [
      'Real-time social media metrics tracking',
      'Interactive data visualization with D3.js',
      'Automated report generation',
      'Multi-platform social media integration'
    ],
    demoUrl: 'https://analytics.example.com',
    githubUrl: 'https://github.com/username/social-analytics'
  },
 
]; 