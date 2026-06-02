import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const theme = {
  primary: '#1E3A5F',
  orange: '#E76F51',
  orangeLight: '#FEF0EC',
  yellow: '#F4A261',
  teal: '#2A9D8F',
  light: '#F8F4F0',
  white: '#FFFFFF',
};

const steps = [
  {
    number: '01',
    icon: '🎯',
    title: 'ما هو "الخطأ الجميل"؟',
    desc: 'الخطأ الجميل هو الغلطة التي تعلمنا منها حاجة جديدة. كل خطأ هو خطوة نحو الفهم.',
    color: theme.orange,
    bg: '#FEF0EC',
  },
  {
    number: '02',
    icon: '📋',
    title: 'كيف تعمل اللوحة؟',
    desc: 'لوحة عليها ملصقات "أخطاؤنا الجميلة" يشارك فيها الطلاب أخطاءهم بكل ثقة وفخر.',
    color: '#E9C46A',
    bg: '#FEF9EA',
  },
  {
    number: '03',
    icon: '🗣️',
    title: 'مناقشة الأخطاء أسبوعياً',
    desc: 'يتم تخصيص وقت أسبوعي لمناقشة أبرز الأخطاء وتحليلها معاً كفريق واحد.',
    color: theme.teal,
    bg: '#E8F5F3',
  },
  {
    number: '04',
    icon: '🏆',
    title: 'الاحتفاء بـ"أجمل خطأ في الأسبوع"',
    desc: 'يتم اختيار خطأ واحد يُعتبر "الأجمل" والاحتفاء بصاحبه أمام الفصل كله.',
    color: theme.primary,
    bg: '#EAF0F8',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.13, delayChildren: 0.1 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 88, damping: 14 } },
};

const BeautifulMistakes = () => {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    const onResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const isMobile = windowWidth < 768;

  return (
    <div style={{ minHeight: '100vh', background: theme.light, overflowX: 'hidden', fontFamily: 'system-ui, sans-serif', direction: 'rtl' }}>

      {/* HERO */}
      <motion.div
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        style={{
          background: `linear-gradient(135deg, ${theme.orange} 0%, #c0533c 100%)`,
          borderRadius: isMobile ? '0 0 28px 28px' : '0 0 44px 44px',
          padding: isMobile ? '36px 20px 48px' : '56px 32px 68px',
          textAlign: 'center',
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
          marginBottom: isMobile ? 28 : 48,
        }}
      >
        {/* dot pattern */}
        <motion.div
          style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.07) 1.5px, transparent 1.5px)',
            backgroundSize: '30px 30px',
          }}
          animate={{ backgroundPosition: ['0px 0px', '30px 30px'] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        />

        <Link to="/home" style={{
          position: 'absolute', top: isMobile ? 14 : 20, right: isMobile ? 14 : 24,
          color: 'white', textDecoration: 'none',
          background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(8px)',
          padding: isMobile ? '7px 14px' : '9px 22px',
          borderRadius: 25, fontSize: isMobile ? '0.78rem' : '0.88rem', fontWeight: 500, zIndex: 10,
        }}>
          ← العودة للرئيسية
        </Link>

        <motion.div
          animate={{ y: [0, -12, 0], rotate: [0, 6, -6, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ fontSize: isMobile ? '3.5rem' : '5rem', marginBottom: 14, display: 'inline-block' }}
        >
          ✨
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{ fontSize: isMobile ? '1.7rem' : '2.6rem', fontWeight: 'bold', marginBottom: 10 }}
        >
          الأخطاء <motion.span
            style={{ color: '#F4A261', display: 'inline-block' }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2.2, repeat: Infinity }}
          >الجميلة</motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
          style={{ fontSize: isMobile ? '0.88rem' : '1rem', opacity: 0.93, maxWidth: 520, margin: '0 auto', lineHeight: 1.75 }}
        >
          لوحة وثقافة صفية تحوّل الخوف من الخطأ إلى فرصة للتعلم والاحتفاء
        </motion.p>
      </motion.div>

      {/* STEPS */}
      <div style={{ maxWidth: 820, margin: '0 auto', padding: isMobile ? '0 14px 48px' : '0 28px 72px' }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
            gap: isMobile ? 16 : 22,
            marginBottom: isMobile ? 32 : 48,
          }}
        >
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              variants={itemVariants}
              whileHover={{ y: -4, boxShadow: `0 10px 30px ${step.color}22` }}
              onHoverStart={() => setHovered(i)}
              onHoverEnd={() => setHovered(null)}
              style={{
                background: hovered === i ? step.bg : 'white',
                borderRadius: isMobile ? 18 : 22,
                padding: isMobile ? '18px 16px' : '24px 22px',
                boxShadow: '0 3px 14px rgba(0,0,0,0.07)',
                border: `1.5px solid ${hovered === i ? step.color + '40' : 'transparent'}`,
                transition: 'all 0.3s ease',
                cursor: 'default',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                {/* number bubble */}
                <motion.div
                  animate={hovered === i ? { scale: 1.12, rotate: [0, -8, 8, 0] } : { scale: 1 }}
                  transition={{ duration: 0.4 }}
                  style={{
                    minWidth: isMobile ? 44 : 52,
                    height: isMobile ? 44 : 52,
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${step.color}, ${step.color}cc)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'white', fontWeight: '800',
                    fontSize: isMobile ? '0.85rem' : '0.95rem',
                    boxShadow: `0 4px 12px ${step.color}44`,
                    flexShrink: 0,
                  }}
                >
                  {step.number}
                </motion.div>

                <div style={{ flex: 1 }}>
                  <h3 style={{
                    fontSize: isMobile ? '0.95rem' : '1.05rem',
                    color: theme.primary,
                    marginBottom: 7,
                    fontWeight: '700',
                    display: 'flex', alignItems: 'center', gap: 7,
                  }}>
                    <span>{step.icon}</span> {step.title}
                  </h3>
                  <p style={{ color: '#64748B', fontSize: isMobile ? '0.82rem' : '0.88rem', lineHeight: 1.65, margin: 0 }}>
                    {step.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75 }}
          style={{ textAlign: 'center' }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            animate={{
              boxShadow: [
                `0 4px 16px ${theme.orange}35`,
                `0 8px 28px ${theme.orange}55`,
                `0 4px 16px ${theme.orange}35`,
              ]
            }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            <Link
              to="/beautiful-mistakes/interactive"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 12,
                background: `linear-gradient(135deg, ${theme.orange}, #c0533c)`,
                color: 'white',
                padding: isMobile ? '14px 28px' : '16px 44px',
                borderRadius: 50,
                fontSize: isMobile ? '0.95rem' : '1.1rem',
                fontWeight: 'bold',
                textDecoration: 'none',
              }}
            >
              🎮 استخدم النموذج مع الطلاب
              <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.2, repeat: Infinity }}>←</motion.span>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      <style>{`* { box-sizing: border-box; } body { overflow-x: hidden; margin: 0; }`}</style>
    </div>
  );
};

export default BeautifulMistakes;
