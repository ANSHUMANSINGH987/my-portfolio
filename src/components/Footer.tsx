import React from 'react';
import { Mail, FileText } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="container section footer-section">
      <div className="section-header footer-header">
        <h2 className="section-title">
          <span>05 |</span> LET'S CONNECT
        </h2>
      </div>
      
      <div className="footer-content">
        <div className="footer-quote">
          <p>"Build things that make a difference."</p>
          <span className="mono text-muted">- Anshuman Singh</span>
        </div>
        
        <div className="footer-actions">
          <a href="https://github.com/ANSHUMANSINGH987" target="_blank" rel="noreferrer" className="pill-button">
            <FaGithub size={14} /> GitHub
          </a>
          <a href="https://www.linkedin.com/in/anshuman-singh-258245371" target="_blank" rel="noreferrer" className="pill-button">
            <FaLinkedin size={14} /> LinkedIn
          </a>
          <a href="mailto:singhanshuman584@gmail.com" className="pill-button">
            <Mail size={14} /> Email
          </a>
          <a href="https://drive.google.com/file/d/16rdAEjke3ueGtOwGnjLIBktlESSN2fzl/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="pill-button resume-btn">
            <FileText size={14} /> Resume
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
