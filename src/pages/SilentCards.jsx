import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const theme = {
  primary: '#1E3A5F',
  teal: '#2A9D8F',
  yellow: '#E9C46A',
  orange: '#E76F51',
  light: '#F5F7F0',
  white: '#FFFFFF',
};

const cards = [
  {
    icon: '🟢',
    color: '#2A9D8F',
    bg: '#E8F5F3',
    label: 'البطاقة الخضراء',
    title: '"أنا فاهم/ة"',
    desc: 'الطالب يفهم الشرح تماماً ويمكنه المتابعة بكل ثقة.',
  },
  {
    icon: '🟡',
    color: '#D4A017',
    bg: '#FEF9EA',
    label: 'البطاقة الصفراء',
    title: '"محتاج توضيح أكثر"',
    desc: 'الطالب بحاجة إلى شرح إضافي أو توضيح لنقطة معينة.',
  },
  {
    icon: '🔴',
    color: '#E76F51',
    bg: '#FEF0EC',
    label: 'البطاقة الحمراء',
    title: '"توهت / مش فاهم"',
    desc: 'الطالب توقف تماماً ولا يستطيع المتابعة ويحتاج مساعدة فورية.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 85, damping: 14 } },
};

const SilentCards = () => {
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
          padding: isMobile ? '36px 20px 48px' : '56px 32px 68px',
          textAlign: 'center', color: theme.primary,
          position: 'relative', overflow: 'hidden',
          marginBottom: isMobile ? 28 : 48,
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

        <Link to="/home" style={{
          position: 'absolute', top: isMobile ? 14 : 20, right: isMobile ? 14 : 24,
          color: theme.primary, textDecoration: 'none',
          background: 'rgba(255,255,255,0.35)', backdropFilter: 'blur(8px)',
          padding: isMobile ? '7px 14px' : '9px 22px',
          borderRadius: 25, fontSize: isMobile ? '0.78rem' : '0.88rem', fontWeight: 500, zIndex: 10,
        }}>
          ← العودة للرئيسية
        </Link>

        <motion.div
          animate={{ y: [0, -12, 0], rotate: [0, 8, -8, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ fontSize: isMobile ? '3.5rem' : '5rem', marginBottom: 14, display: 'inline-block' }}
        >
          🃏
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{ fontSize: isMobile ? '1.7rem' : '2.6rem', fontWeight: 'bold', marginBottom: 10, color: theme.primary }}
        >
          بطاقات التعبير <motion.span
            style={{ color: '#8B5E00', display: 'inline-block' }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2.2, repeat: Infinity }}
          >الصامت</motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
          style={{ fontSize: isMobile ? '0.88rem' : '1rem', opacity: 0.85, maxWidth: 520, margin: '0 auto', lineHeight: 1.75 }}
        >
          بطاقات ملونة تسمح للطلاب بالتعبير عن فهمهم واحتياجاتهم دون الحاجة إلى الكلام
        </motion.p>
      </motion.div>

      {/* CARDS */}
      <div style={{ maxWidth: 860, margin: '0 auto', padding: isMobile ? '0 14px 48px' : '0 28px 72px' }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: isMobile ? 16 : 22,
            marginBottom: isMobile ? 32 : 48,
          }}
        >
          {cards.map((card, i) => (
            <motion.div
              key={card.label}
              variants={itemVariants}
              whileHover={{ y: -6, boxShadow: `0 12px 32px ${card.color}30` }}
              onHoverStart={() => setHovered(i)}
              onHoverEnd={() => setHovered(null)}
              style={{
                background: hovered === i ? card.bg : 'white',
                borderRadius: isMobile ? 18 : 22,
                padding: isMobile ? '20px 16px' : '28px 22px',
                textAlign: 'center',
                boxShadow: '0 3px 14px rgba(0,0,0,0.07)',
                border: `2px solid ${hovered === i ? card.color + '50' : 'transparent'}`,
                transition: 'all 0.3s ease',
                cursor: 'default',
              }}
            >
              <motion.div
                animate={hovered === i
                  ? { scale: [1, 1.25, 1], rotate: [0, -10, 10, 0] }
                  : { scale: 1 }}
                transition={{ duration: 0.5 }}
                style={{ fontSize: isMobile ? '2.8rem' : '3.5rem', marginBottom: 14 }}
              >
                {card.icon}
              </motion.div>

              <span style={{
                fontSize: '0.72rem', fontWeight: '700',
                color: card.color,
                background: card.bg,
                border: `1px solid ${card.color}30`,
                padding: '3px 12px', borderRadius: 20,
                display: 'inline-block', marginBottom: 10,
              }}>
                {card.label}
              </span>

              <h3 style={{
                fontSize: isMobile ? '1rem' : '1.1rem',
                color: theme.primary, fontWeight: '700',
                marginBottom: 10,
              }}>
                {card.title}
              </h3>

              <p style={{
                color: '#64748B', fontSize: isMobile ? '0.82rem' : '0.88rem',
                lineHeight: 1.65, margin: 0,
              }}>
                {card.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          style={{ textAlign: 'center' }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            animate={{
              boxShadow: [
                '0 4px 16px rgba(201,160,0,0.35)',
                '0 8px 28px rgba(201,160,0,0.55)',
                '0 4px 16px rgba(201,160,0,0.35)',
              ]
            }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            <Link
              to="/silent-cards/interactive"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 12,
                background: `linear-gradient(135deg, #C8A600, ${theme.yellow})`,
                color: theme.primary,
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

export default SilentCards;
