import React from 'react';
import { Link } from 'react-router-dom';

const ToolCard = ({ icon, title, description, tag, link, color }) => {
  return (
    <Link to={link} className="tool-card">
      <div className="card-icon" style={{ background: color || 'linear-gradient(135deg, #2A5F8F 0%, #1E3A5F 100%)' }}>
        {icon}
      </div>
      <div className="card-content">
        <h3>{title}</h3>
        <p>{description}</p>
        <span className="card-tag">{tag}</span>
      </div>
    </Link>
  );
};

export default ToolCard;