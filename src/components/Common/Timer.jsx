import React, { useState, useEffect } from 'react';

const Timer = ({ duration, onComplete, label }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isActive, setIsActive] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let interval;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      setIsComplete(true);
      if (onComplete) onComplete();
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, onComplete]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    setIsActive(true);
    setIsComplete(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setTimeLeft(duration);
    setIsComplete(false);
  };

  const percentage = ((duration - timeLeft) / duration) * 100;

  return (
    <div style={{
      background: 'linear-gradient(135deg, #1E3A5F 0%, #2A5F8F 100%)',
      borderRadius: '24px',
      padding: '24px',
      textAlign: 'center',
      color: 'white',
      marginBottom: '24px'
    }}>
      <h3 style={{ marginBottom: '16px', fontSize: '1.3rem' }}>{label}</h3>
      <div style={{
        fontSize: '4rem',
        fontWeight: 'bold',
        fontFamily: 'monospace',
        marginBottom: '20px'
      }}>
        {formatTime(timeLeft)}
      </div>
      <div style={{
        width: '100%',
        height: '8px',
        backgroundColor: 'rgba(255,255,255,0.3)',
        borderRadius: '4px',
        overflow: 'hidden',
        marginBottom: '20px'
      }}>
        <div style={{
          width: `${percentage}%`,
          height: '100%',
          backgroundColor: '#F4A261',
          transition: 'width 1s linear'
        }} />
      </div>
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
        {!isActive && !isComplete && (
          <button onClick={handleStart} style={{
            background: '#F4A261',
            border: 'none',
            padding: '12px 32px',
            borderRadius: '30px',
            fontSize: '1rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            color: '#1E3A5F'
          }}>
            ▶ ابدأ
          </button>
        )}
        {isActive && (
          <button onClick={() => setIsActive(false)} style={{
            background: '#E76F51',
            border: 'none',
            padding: '12px 32px',
            borderRadius: '30px',
            fontSize: '1rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            color: 'white'
          }}>
            ⏸ إيقاف مؤقت
          </button>
        )}
        <button onClick={handleReset} style={{
          background: 'rgba(255,255,255,0.2)',
          border: '1px solid rgba(255,255,255,0.5)',
          padding: '12px 32px',
          borderRadius: '30px',
          fontSize: '1rem',
          fontWeight: 'bold',
          cursor: 'pointer',
          color: 'white'
        }}>
          🔄 إعادة ضبط
        </button>
      </div>
      {isComplete && (
        <div style={{
          marginTop: '16px',
          padding: '12px',
          backgroundColor: '#2A9D8F',
          borderRadius: '12px',
          animation: 'pulse 0.5s ease'
        }}>
          ✅ {duration === 600 ? 'انتهى الوقت! انتقل إلى المرحلة التالية.' : 'انتهى الوقت!'}
        </div>
      )}
      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.02); }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default Timer;