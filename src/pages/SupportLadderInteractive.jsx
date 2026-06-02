import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import HelpTokens from '../components/Interactive/HelpTokens.jsx';

// ---- QR Code generator (no external lib needed) ----
// We'll use the free QR API: api.qrserver.com
const QR_PAGE_PATH = '/support-ladder/steps'; // the route for SupportLadderSteps

const SupportLadderInteractive = () => {
  const [students, setStudents] = useState([
    { name: 'فاطمة', tokens: 3, tokenHistory: [] },
    { name: 'نور', tokens: 3, tokenHistory: [] },
    { name: 'ياسمين', tokens: 3, tokenHistory: [] },
    { name: 'سلمى', tokens: 3, tokenHistory: [] }
  ]);
  const [helpRequests, setHelpRequests] = useState([]);
  const [showQR, setShowQR] = useState(false);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;

  const theme = {
    primary: '#1E3A5F',
    secondary: '#2A9D8F',
    accent: '#F4A261',
    danger: '#E76F51',
    light: '#F0F4F8',
    white: '#FFFFFF',
  };

  // Build the QR code URL — points to wherever this app is deployed
  const qrTargetUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}${QR_PAGE_PATH}`
      : `https://yourapp.com${QR_PAGE_PATH}`;

  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${encodeURIComponent(qrTargetUrl)}&color=1E3A5F&bgcolor=FFFFFF&qzone=2`;

  const handleTokenUsed = (studentName, remainingTokens) => {
    setStudents(prev =>
      prev.map(s => (s.name === studentName ? { ...s, tokens: remainingTokens } : s))
    );
    setHelpRequests(prev => [
      ...prev,
      { student: studentName, time: new Date().toLocaleTimeString('ar-EG'), remainingTokens }
    ]);
  };

  const resetAllTokens = () => {
    setStudents(prev => prev.map(s => ({ ...s, tokens: 3 })));
    setHelpRequests([]);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(qrTargetUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // ---- Animations ----
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 90, damping: 14 } }
  };

  return (
    <div style={{ minHeight: '100vh', background: theme.light, overflowX: 'hidden', fontFamily: 'system-ui, sans-serif' }}>

      {/* ===== HERO ===== */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          background: `linear-gradient(135deg, ${theme.primary} 0%, #2A5F8F 100%)`,
          borderRadius: isMobile ? '0 0 28px 28px' : '0 0 40px 40px',
          padding: isMobile ? '28px 20px 36px' : '40px 32px 52px',
          marginBottom: isMobile ? '24px' : '40px',
          color: 'white',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative dots */}
        <motion.div
          style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
          animate={{ backgroundPosition: ['0px 0px', '32px 32px'] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        />

        <Link
          to="/support-ladder"
          style={{
            position: 'absolute', top: isMobile ? 14 : 20, right: isMobile ? 14 : 20,
            color: 'white', textDecoration: 'none',
            background: 'rgba(255,255,255,0.18)',
            backdropFilter: 'blur(8px)',
            padding: isMobile ? '7px 14px' : '9px 20px',
            borderRadius: '25px',
            fontSize: isMobile ? '0.78rem' : '0.88rem',
            fontWeight: '500',
            zIndex: 10,
            transition: 'background 0.25s',
          }}
        >
          ← العودة للشرح
        </Link>

        <motion.div
          animate={{ y: [0, -12, 0], rotate: [0, 4, -4, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ fontSize: isMobile ? '3.2rem' : '4.5rem', marginBottom: 14, display: 'inline-block' }}
        >
          🪜
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{ fontSize: isMobile ? '1.5rem' : isTablet ? '2rem' : '2.4rem', marginBottom: 10, fontWeight: 'bold' }}
        >
          تدريب سلم الدعم
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
          style={{ fontSize: isMobile ? '0.88rem' : '1rem', opacity: 0.92, maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}
        >
          كل طالب لديه 3 كوبونات مساعدة في الأسبوع<br />
          استخدم الكوبون فقط بعد استنفاد خطوات السلم الأربع الأولى!
        </motion.p>
      </motion.div>

      {/* ===== MAIN CONTENT ===== */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: isMobile ? '0 14px 40px' : '0 24px 60px' }}>

        {/* QR Code Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, type: 'spring', stiffness: 100 }}
          style={{ display: 'flex', justifyContent: 'center', marginBottom: isMobile ? 24 : 36 }}
        >
          <motion.button
            onClick={() => setShowQR(true)}
            whileHover={{ scale: 1.06, boxShadow: `0 8px 28px ${theme.secondary}55` }}
            whileTap={{ scale: 0.97 }}
            animate={{
              boxShadow: [
                `0 4px 16px ${theme.secondary}35`,
                `0 8px 28px ${theme.secondary}55`,
                `0 4px 16px ${theme.secondary}35`,
              ]
            }}
            transition={{ duration: 2.5, repeat: Infinity }}
            style={{
              background: `linear-gradient(135deg, ${theme.secondary}, #21867a)`,
              border: 'none',
              color: 'white',
              padding: isMobile ? '14px 28px' : '16px 40px',
              borderRadius: '50px',
              fontSize: isMobile ? '0.95rem' : '1.05rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <span style={{ fontSize: '1.4rem' }}>📱</span>
            توليد QR Code للطلاب
            <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1, repeat: Infinity }}>←</motion.span>
          </motion.button>
        </motion.div>

        {/* Students Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(2, 1fr)',
            gap: isMobile ? 16 : 24,
            marginBottom: isMobile ? 24 : 36,
          }}
        >
          {students.map(student => (
            <motion.div key={student.name} variants={itemVariants}>
              <HelpTokens
                studentName={student.name}
                onTokenUsed={handleTokenUsed}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Help Requests Log */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          style={{
            background: 'white',
            borderRadius: isMobile ? 18 : 24,
            padding: isMobile ? '18px 16px' : '24px 28px',
            marginBottom: isMobile ? 24 : 36,
            boxShadow: '0 4px 20px rgba(0,0,0,0.07)',
            border: '1px solid rgba(0,0,0,0.04)',
          }}
        >
          <h3 style={{ color: theme.primary, marginBottom: 16, fontSize: isMobile ? '1rem' : '1.15rem', display: 'flex', alignItems: 'center', gap: 8 }}>
            📋 سجل طلبات المساعدة
          </h3>

          <AnimatePresence>
            {helpRequests.length === 0 ? (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ color: '#6C757D', textAlign: 'center', padding: '16px 0', fontSize: isMobile ? '0.88rem' : '0.95rem' }}
              >
                لم يتم استخدام أي كوبونات مساعدة بعد
              </motion.p>
            ) : (
              <div>
                {helpRequests.map((req, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    style={{
                      padding: isMobile ? '10px 8px' : '12px 14px',
                      borderBottom: i < helpRequests.length - 1 ? '1px solid #F0F0F0' : 'none',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: 6,
                    }}
                  >
                    <span style={{ fontSize: isMobile ? '0.88rem' : '0.95rem' }}>
                      👩‍🎓 <strong>{req.student}</strong>
                    </span>
                    <span style={{ color: theme.danger, fontSize: isMobile ? '0.82rem' : '0.9rem' }}>🎫 استخدم كوبون</span>
                    <span style={{ fontSize: '0.8rem', color: '#6C757D' }}>{req.time}</span>
                    <span style={{
                      fontSize: '0.82rem',
                      background: req.remainingTokens === 0 ? '#FFE8E4' : '#E8F5F3',
                      color: req.remainingTokens === 0 ? theme.danger : theme.secondary,
                      padding: '3px 10px',
                      borderRadius: 20,
                      fontWeight: '600',
                    }}>
                      متبقي: {req.remainingTokens}
                    </span>
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85 }}
          style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <motion.button
            onClick={resetAllTokens}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            style={{
              background: `linear-gradient(135deg, ${theme.danger}, #c0533c)`,
              border: 'none',
              padding: isMobile ? '12px 24px' : '13px 32px',
              borderRadius: '30px',
              cursor: 'pointer',
              fontWeight: 'bold',
              color: 'white',
              fontSize: isMobile ? '0.9rem' : '0.95rem',
              display: 'flex', alignItems: 'center', gap: 8,
            }}
          >
            🔄 إعادة ضبط الكوبونات
          </motion.button>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <Link
              to="/support-ladder"
              style={{
                background: `linear-gradient(135deg, ${theme.secondary}, #21867a)`,
                border: 'none',
                padding: isMobile ? '12px 24px' : '13px 32px',
                borderRadius: '30px',
                cursor: 'pointer',
                fontWeight: 'bold',
                color: 'white',
                textDecoration: 'none',
                fontSize: isMobile ? '0.9rem' : '0.95rem',
                display: 'inline-flex', alignItems: 'center', gap: 8,
              }}
            >
              📖 العودة للشرح
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* ===== QR CODE MODAL ===== */}
      <AnimatePresence>
        {showQR && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowQR(false)}
            style={{
              position: 'fixed', inset: 0, zIndex: 1000,
              background: 'rgba(10,25,47,0.7)',
              backdropFilter: 'blur(6px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: 20,
            }}
          >
            <motion.div
              initial={{ scale: 0.75, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 30 }}
              transition={{ type: 'spring', stiffness: 110, damping: 16 }}
              onClick={e => e.stopPropagation()}
              style={{
                background: 'white',
                borderRadius: 28,
                padding: isMobile ? '28px 20px' : '40px 44px',
                maxWidth: 440,
                width: '100%',
                textAlign: 'center',
                boxShadow: '0 24px 60px rgba(0,0,0,0.25)',
                position: 'relative',
              }}
            >
              {/* Close */}
              <motion.button
                onClick={() => setShowQR(false)}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  position: 'absolute', top: 16, left: 16,
                  background: '#F0F4F8', border: 'none',
                  width: 36, height: 36, borderRadius: '50%',
                  cursor: 'pointer', fontSize: '1rem',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'background 0.2s',
                }}
              >
                ✕
              </motion.button>

              {/* Icon */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                style={{ fontSize: '3rem', marginBottom: 12 }}
              >
                📱
              </motion.div>

              <h2 style={{ color: theme.primary, fontSize: isMobile ? '1.3rem' : '1.6rem', marginBottom: 6 }}>
                QR Code — سلم الدعم
              </h2>
              <p style={{ color: '#6C757D', fontSize: '0.88rem', marginBottom: 24, lineHeight: 1.6 }}>
                امسح الكود بكاميرا الهاتف للدخول على صفحة خطوات سلم الدعم
              </p>

              {/* QR Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                style={{
                  display: 'inline-block',
                  padding: 14,
                  borderRadius: 20,
                  background: 'white',
                  boxShadow: `0 0 0 3px ${theme.secondary}30, 0 8px 24px rgba(0,0,0,0.12)`,
                  marginBottom: 20,
                }}
              >
                <img
                  src={qrImageUrl}
                  alt="QR Code سلم الدعم"
                  style={{ width: isMobile ? 200 : 240, height: isMobile ? 200 : 240, display: 'block', borderRadius: 10 }}
                />
              </motion.div>

              {/* URL display */}
              <div style={{
                background: '#F0F4F8', borderRadius: 12,
                padding: '10px 14px',
                fontSize: '0.78rem',
                color: '#4A5568',
                marginBottom: 18,
                wordBreak: 'break-all',
                direction: 'ltr',
                textAlign: 'left',
              }}>
                {qrTargetUrl}
              </div>

              {/* Action buttons */}
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                <motion.button
                  onClick={handleCopyLink}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    background: copied ? '#E8F5F3' : '#F0F4F8',
                    border: `1.5px solid ${copied ? theme.secondary : '#DDE2E8'}`,
                    color: copied ? theme.secondary : '#4A5568',
                    padding: '10px 22px',
                    borderRadius: 25,
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontSize: '0.88rem',
                    transition: 'all 0.25s',
                    display: 'flex', alignItems: 'center', gap: 7,
                  }}
                >
                  {copied ? '✅ تم النسخ!' : '🔗 نسخ الرابط'}
                </motion.button>

                <motion.a
                  href={qrImageUrl}
                  download="support-ladder-qr.png"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    background: `linear-gradient(135deg, ${theme.secondary}, #21867a)`,
                    color: 'white',
                    padding: '10px 22px',
                    borderRadius: 25,
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontSize: '0.88rem',
                    textDecoration: 'none',
                    display: 'inline-flex', alignItems: 'center', gap: 7,
                  }}
                >
                  ⬇️ تحميل الصورة
                </motion.a>
              </div>

              {/* Hint */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                style={{
                  marginTop: 20,
                  fontSize: '0.78rem',
                  color: '#9CA3AF',
                  background: '#FFFBF0',
                  border: '1px solid #F4A26130',
                  borderRadius: 10,
                  padding: '8px 14px',
                  lineHeight: 1.6,
                }}
              >
                💡 اطبع هذا الكود وضعه على مكاتب الطلاب أو على لوحة الفصل
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
        body { overflow-x: hidden; }
        ::-webkit-scrollbar { width: 7px; }
        ::-webkit-scrollbar-track { background: #F0F4F8; }
        ::-webkit-scrollbar-thumb { background: linear-gradient(135deg, #2A9D8F, #1E3A5F); border-radius: 4px; }
      `}</style>
    </div>
  );
};

export default SupportLadderInteractive;
