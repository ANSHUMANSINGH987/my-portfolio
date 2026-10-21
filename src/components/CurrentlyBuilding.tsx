import React from 'react';
import { ArrowUpRight, Cpu, BookOpen, Layers } from 'lucide-react';
import './CurrentlyBuilding.css';

const activeProjects = [
  {
    id: 'agentic',
    title: 'Agentic AI Products',
    description: 'Building practical AI workflows and intelligent developer tools.',
    tags: ['AI Agents', 'LLMs', 'RAG'],
    icon: <Cpu size={20} className="building-icon-svg" />
  },
  {
    id: 'eduplan',
    title: 'EduPlan AI',
    description: 'AI-powered learning and education planning platform.',
    tags: ['Next.js', 'FastAPI', 'RAG'],
    icon: <BookOpen size={20} className="building-icon-svg" />
  },
  {
    id: 'kestrel',
    title: 'Kestrel',
    description: 'A systems-oriented C++ project currently in progress.',
    tags: ['C++', 'Networking', 'Databases'],
    icon: <Layers size={20} className="building-icon-svg" />
  }
];

const CurrentlyBuilding: React.FC = () => {
  return (
    <section className="container section compact-section">
      <div className="section-header">
        <h2 className="section-title">
          <span>03 |</span> CURRENTLY BUILDING
        </h2>
        <a href="#github" className="section-link">
          <ArrowUpRight size={14} />
        </a>
      </div>
      
      <div className="building-grid">
        {activeProjects.map(project => (
          <div key={project.id} className="building-card">
            <div className="building-card-top">
              <div className="building-icon">
                {project.icon}
              </div>
              <ArrowUpRight size={14} className="building-arrow text-muted" />
            </div>
            
            <div className="building-content">
              <h3 className="building-title">{project.title}</h3>
              <p className="building-description">{project.description}</p>
            </div>
            
            <div className="building-tags">
              {project.tags.map(tag => (
                <span key={tag} className="badge">{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CurrentlyBuilding;
