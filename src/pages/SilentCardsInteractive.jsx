import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const theme = {
  primary: '#1E3A5F',
  teal: '#2A9D8F',
  yellow: '#E9C46A',
  orange: '#E76F51',
  light: '#F5F7F0',
  white: '#FFFFFF',
};

const CARD_OPTIONS = [
  { key: 'green', icon: '🟢', label: 'فاهم', color: '#2A9D8F', bg: '#E8F5F3', textColor: 'white' },
  { key: 'yellow', icon: '🟡', label: 'محتاج توضيح', color: '#C8A600', bg: '#FEF9EA', textColor: '#1E3A5F' },
  { key: 'red', icon: '🔴', label: 'توهت', color: '#E76F51', bg: '#FEF0EC', textColor: 'white' },
];

const INITIAL_STUDENTS = [
  { name: 'فاطمة' }, { name: 'نور' }, { name: 'ياسمين' },
  { name: 'سلمى' }, { name: 'مريم' }, { name: 'ليلى' },
].map(s => ({ ...s, card: null, lastResponse: null }));

const SilentCardsInteractive = () => {
  const [students, setStudents] = useState(INITIAL_STUDENTS);
  const [teacherMessage, setTeacherMessage] = useState('');
  const [teacherType, setTeacherType] = useState(null); // 'green'|'yellow'|'red'|'neutral'
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

  // Compute stats live from students state
  const stats = students.reduce(
    (acc, s) => {
      if (s.card) acc[s.card] = (acc[s.card] || 0) + 1;
      return acc;
    },
    { green: 0, yellow: 0, red: 0 }
  );

  const updateStudentCard = (name, cardColor) => {
    setStudents(prev =>
      prev.map(s => {
        if (s.name !== name) return s;
        const newCard = s.card === cardColor ? null : cardColor;
        return { ...s, card: newCard, lastResponse: new Date().toLocaleTimeString('ar-EG') };
      })
    );
  };

  const getTeacherResponse = () => {
    if (stats.red > 2) {
      setTeacherMessage('يوجد عدد كبير من الطلاب الذين لم يفهموا. سأعيد شرح النقطة الرئيسية بطريقة مختلفة.');
      setTeacherType('red');
    } else if (stats.yellow > 3) {
      setTeacherMessage('يوجد عدة طلاب يحتاجون توضيحاً. سأقدم أمثلة إضافية وأتوقف لحظة.');
      setTeacherType('yellow');
    } else if (stats.green > 4) {
      setTeacherMessage('معظم الطلاب فهموا! سأنتقل إلى التطبيق العملي الآن.');
      setTeacherType('green');
    } else {
      setTeacherMessage('سأنتظر قليلاً لأرى المزيد من البطاقات قبل اتخاذ قرار.');
      setTeacherType('neutral');
    }
  };

  const resetAllCards = () => {
    setStudents(prev => prev.map(s => ({ ...s, card: null, lastResponse: null })));
    setTeacherMessage('');
    setTeacherType(null);
  };

  const teacherBg = {
    green: 'linear-gradient(135deg, #2A9D8F, #21867a)',
    yellow: 'linear-gradient(135deg, #C8A600, #E9C46A)',
    red: 'linear-gradient(135deg, #E76F51, #c0533c)',
    neutral: `linear-gradient(135deg, ${theme.primary}, #2A5F8F)`,
  };
  const teacherIcon = { green: '🟢', yellow: '🟡', red: '🔴', neutral: '📊' };
  const teacherTextColor = { green: 'white', yellow: theme.primary, red: 'white', neutral: 'white' };

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
          background: `linear-gradient(135deg, #C8A600 0%, ${theme.yellow} 100%)`,
          borderRadius: isMobile ? '0 0 28px 28px' : '0 0 44px 44px',
          padding: isMobile ? '36px 20px 48px' : '52px 32px 64px',
          textAlign: 'center', color: theme.primary,
          position: 'relative', overflow: 'hidden',
          marginBottom: isMobile ? 24 : 40,
        }}
      >
        <motion.div
          style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.05) 1.5px, transparent 1.5px)',
            backgroundSize: '28px 28px',
          }}
          animate={{ backgroundPosition: ['0px 0px', '28px 28px'] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
        />

        <Link to="/silent-cards" style={{
          position: 'absolute', top: isMobile ? 14 : 20, right: isMobile ? 14 : 24,
          color: theme.primary, textDecoration: 'none',
          background: 'rgba(255,255,255,0.35)', backdropFilter: 'blur(8px)',
          padding: isMobile ? '7px 14px' : '9px 22px',
          borderRadius: 25, fontSize: isMobile ? '0.78rem' : '0.88rem', fontWeight: 500, zIndex: 10,
        }}>
          ← العودة للشرح
        </Link>

        <motion.div
          animate={{ y: [0, -12, 0], rotate: [0, 8, -8, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ fontSize: isMobile ? '3.2rem' : '4.5rem', marginBottom: 14, display: 'inline-block' }}
        >
          🃏
        </motion.div>

        <h1 style={{ fontSize: isMobile ? '1.5rem' : '2.2rem', fontWeight: 'bold', marginBottom: 10 }}>
          تدريب بطاقات التعبير الصامت
        </h1>
        <p style={{ fontSize: isMobile ? '0.85rem' : '0.98rem', opacity: 0.8, maxWidth: 480, margin: '0 auto', lineHeight: 1.7 }}>
          كل طالب يرفع البطاقة التي تعبر عن حالته<br />
          المعلمة ترى البطاقات وتستجيب حسب الحاجة
        </p>
      </motion.div>

      <div style={{ maxWidth: 980, margin: '0 auto', padding: isMobile ? '0 14px 48px' : '0 28px 72px' }}>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: isMobile ? 10 : 16,
            marginBottom: isMobile ? 20 : 30,
          }}
        >
          {CARD_OPTIONS.map(opt => (
            <motion.div
              key={opt.key}
              animate={{ scale: stats[opt.key] > 0 ? [1, 1.04, 1] : 1 }}
              transition={{ duration: 0.4 }}
              style={{
                background: stats[opt.key] > 0
                  ? `linear-gradient(135deg, ${opt.color}, ${opt.color}cc)`
                  : 'white',
                borderRadius: isMobile ? 14 : 18,
                padding: isMobile ? '12px 8px' : '18px 14px',
                textAlign: 'center',
                boxShadow: stats[opt.key] > 0
                  ? `0 4px 18px ${opt.color}44`
                  : '0 2px 10px rgba(0,0,0,0.07)',
                transition: 'all 0.4s ease',
                border: `1.5px solid ${stats[opt.key] > 0 ? 'transparent' : opt.color + '30'}`,
              }}
            >
              <div style={{ fontSize: isMobile ? '1.6rem' : '2rem', marginBottom: 4 }}>{opt.icon}</div>
              <div style={{
                fontSize: isMobile ? '1.4rem' : '1.8rem', fontWeight: '800',
                color: stats[opt.key] > 0 ? opt.textColor : opt.color,
              }}>
                {stats[opt.key]}
              </div>
              <div style={{
                fontSize: isMobile ? '0.72rem' : '0.82rem',
                color: stats[opt.key] > 0 ? opt.textColor : '#64748B',
                fontWeight: '600', opacity: stats[opt.key] > 0 ? 0.9 : 1,
              }}>
                {opt.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Teacher Response */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          style={{
            background: teacherType ? teacherBg[teacherType] : `linear-gradient(135deg, ${theme.primary}, #2A5F8F)`,
            borderRadius: isMobile ? 16 : 22,
            padding: isMobile ? '18px 16px' : '22px 28px',
            marginBottom: isMobile ? 20 : 30,
            color: teacherType ? teacherTextColor[teacherType] : 'white',
            transition: 'all 0.5s ease',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12, justifyContent: 'center' }}>
            <span style={{ fontSize: '1.5rem' }}>👩‍🏫</span>
            <h3 style={{ margin: 0, fontSize: isMobile ? '0.95rem' : '1.05rem', fontWeight: '700' }}>
              رد فعل المعلمة
            </h3>
          </div>

          <AnimatePresence mode="wait">
            <motion.p
              key={teacherMessage}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              style={{
                textAlign: 'center', margin: '0 0 14px',
                fontSize: isMobile ? '0.88rem' : '0.95rem', lineHeight: 1.6,
                opacity: teacherMessage ? 1 : 0.6,
              }}
            >
              {teacherMessage
                ? `${teacherType ? teacherIcon[teacherType] : ''} ${teacherMessage}`
                : 'انتظر رفع البطاقات من الطلاب...'}
            </motion.p>
          </AnimatePresence>

          <div style={{ textAlign: 'center' }}>
            <motion.button
              onClick={getTeacherResponse}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              style={{
                background: 'rgba(255,255,255,0.22)',
                border: '1.5px solid rgba(255,255,255,0.4)',
                color: teacherType === 'yellow' ? theme.primary : 'white',
                padding: isMobile ? '9px 22px' : '10px 28px',
                borderRadius: 25,
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: isMobile ? '0.85rem' : '0.9rem',
                backdropFilter: 'blur(8px)',
                transition: 'all 0.25s',
              }}
            >
              🎯 اتخذ قراراً كمعلمة
            </motion.button>
          </div>
        </motion.div>

        {/* Students Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile
              ? 'repeat(2, 1fr)'
              : isTablet
              ? 'repeat(3, 1fr)'
              : 'repeat(3, 1fr)',
            gap: isMobile ? 12 : 18,
            marginBottom: isMobile ? 24 : 36,
          }}
        >
          {students.map((student, idx) => {
            const active = CARD_OPTIONS.find(o => o.key === student.card);
            return (
              <motion.div
                key={student.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.07, type: 'spring', stiffness: 90 }}
                style={{
                  background: active ? active.bg : 'white',
                  borderRadius: isMobile ? 16 : 20,
                  padding: isMobile ? '14px 12px' : '18px 16px',
                  textAlign: 'center',
                  boxShadow: active
                    ? `0 4px 18px ${active.color}30`
                    : '0 2px 10px rgba(0,0,0,0.07)',
                  border: `2px solid ${active ? active.color + '60' : 'transparent'}`,
                  transition: 'all 0.35s ease',
                }}
              >
                <h4 style={{
                  marginBottom: isMobile ? 12 : 16,
                  color: active ? active.color : theme.primary,
                  fontSize: isMobile ? '0.88rem' : '0.95rem',
                  fontWeight: '700',
                  transition: 'color 0.3s',
                }}>
                  {student.name}
                </h4>

                <div style={{ display: 'flex', gap: isMobile ? 7 : 10, justifyContent: 'center' }}>
                  {CARD_OPTIONS.map(opt => (
                    <motion.button
                      key={opt.key}
                      onClick={() => updateStudentCard(student.name, opt.key)}
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.9 }}
                      animate={student.card === opt.key ? { scale: [1, 1.2, 1] } : { scale: 1 }}
                      transition={{ duration: 0.3 }}
                      style={{
                        background: student.card === opt.key ? opt.color : '#F5F7FA',
                        border: `2px solid ${student.card === opt.key ? opt.color : '#E2E8F0'}`,
                        width: isMobile ? 38 : 46,
                        height: isMobile ? 38 : 46,
                        borderRadius: 12,
                        fontSize: isMobile ? '1.1rem' : '1.35rem',
                        cursor: 'pointer',
                        transition: 'all 0.25s ease',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: student.card === opt.key ? `0 3px 10px ${opt.color}55` : 'none',
                      }}
                    >
                      {opt.icon}
                    </motion.button>
                  ))}
                </div>

                {student.lastResponse && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{ fontSize: '0.68rem', color: '#9CA3AF', marginTop: 10 }}
                  >
                    {student.lastResponse}
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <motion.button
            onClick={resetAllCards}
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
            🔄 إعادة ضبط جميع البطاقات
          </motion.button>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <Link to="/silent-cards" style={{
              background: `linear-gradient(135deg, #C8A600, ${theme.yellow})`,
              padding: isMobile ? '11px 24px' : '13px 32px',
              borderRadius: 30, fontWeight: 'bold',
              color: theme.primary, textDecoration: 'none',
              fontSize: isMobile ? '0.88rem' : '0.95rem',
              display: 'inline-flex', alignItems: 'center', gap: 7,
            }}>
              📖 العودة للشرح
            </Link>
          </motion.div>
        </motion.div>
      </div>

      <style>{`* { box-sizing: border-box; } body { overflow-x: hidden; margin: 0; }`}</style>
    </div>
  );
};

export default SilentCardsInteractive;
