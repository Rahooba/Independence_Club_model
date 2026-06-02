import React, { useState } from 'react';

const MistakeCard = ({ onAddMistake }) => {
  const [mistake, setMistake] = useState('');
  const [studentName, setStudentName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mistake.trim()) {
      onAddMistake({
        id: Date.now(),
        student: studentName || 'طالب',
        mistake: mistake,
        timestamp: new Date().toLocaleTimeString()
      });
      setMistake('');
      setStudentName('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{
      background: 'white',
      borderRadius: '16px',
      padding: '20px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
    }}>
      <h4 style={{ marginBottom: '16px', color: '#1E3A5F' }}>✨ شارك خطأك الجميل</h4>
      <input
        type="text"
        placeholder="اسمك (اختياري)"
        value={studentName}
        onChange={(e) => setStudentName(e.target.value)}
        style={{
          width: '100%',
          padding: '12px',
          border: '1px solid #E9ECEF',
          borderRadius: '12px',
          marginBottom: '12px',
          fontFamily: 'inherit'
        }}
      />
      <textarea
        placeholder="ما هو الخطأ الذي تعلمت منه اليوم؟..."
        value={mistake}
        onChange={(e) => setMistake(e.target.value)}
        rows="3"
        style={{
          width: '100%',
          padding: '12px',
          border: '1px solid #E9ECEF',
          borderRadius: '12px',
          marginBottom: '12px',
          fontFamily: 'inherit',
          resize: 'vertical'
        }}
      />
      <button
        type="submit"
        style={{
          background: '#F4A261',
          border: 'none',
          padding: '10px 24px',
          borderRadius: '25px',
          cursor: 'pointer',
          fontWeight: 'bold',
          color: '#1E3A5F',
          width: '100%'
        }}
      >
        📝 مشاركة الخطأ
      </button>
    </form>
  );
};

export default MistakeCard;