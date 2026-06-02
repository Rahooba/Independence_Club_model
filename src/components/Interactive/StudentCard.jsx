import React, { useState } from 'react';

const StudentCard = ({ name, initialStatus, onStatusChange }) => {
  const [status, setStatus] = useState(initialStatus || 'waiting');
  const [helpLevel, setHelpLevel] = useState(0);

  const getStatusIcon = () => {
    switch(status) {
      case 'working': return '✏️';
      case 'needHelp': return '🆘';
      case 'done': return '✅';
      default: return '⏳';
    }
  };

  const getStatusColor = () => {
    switch(status) {
      case 'working': return '#2A9D8F';
      case 'needHelp': return '#E76F51';
      case 'done': return '#2A9D8F';
      default: return '#E9C46A';
    }
  };

  const handleHelpRequest = () => {
    if (helpLevel < 4) {
      const newLevel = helpLevel + 1;
      setHelpLevel(newLevel);
      if (newLevel === 4) {
        setStatus('needHelp');
        if (onStatusChange) onStatusChange(name, 'needHelp');
      }
    }
  };

  return (
    <div style={{
      background: 'white',
      borderRadius: '16px',
      padding: '16px',
      textAlign: 'center',
      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
      border: `2px solid ${getStatusColor()}`,
      transition: 'all 0.3s ease'
    }}>
      <div style={{
        fontSize: '2rem',
        marginBottom: '8px'
      }}>
        {getStatusIcon()}
      </div>
      <h4 style={{ marginBottom: '8px', color: '#1E3A5F' }}>{name}</h4>
      <div style={{
        fontSize: '0.85rem',
        color: getStatusColor(),
        fontWeight: 'bold',
        marginBottom: '12px'
      }}>
        {status === 'working' && 'يعمل بمفرده'}
        {status === 'needHelp' && 'يحتاج مساعدة'}
        {status === 'done' && 'انتهى'}
        {status === 'waiting' && 'يستعد'}
      </div>
      <div style={{
        background: '#F8F9FA',
        borderRadius: '8px',
        padding: '8px',
        marginTop: '8px'
      }}>
        <div style={{ fontSize: '0.75rem', color: '#6C757D' }}>
          سلم الدعم: المستوى {helpLevel}/4
        </div>
        <div style={{
          width: '100%',
          height: '4px',
          background: '#E9ECEF',
          borderRadius: '2px',
          marginTop: '4px'
        }}>
          <div style={{
            width: `${(helpLevel / 4) * 100}%`,
            height: '100%',
            background: '#F4A261',
            borderRadius: '2px'
          }} />
        </div>
      </div>
      {status !== 'done' && status !== 'needHelp' && (
        <button
          onClick={handleHelpRequest}
          style={{
            marginTop: '12px',
            background: '#E9ECEF',
            border: 'none',
            padding: '6px 12px',
            borderRadius: '20px',
            fontSize: '0.75rem',
            cursor: 'pointer',
            color: '#6C757D'
          }}
        >
          🆘 أحتاج مساعدة
        </button>
      )}
    </div>
  );
};

export default StudentCard;