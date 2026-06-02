import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import MistakeCard from '../components/Interactive/MistakeCard.jsx';

const theme = {
  primary: '#1E3A5F',
  orange: '#E76F51',
  yellow: '#F4A261',
  teal: '#2A9D8F',
  light: '#F8F4F0',
  white: '#FFFFFF',
};

const BeautifulMistakesInteractive = () => {
  const [mistakes, setMistakes] = useState([]);
  const [selectedMistake, setSelectedMistake] = useState(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  useEffect(() => {
    const onResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;

  const addMistake = (newMistake) => {
    setMistakes(prev => [newMistake, ...prev]);
  };

  const selectMistakeOfWeek = () => {
    if (mistakes.length > 0) {
      const randomIndex = Math.floor(Math.random() * mistakes.length);
      setSelectedMistake(mistakes[randomIndex]);
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 5000);
    }
  };

  return (
    <div style={{
      minHeight: '100vh', background: theme.light,
      overflowX: 'hidden', fontFamily: 'system-ui, sans-serif', direction: 'rtl',
    }}>

      {/* HERO */}
      <motion.div
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        style={{
          background: `linear-gradient(135deg, ${theme.orange} 0%, #c0533c 100%)`,
          borderRadius: isMobile ? '0 0 28px 28px' : '0 0 44px 44px',
          padding: isMobile ? '36px 20px 48px' : '52px 32px 64px',
          textAlign: 'center', color: 'white',
          position: 'relative', overflow: 'hidden',
          marginBottom: isMobile ? 24 : 40,
        }}
      >
        <motion.div
          style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.07) 1.5px, transparent 1.5px)',
            backgroundSize: '30px 30px',
          }}
          animate={{ backgroundPosition: ['0px 0px', '30px 30px'] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        />

        <Link to="/beautiful-mistakes" style={{
          position: 'absolute', top: isMobile ? 14 : 20, right: isMobile ? 14 : 24,
          color: 'white', textDecoration: 'none',
          background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(8px)',
          padding: isMobile ? '7px 14px' : '9px 22px',
          borderRadius: 25, fontSize: isMobile ? '0.78rem' : '0.88rem', fontWeight: 500, zIndex: 10,
        }}>
          ← العودة للشرح
        </Link>

        <motion.div
          animate={{ y: [0, -12, 0], rotate: [0, 6, -6, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ fontSize: isMobile ? '3.2rem' : '4.5rem', marginBottom: 14, display: 'inline-block' }}
        >
          ✨
        </motion.div>

        <h1 style={{ fontSize: isMobile ? '1.5rem' : '2.3rem', fontWeight: 'bold', marginBottom: 10 }}>
          لوحة الأخطاء الجميلة
        </h1>
        <p style={{ fontSize: isMobile ? '0.85rem' : '0.98rem', opacity: 0.92, maxWidth: 480, margin: '0 auto', lineHeight: 1.7 }}>
          "كل خطأ علمنا حاجة جديدة"<br />شارك خطأك لنتعلم جميعاً منه!
        </p>

        {/* mistakes count badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)',
            padding: '8px 20px', borderRadius: 25, marginTop: 16,
            fontSize: isMobile ? '0.82rem' : '0.9rem', fontWeight: '600',
          }}
        >
          📌 {mistakes.length} خطأ جميل مشارك
        </motion.div>
      </motion.div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: isMobile ? '0 14px 48px' : '0 28px 72px' }}>

        {/* Main Grid: Form + Board */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr' : 'repeat(2, 1fr)',
          gap: isMobile ? 18 : 28,
          marginBottom: isMobile ? 24 : 36,
        }}>
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 88 }}
          >
            <MistakeCard onAddMistake={addMistake} />
          </motion.div>

          {/* Board */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 88 }}
            style={{
              background: 'white',
              borderRadius: isMobile ? 18 : 24,
              padding: isMobile ? '18px 16px' : '24px 22px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.07)',
              border: `2px dashed ${theme.yellow}80`,
            }}
          >
            <h3 style={{
              color: theme.primary, marginBottom: 16,
              textAlign: 'center', fontSize: isMobile ? '1rem' : '1.1rem',
              fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}>
              📌 أخطاؤنا الجميلة
              <span style={{
                background: theme.orange, color: 'white',
                borderRadius: 20, padding: '2px 10px',
                fontSize: '0.8rem', fontWeight: '700',
              }}>{mistakes.length}</span>
            </h3>

            <div style={{ maxHeight: isMobile ? 220 : 310, overflowY: 'auto', paddingLeft: 4 }}>
              <AnimatePresence>
                {mistakes.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{ textAlign: 'center', padding: '28px 0', color: '#9CA3AF' }}
                  >
                    <div style={{ fontSize: '2.5rem', marginBottom: 10 }}>🌟</div>
                    <p style={{ fontSize: '0.88rem' }}>لا توجد أخطاء مشاركة بعد...<br />كن أول من يشارك!</p>
                  </motion.div>
                ) : (
                  mistakes.map((m, i) => (
                    <motion.div
                      key={m.id}
                      initial={{ opacity: 0, y: -14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: i * 0.04 }}
                      style={{
                        background: '#FEF8F5',
                        borderRadius: 14,
                        padding: isMobile ? '10px 12px' : '12px 14px',
                        marginBottom: 10,
                        borderRight: `4px solid ${theme.yellow}`,
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5, flexWrap: 'wrap', gap: 4 }}>
                        <span style={{ fontWeight: '700', color: theme.primary, fontSize: '0.88rem' }}>
                          👩‍🎓 {m.student}
                        </span>
                        <span style={{ fontSize: '0.72rem', color: '#9CA3AF' }}>{m.timestamp}</span>
                      </div>
                      <p style={{ color: '#475569', fontSize: isMobile ? '0.82rem' : '0.88rem', margin: 0, lineHeight: 1.5 }}>
                        {m.mistake}
                      </p>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Mistake of the Week */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          style={{
            background: `linear-gradient(135deg, ${theme.yellow}CC 0%, #E9C46A 100%)`,
            borderRadius: isMobile ? 18 : 24,
            padding: isMobile ? '20px 16px' : '28px 32px',
            marginBottom: isMobile ? 24 : 36,
            textAlign: 'center',
          }}
        >
          <h3 style={{ color: theme.primary, marginBottom: 14, fontSize: isMobile ? '1rem' : '1.2rem', fontWeight: '700' }}>
            🏆 خطأ الأسبوع
          </h3>

          <AnimatePresence mode="wait">
            {selectedMistake ? (
              <motion.div
                key={selectedMistake.id}
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.85, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 100 }}
                style={{
                  background: 'white',
                  borderRadius: 16,
                  padding: isMobile ? '14px' : '20px',
                  marginBottom: 16,
                  boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                }}
              >
                <p style={{ fontSize: isMobile ? '0.95rem' : '1.1rem', color: theme.primary, marginBottom: 8, fontWeight: '600' }}>
                  ✨ {selectedMistake.mistake}
                </p>
                <p style={{ color: '#6C757D', fontSize: '0.88rem', margin: 0 }}>— {selectedMistake.student}</p>
              </motion.div>
            ) : (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ color: theme.primary, opacity: 0.7, marginBottom: 14, fontSize: isMobile ? '0.85rem' : '0.92rem' }}
              >
                لم يتم اختيار خطأ الأسبوع بعد
              </motion.p>
            )}
          </AnimatePresence>

          <motion.button
            onClick={selectMistakeOfWeek}
            disabled={mistakes.length === 0}
            whileHover={mistakes.length > 0 ? { scale: 1.06 } : {}}
            whileTap={mistakes.length > 0 ? { scale: 0.97 } : {}}
            style={{
              background: mistakes.length > 0 ? theme.primary : '#9CA3AF',
              border: 'none',
              padding: isMobile ? '11px 24px' : '13px 32px',
              borderRadius: 30,
              cursor: mistakes.length > 0 ? 'pointer' : 'not-allowed',
              fontWeight: 'bold',
              color: 'white',
              fontSize: isMobile ? '0.88rem' : '0.95rem',
              transition: 'background 0.3s',
            }}
          >
            🎉 اختر خطأ الأسبوع
          </motion.button>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <motion.button
            onClick={() => setMistakes([])}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            style={{
              background: `linear-gradient(135deg, ${theme.orange}, #c0533c)`,
              border: 'none',
              padding: isMobile ? '11px 24px' : '13px 32px',
              borderRadius: 30, cursor: 'pointer',
              fontWeight: 'bold', color: 'white',
              fontSize: isMobile ? '0.88rem' : '0.95rem',
            }}
          >
            🗑️ مسح اللوحة
          </motion.button>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <Link to="/beautiful-mistakes" style={{
              background: `linear-gradient(135deg, ${theme.primary}, #2A5F8F)`,
              padding: isMobile ? '11px 24px' : '13px 32px',
              borderRadius: 30, fontWeight: 'bold',
              color: 'white', textDecoration: 'none',
              fontSize: isMobile ? '0.88rem' : '0.95rem',
              display: 'inline-flex', alignItems: 'center', gap: 7,
            }}>
              📖 العودة للشرح
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Celebration Toast */}
      <AnimatePresence>
        {showCelebration && selectedMistake && (
          <motion.div
            initial={{ opacity: 0, x: 80, y: 0 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 80 }}
            transition={{ type: 'spring', stiffness: 100 }}
            style={{
              position: 'fixed', bottom: isMobile ? 14 : 24,
              left: isMobile ? 14 : 24,
              background: `linear-gradient(135deg, ${theme.teal}, #21867a)`,
              borderRadius: 18, padding: isMobile ? '14px 18px' : '16px 24px',
              color: 'white', maxWidth: isMobile ? 280 : 360,
              boxShadow: '0 8px 28px rgba(0,0,0,0.2)',
              zIndex: 9999, fontSize: isMobile ? '0.85rem' : '0.92rem',
            }}
          >
            <div style={{ fontWeight: '700', marginBottom: 4, fontSize: isMobile ? '0.95rem' : '1rem' }}>
              🎉✨ مبروك!
            </div>
            خطأ <strong>{selectedMistake.student}</strong> تم اختياره كـ"أجمل خطأ في الأسبوع"!
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`* { box-sizing: border-box; } body { overflow-x: hidden; margin: 0; }`}</style>
    </div>
  );
};

export default BeautifulMistakesInteractive;
