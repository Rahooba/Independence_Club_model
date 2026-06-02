import React, { useState } from 'react';

const HelpTokens = ({ studentName, onTokenUsed }) => {
  const [tokens, setTokens] = useState(3);
  const [usedTokens, setUsedTokens] = useState([]);

  const useToken = () => {
    if (tokens > 0) {
      const newTokens = tokens - 1;
      setTokens(newTokens);
      setUsedTokens([...usedTokens, new Date().toLocaleTimeString()]);
      if (onTokenUsed) onTokenUsed(studentName, newTokens);
    }
  };

  const resetTokens = () => {
    setTokens(3);
    setUsedTokens([]);
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, #2A9D8F 0%, #21867a 100%)',
      borderRadius: '16px',
      padding: '20px',
      color: 'white'
    }}>
      <h4 style={{ marginBottom: '12px' }}>🎫 كوبونات المساعدة - {studentName}</h4>
      <div style={{
        display: 'flex',
        gap: '12px',
        justifyContent: 'center',
        marginBottom: '16px'
      }}>
        {[1, 2, 3].map(i => (
          <div key={i} style={{
            width: '50px',
            height: '60px',
            background: i <= tokens ? '#F4A261' : 'rgba(255,255,255,0.3)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            transition: 'all 0.3s ease'
          }}>
            🎫
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
        <button
          onClick={useToken}
          disabled={tokens === 0}
          style={{
            background: tokens > 0 ? '#F4A261' : '#6C757D',
            border: 'none',
            padding: '8px 20px',
            borderRadius: '25px',
            cursor: tokens > 0 ? 'pointer' : 'not-allowed',
            color: tokens > 0 ? '#1E3A5F' : 'white',
            fontWeight: 'bold'
          }}
        >
          🆘 استخدام كوبون
        </button>
        <button
          onClick={resetTokens}
          style={{
            background: 'rgba(255,255,255,0.2)',
            border: '1px solid rgba(255,255,255,0.5)',
            padding: '8px 20px',
            borderRadius: '25px',
            cursor: 'pointer',
            color: 'white'
          }}
        >
          🔄 تجديد
        </button>
      </div>
      {usedTokens.length > 0 && (
        <div style={{
          marginTop: '16px',
          fontSize: '0.75rem',
          textAlign: 'center',
          opacity: 0.8
        }}>
          تم استخدام {usedTokens.length} كوبونات
        </div>
      )}
    </div>
  );
};

export default HelpTokens;