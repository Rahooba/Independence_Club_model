import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Timer from '../components/Common/Timer.jsx';
import StudentCard from '../components/Interactive/StudentCard.jsx';

const Model101010Interactive = () => {
  const [phase, setPhase] = useState(1);
  const [students, setStudents] = useState([
    { name: 'فاطمة', status: 'waiting', avatar: '👩‍🎓' },
    { name: 'نور', status: 'waiting', avatar: '👧' },
    { name: 'ياسمين', status: 'waiting', avatar: '⭐' },
    { name: 'سلمى', status: 'waiting', avatar: '🌸' },
    { name: 'مريم', status: 'waiting', avatar: '🦋' },
    { name: 'ليلى', status: 'waiting', avatar: '🌟' }
  ]);
  const [classParticipation, setClassParticipation] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [phaseTransition, setPhaseTransition] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);

  // إخفاء التعليمات بعد 5 ثواني
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInstructions(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const updateStudentStatus = (name, status) => {
    setStudents(prev => prev.map(s => 
      s.name === name ? { ...s, status } : s
    ));
    
    if (status === 'done') {
      setClassParticipation(prev => [...prev, { 
        name, 
        time: new Date().toLocaleTimeString(),
        phase: phase 
      }]);
    }
  };

  const handlePhaseComplete = () => {
    setPhaseTransition(true);
    setTimeout(() => {
      if (phase < 3) {
        setPhase(phase + 1);
        setStudents(prev => prev.map(s => ({ ...s, status: 'waiting' })));
      } else {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000);
      }
      setPhaseTransition(false);
    }, 800);
  };

  const getPhaseTitle = () => {
    switch(phase) {
      case 1: return { 
        title: 'المرحلة 1: العمل الفردي الصامت', 
        icon: '✏️', 
        color: '#1E3A5F', 
        gradient: 'linear-gradient(135deg, #1E3A5F 0%, #2A5F8F 100%)',
        rule: '🔇 ممنوع الكلام أو رفع اليد - كل طالب يحاول بمفرده',
        tips: ['ركز على تفكيرك', 'لا تخف من الخطأ', 'جرب أكثر من طريقة']
      };
      case 2: return { 
        title: 'المرحلة 2: العمل الثنائي', 
        icon: '🤝', 
        color: '#2A9D8F', 
        gradient: 'linear-gradient(135deg, #2A9D8F 0%, #21867a 100%)',
        rule: '💬 ناقش مع زميلك - لا ترفع يدك للمعلم',
        tips: ['استمع جيداً لزميلك', 'شارك أفكارك', 'تعاونوا لإيجاد أفضل حل']
      };
      case 3: return { 
        title: 'المرحلة 3: المناقشة الجماعية', 
        icon: '🗣️', 
        color: '#F4A261', 
        gradient: 'linear-gradient(135deg, #F4A261 0%, #E76F51 100%)',
        rule: '🙋 ارفع يدك للمشاركة - المعلم يدير النقاش',
        tips: ['لا تخف من المشاركة', 'تعلم من أخطاء الآخرين', 'استفسر عما لم تفهمه']
      };
      default: return { title: '', icon: '', color: '', gradient: '', rule: '', tips: [] };
    }
  };

  const currentPhase = getPhaseTitle();

  // إحصائيات متقدمة
  const completedCount = students.filter(s => s.status === 'done').length;
  const needHelpCount = students.filter(s => s.status === 'needHelp').length;
  const workingCount = students.filter(s => s.status === 'working').length;
  const completionRate = Math.round((completedCount / students.length) * 100);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #eef2f7 100%)',
      padding: '24px',
      position: 'relative'
    }}>
      {/* Animated Background Particles */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
        zIndex: 0
      }}>
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 0.5, 0],
              scale: [0, 1, 2],
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight
            }}
            transition={{
              duration: 5 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 10
            }}
            style={{
              position: 'absolute',
              width: 4 + Math.random() * 8,
              height: 4 + Math.random() * 8,
              borderRadius: '50%',
              background: `rgba(30, 58, 95, ${0.1 + Math.random() * 0.2})`
            }}
          />
        ))}
      </div>

      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Header with Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: '24px' }}
        >
          <Link 
            to="/model-10-10-10" 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: '#1E3A5F',
              border: 'none',
              padding: '10px 24px',
              borderRadius: '30px',
              color: 'white',
              textDecoration: 'none',
              fontSize: '0.9rem',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateX(-5px)';
              e.currentTarget.style.background = '#F4A261';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateX(0)';
              e.currentTarget.style.background = '#1E3A5F';
            }}
          >
            ← العودة إلى شرح النموذج
          </Link>
        </motion.div>

        {/* Phase Header with Animation */}
        <motion.div
          initial={{ opacity: 0, y: -30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, type: 'spring' }}
          style={{
            background: currentPhase.gradient,
            borderRadius: '32px',
            padding: '32px',
            marginBottom: '32px',
            color: 'white',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
          }}
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ fontSize: '3rem', marginBottom: '16px' }}
          >
            {currentPhase.icon}
          </motion.div>
          
          <motion.h1
            key={phase}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ fontSize: 'clamp(1.5rem, 5vw, 2rem)', marginBottom: '16px' }}
          >
            {currentPhase.title}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            style={{ fontSize: '1rem', opacity: 0.95 }}
          >
            {currentPhase.rule}
          </motion.p>

          {/* Tips Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '16px',
              marginTop: '24px',
              flexWrap: 'wrap'
            }}
          >
            {currentPhase.tips.map((tip, i) => (
              <motion.span
                key={i}
                whileHover={{ scale: 1.05, y: -2 }}
                style={{
                  background: 'rgba(255,255,255,0.2)',
                  padding: '6px 16px',
                  borderRadius: '50px',
                  fontSize: '0.85rem',
                  backdropFilter: 'blur(10px)'
                }}
              >
                💡 {tip}
              </motion.span>
            ))}
          </motion.div>

          {/* Decorative elements */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            style={{
              position: 'absolute',
              top: -50,
              right: -50,
              width: '150px',
              height: '150px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)'
            }}
          />
        </motion.div>

        {/* Phase Transition Animation */}
        <AnimatePresence>
          {phaseTransition && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                background: 'rgba(30,58,95,0.95)',
                backdropFilter: 'blur(20px)',
                padding: '40px 60px',
                borderRadius: '32px',
                color: 'white',
                textAlign: 'center',
                zIndex: 1000,
                boxShadow: '0 25px 50px rgba(0,0,0,0.3)'
              }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 0.8 }}
                style={{ fontSize: '3rem', marginBottom: '16px' }}
              >
                🔄
              </motion.div>
              <h3>الانتقال إلى المرحلة التالية...</h3>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Instructions Toast */}
        <AnimatePresence>
          {showInstructions && (
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.5 }}
              style={{
                position: 'fixed',
                bottom: '24px',
                right: '24px',
                background: '#1E3A5F',
                color: 'white',
                padding: '16px 24px',
                borderRadius: '16px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
                maxWidth: '300px',
                zIndex: 100,
                cursor: 'pointer'
              }}
              onClick={() => setShowInstructions(false)}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '1.5rem' }}>💡</span>
                <div>
                  <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>نصائح سريعة</div>
                  <div style={{ fontSize: '0.85rem', opacity: 0.9 }}>
                    اضغط على "ابدأ العمل" لكل طالب ثم تابع تقدمهم
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Timer Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Timer 
            duration={600} 
            onComplete={handlePhaseComplete}
            label={`${currentPhase.icon} ${currentPhase.title} - المدة: 10 دقائق`}
          />
        </motion.div>

        {/* Students Grid - Responsive */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
            marginBottom: '32px'
          }}
        >
          {students.map((student, index) => (
            <motion.div
              key={student.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              whileHover={{ y: -5 }}
            >
              <StudentCard 
                name={student.name}
                initialStatus={student.status}
                onStatusChange={updateStudentStatus}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Dashboard - Responsive */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          style={{
            background: 'white',
            borderRadius: '24px',
            padding: '24px',
            marginBottom: '32px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
          }}
        >
          <h3 style={{ color: '#1E3A5F', marginBottom: '20px', fontSize: '1.3rem' }}>
            📊 لوحة الإحصائيات
          </h3>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '20px'
          }}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              style={{
                textAlign: 'center',
                padding: '16px',
                background: '#F8F9FA',
                borderRadius: '16px'
              }}
            >
              <div style={{ fontSize: '0.85rem', color: '#6C757D', marginBottom: '8px' }}>✅ أنجزوا المهمة</div>
              <motion.div
                key={completedCount}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2A9D8F' }}
              >
                {completedCount}/{students.length}
              </motion.div>
              <div style={{ fontSize: '0.75rem', color: '#6C757D', marginTop: '8px' }}>
                نسبة الإنجاز: {completionRate}%
              </div>
              <div style={{
                width: '100%',
                height: '6px',
                background: '#E9ECEF',
                borderRadius: '3px',
                marginTop: '8px',
                overflow: 'hidden'
              }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${completionRate}%` }}
                  transition={{ duration: 0.5 }}
                  style={{
                    height: '100%',
                    background: '#2A9D8F',
                    borderRadius: '3px'
                  }}
                />
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              style={{
                textAlign: 'center',
                padding: '16px',
                background: '#F8F9FA',
                borderRadius: '16px'
              }}
            >
              <div style={{ fontSize: '0.85rem', color: '#6C757D', marginBottom: '8px' }}>🆘 يحتاجون مساعدة</div>
              <motion.div
                key={needHelpCount}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                style={{ fontSize: '2rem', fontWeight: 'bold', color: '#E76F51' }}
              >
                {needHelpCount}
              </motion.div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              style={{
                textAlign: 'center',
                padding: '16px',
                background: '#F8F9FA',
                borderRadius: '16px'
              }}
            >
              <div style={{ fontSize: '0.85rem', color: '#6C757D', marginBottom: '8px' }}>✏️ يعملون حالياً</div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#F4A261' }}>
                {workingCount}
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              style={{
                textAlign: 'center',
                padding: '16px',
                background: '#F8F9FA',
                borderRadius: '16px'
              }}
            >
              <div style={{ fontSize: '0.85rem', color: '#6C757D', marginBottom: '8px' }}>📝 المشاركات</div>
              <motion.div
                key={classParticipation.length}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1E3A5F' }}
              >
                {classParticipation.length}
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Participation Log - Responsive */}
        <AnimatePresence>
          {classParticipation.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              style={{
                background: 'white',
                borderRadius: '24px',
                padding: '24px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
              }}
            >
              <h3 style={{ color: '#1E3A5F', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                📝 سجل المشاركة
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  style={{ fontSize: '0.8rem', background: '#F4A261', color: 'white', padding: '2px 8px', borderRadius: '20px' }}
                >
                  جديد
                </motion.span>
              </h3>
              <div style={{ maxHeight: '250px', overflowY: 'auto' }}>
                {classParticipation.slice().reverse().map((p, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    style={{
                      padding: '12px 16px',
                      borderBottom: '1px solid #E9ECEF',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: '8px'
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '1.2rem' }}>👩‍🎓</span>
                      <strong style={{ color: '#1E3A5F' }}>{p.name}</strong>
                      <span style={{ fontSize: '0.8rem', color: '#F4A261' }}>(المرحلة {p.phase})</span>
                    </span>
                    <span style={{ fontSize: '0.8rem', color: '#6C757D' }}>✅ أنهى المهمة - {p.time}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Confetti Modal */}
        <AnimatePresence>
          {showConfetti && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0,0,0,0.7)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 2000,
                backdropFilter: 'blur(5px)'
              }}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: 'spring', damping: 20 }}
                style={{
                  background: 'white',
                  borderRadius: '32px',
                  padding: '40px',
                  textAlign: 'center',
                  maxWidth: '450px',
                  margin: '20px',
                  boxShadow: '0 25px 50px rgba(0,0,0,0.3)'
                }}
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.5, repeat: 3 }}
                  style={{ fontSize: '5rem', marginBottom: '16px' }}
                >
                  🎉✨🏆
                </motion.div>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  style={{ color: '#1E3A5F', marginBottom: '16px', fontSize: '1.8rem' }}
                >
                  أحسنتم!
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  style={{ color: '#6C757D', marginBottom: '24px', lineHeight: '1.6' }}
                >
                  لقد أكملتم نموذج 10-10-10 بنجاح!
                  <br />
                  لاحظتم كيف تحسن اعتمادكم على أنفسكم؟
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <Link 
                    to="/model-10-10-10" 
                    style={{
                      background: 'linear-gradient(135deg, #F4A261, #E76F51)',
                      border: 'none',
                      padding: '14px 32px',
                      borderRadius: '50px',
                      fontWeight: 'bold',
                      color: 'white',
                      textDecoration: 'none',
                      display: 'inline-block',
                      transition: 'transform 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  >
                    العودة للشرح 📖
                  </Link>
                </motion.div>
              </motion.div>

              {/* Confetti particles */}
              {[...Array(50)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ 
                    x: '50%', 
                    y: '50%',
                    scale: 0,
                    rotate: 0
                  }}
                  animate={{ 
                    x: `${50 + (Math.random() - 0.5) * 200}%`,
                    y: `${50 + (Math.random() - 0.5) * 100}%`,
                    scale: 1,
                    rotate: 360 * (Math.random() - 0.5)
                  }}
                  transition={{ duration: 1, delay: Math.random() * 0.5 }}
                  style={{
                    position: 'absolute',
                    width: 8,
                    height: 8,
                    background: `hsl(${Math.random() * 360}, 70%, 50%)`,
                    borderRadius: Math.random() > 0.5 ? '50%' : '0',
                    pointerEvents: 'none'
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        * {
          -webkit-tap-highlight-color: transparent;
        }
        
        /* Responsive Styles */
        @media (max-width: 768px) {
          .students-grid {
            grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)) !important;
            gap: 12px !important;
          }
          
          .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 12px !important;
          }
        }
        
        @media (max-width: 480px) {
          .students-grid {
            grid-template-columns: 1fr !important;
          }
          
          .stats-grid {
            grid-template-columns: 1fr !important;
          }
        }
        
        /* Scrollbar Styling */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #E9ECEF;
          border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #F4A261;
          border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #E76F51;
        }
      `}</style>
    </div>
  );
};

export default Model101010Interactive;