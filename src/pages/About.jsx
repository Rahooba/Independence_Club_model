import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

const About = () => {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [hoveredCard, setHoveredCard] = useState(null);
  const containerRef = React.useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;

  const theme = {
    primary: '#1e5f49',
    secondary: '#2A9D8F',
    accent: '#F4A261',
    danger: '#E76F51',
    light: '#F0F4F8',
    white: '#FFFFFF',
    dark: '#1E3A5F',
  };

  const steps = [
    {
      icon: "🎯",
      title: "الرؤية",
      description: "تحويل الطلاب من متلقين سلبيين إلى متعلمين مستقلين وواثقين، قادرين على مواجهة التحديات وحل المشكلات بأنفسهم.",
      color: theme.secondary
    },
    {
      icon: "📋",
      title: "المشكلة المستهدفة",
      description: "وجود مؤشرات على انخفاض مستوى تفاعل الطلاب داخل الحصص واعتمادهم المباشر على التوجيه من المعلم مع ضعف القدرة على تنفيذ المهام بشكل فردي.",
      color: theme.accent
    },
    {
      icon: "💡",
      title: "الحل - نادي الاستقلالية",
      description: "نموذج متكامل يجمع بين الأنشطة المتدرجة (10-10-10)، وسلم الدعم الخمسة، ونظام الأختام والتكريم، ومنصة رقمية بسيطة.",
      color: "#E9C46A"
    },
    {
      icon: "📊",
      title: "النتائج المستهدفة",
      description: "تحسن الاعتماد على الذات، انخفاض طلب المساعدة المباشرة، ظهور تفاعل الطلاب الهادئين، ومشاركة الأخطاء الجميلة أسبوعياً.",
      color: theme.dark,
      list: [
        "تحسن الاعتماد على الذات بنسبة 70%",
        "انخفاض طلب المساعدة المباشرة من 15-20 إلى 5-8 مرات لكل حصة",
        "ظهور تفاعل الطلاب الهادئين عبر بطاقات التعبير الصامت",
        "مشاركة 10-15 خطأً جميلاً أسبوعياً على لوحة الأخطاء"
      ]
    }
  ];

  const teamMembers = [
    { name: "رحاب أشرف", icon: "👩‍🏫", color: theme.secondary },
    { name: "سارة عمر",  icon: "👩‍🏫", color: theme.accent },
    { name: "عصمت حمدي",  icon: "👨‍🏫", color: "#E9C46A" },
    { name: "مصطفى جويد", icon: "👨‍🏫", color: theme.secondary },
    { name: "زينب حمادة",  icon: "👩‍🏫", color: theme.accent },
    { name: "منى مصطفى",  icon: "👩‍🏫", color: "#E9C46A" },
    { name: "شيماء علي",  icon: "👩‍🏫", color: theme.dark }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 12 }
    }
  };

  const cardVariants = {
    hover: {
      scale: 1.03,
      y: -5,
      transition: { type: "spring", stiffness: 300, damping: 20 }
    },
    tap: { scale: 0.98 }
  };

  return (
    <div ref={containerRef} style={{
      minHeight: '100vh',
      background: `linear-gradient(135deg, ${theme.light} 0%, #E9ECEF 100%)`,
      overflowX: 'hidden',
      direction: 'rtl',
      fontFamily: 'system-ui, sans-serif'
    }}>
      
      {/* ===== Hero Section مع بارالاكس ===== */}
      <motion.div
        style={{
          background: `linear-gradient(135deg, ${theme.primary} 0%, #2a7a5f 100%)`,
          padding: isMobile ? '60px 20px 80px' : '80px 20px 120px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* خلفية متحركة */}
        <motion.div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.08) 2%, transparent 2%)',
            backgroundSize: '40px 40px',
          }}
          animate={{
            backgroundPosition: ['0px 0px', '40px 40px'],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />

        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link to="/" style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            color: 'white',
            textDecoration: 'none',
            background: 'rgba(255,255,255,0.2)',
            padding: isMobile ? '8px 16px' : '10px 24px',
            borderRadius: '25px',
            fontSize: isMobile ? '0.8rem' : '0.9rem',
            backdropFilter: 'blur(10px)',
            transition: 'all 0.3s ease',
            zIndex: 10,
            fontWeight: '500'
          }}
          onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.3)'}
          onMouseLeave={(e) => e.target.style.background = 'rgba(255,255,255,0.2)'}
          >
            ← العودة للرئيسية
          </Link>

          <motion.div
            animate={{ 
              y: [0, -15, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            style={{ fontSize: isMobile ? '3.5rem' : '5rem', marginBottom: '20px', display: 'inline-block' }}
          >
            🏆
          </motion.div>

          <motion.h1 style={{ 
            color: 'white', 
            fontSize: isMobile ? '1.8rem' : (isTablet ? '2.5rem' : '3rem'),
            marginBottom: '16px',
            fontWeight: 'bold'
          }}>
            عن <motion.span 
              style={{ color: theme.accent, display: 'inline-block' }}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              نادي الاستقلالية
            </motion.span>
          </motion.h1>

          <motion.p style={{ 
            color: 'rgba(255,255,255,0.95)', 
            fontSize: isMobile ? '0.9rem' : '1.1rem',
            maxWidth: '700px',
            margin: '0 auto',
            lineHeight: '1.8'
          }}>
            Independence Club - نموذج متكامل لتحويل الطلاب من الاعتماد على المعلم إلى الاعتماد على الذات
          </motion.p>
        </motion.div>
      </motion.div>

      {/* ===== المحتوى الرئيسي ===== */}
      <div style={{
        maxWidth: '1200px',
        margin: '-40px auto 0',
        padding: isMobile ? '20px 16px 60px' : '40px 32px 80px',
        position: 'relative',
        zIndex: 2
      }}>

        {/* بطاقات الرؤية والمشكلة والحل */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : (isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)'),
            gap: isMobile ? '20px' : '28px',
            marginBottom: isMobile ? '40px' : '60px'
          }}
        >
          {steps.slice(0, 3).map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover="hover"
              whileTap="tap"
              custom={cardVariants}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                background: theme.white,
                borderRadius: '24px',
                padding: isMobile ? '24px 20px' : '32px 28px',
                boxShadow: hoveredCard === index 
                  ? `0 20px 40px ${step.color}30` 
                  : '0 10px 30px rgba(0,0,0,0.08)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                border: `1px solid ${step.color}20`
              }}
            >
              <motion.div
                style={{
                  position: 'absolute',
                  top: -50,
                  right: -50,
                  width: '120px',
                  height: '120px',
                  background: `radial-gradient(circle, ${step.color}15, transparent)`,
                  borderRadius: '50%'
                }}
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.2, 0.5] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              
              <motion.div
                animate={{ 
                  scale: hoveredCard === index ? [1, 1.1, 1] : 1,
                  rotate: hoveredCard === index ? [0, 10, -10, 0] : 0
                }}
                transition={{ duration: 0.5 }}
                style={{
                  fontSize: isMobile ? '2.5rem' : '3rem',
                  marginBottom: '16px',
                  display: 'inline-block'
                }}
              >
                {step.icon}
              </motion.div>
              
              <h3 style={{ 
                color: step.color, 
                fontSize: isMobile ? '1.2rem' : '1.3rem',
                marginBottom: '12px',
                fontWeight: 'bold'
              }}>
                {step.title}
              </h3>
              
              <p style={{ 
                color: '#495057', 
                lineHeight: '1.7', 
                fontSize: isMobile ? '0.85rem' : '0.95rem',
                margin: 0
              }}>
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* النتائج المستهدفة - بطاقة مميزة */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
          style={{
            background: `linear-gradient(135deg, ${theme.dark} 0%, #2A5F8F 100%)`,
            borderRadius: '28px',
            padding: isMobile ? '28px 20px' : '40px 36px',
            marginBottom: isMobile ? '40px' : '60px',
            color: 'white',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <motion.div
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              background: 'radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)',
            }}
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          
          <div style={{ position: 'relative', zIndex: 2 }}>
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ fontSize: '3rem', marginBottom: '16px' }}
            >
              📊
            </motion.div>
            
            <h3 style={{ 
              fontSize: isMobile ? '1.3rem' : '1.6rem', 
              marginBottom: '20px',
              fontWeight: 'bold'
            }}>
              النتائج المستهدفة
            </h3>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
              gap: '16px'
            }}>
              {steps[3].list.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 + 0.6 }}
                  viewport={{ once: true }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    background: 'rgba(255,255,255,0.1)',
                    padding: '12px 16px',
                    borderRadius: '16px',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  <span style={{ fontSize: '1.2rem' }}>✓</span>
                  <span style={{ fontSize: isMobile ? '0.85rem' : '0.9rem' }}>{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* العينة التجريبية */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          viewport={{ once: true }}
          style={{
            background: theme.white,
            borderRadius: '24px',
            padding: isMobile ? '24px 20px' : '32px 36px',
            marginBottom: isMobile ? '40px' : '60px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
            border: '1px solid rgba(0,0,0,0.05)'
          }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '24px',
            flexWrap: 'wrap'
          }}>
            <span style={{ fontSize: '2.5rem' }}>🏫</span>
            <h3 style={{ color: theme.primary, fontSize: isMobile ? '1.2rem' : '1.4rem', margin: 0 }}>
              العينة التجريبية
            </h3>
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
            gap: '16px'
          }}>
            <motion.div 
              whileHover={{ scale: 1.02, x: -5 }}
              style={{
                background: `${theme.secondary}10`,
                padding: '16px',
                borderRadius: '16px',
                borderRight: `3px solid ${theme.secondary}`
              }}
            >
              <strong style={{ color: theme.secondary }}>المدرسة:</strong>
              <p style={{ margin: '8px 0 0', color: '#495057' }}>مدرسة وي الوادي الجديد</p>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.02, x: -5 }}
              style={{
                background: `${theme.accent}10`,
                padding: '16px',
                borderRadius: '16px',
                borderRight: `3px solid ${theme.accent}`
              }}
            >
              <strong style={{ color: theme.accent }}>الطلاب:</strong>
              <p style={{ margin: '8px 0 0', color: '#495057' }}>30 طالباً من الصف الأول والثاني الثانوي (مستويات متنوعة)</p>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.02, x: -5 }}
              style={{
                background: '#E9C46A10',
                padding: '16px',
                borderRadius: '16px',
                borderRight: '3px solid #E9C46A'
              }}
            >
              <strong style={{ color: '#d4a832' }}>المواد:</strong>
              <p style={{ margin: '8px 0 0', color: '#495057' }}>شبكات، برمجة، فيزياء، لغة إنجليزية، رياضيات</p>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.02, x: -5 }}
              style={{
                background: `${theme.primary}10`,
                padding: '16px',
                borderRadius: '16px',
                borderRight: `3px solid ${theme.primary}`
              }}
            >
              <strong style={{ color: theme.primary }}>المدة:</strong>
              <p style={{ margin: '8px 0 0', color: '#495057' }}>5 أسابيع (تصميم: أسبوعان، تنفيذ: 3 أسابيع)</p>
            </motion.div>
          </div>
        </motion.div>

        {/* فريق العمل */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          viewport={{ once: true }}
          style={{
            background: `linear-gradient(135deg, ${theme.light} 0%, white 100%)`,
            borderRadius: '24px',
            padding: isMobile ? '28px 20px' : '40px 36px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
            textAlign: 'center'
          }}
        >
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ fontSize: '2.5rem', marginBottom: '12px' }}
          >
            👥
          </motion.div>
          
          <h3 style={{ 
            color: theme.primary, 
            fontSize: isMobile ? '1.3rem' : '1.6rem',
            marginBottom: '24px',
            fontWeight: 'bold'
          }}>
            فريق العمل
          </h3>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : (isTablet ? 'repeat(3, 1fr)' : 'repeat(4, 1fr)'),
            gap: '16px',
            marginBottom: '24px'
          }}>
            {teamMembers.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
                style={{
                  background: theme.white,
                  padding: '16px',
                  borderRadius: '16px',
                  border: `1px solid ${member.color}30`,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                <div style={{ fontSize: '2rem', marginBottom: '8px' }}>{member.icon}</div>
                <div style={{ fontWeight: 'bold', color: member.color, fontSize: '0.95rem' }}>{member.name}</div>
              
              </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            style={{
              marginTop: '20px',
              paddingTop: '20px',
              borderTop: '1px solid rgba(0,0,0,0.08)'
            }}
          >
            <p style={{ 
              color: theme.primary, 
              fontSize: isMobile ? '0.85rem' : '0.95rem',
              fontWeight: '500'
            }}>
              برنامج HP IDEA لتحسين التعليم التكنولوجي في مصر
            </p>
          </motion.div>
        </motion.div>
      </div>

    

      <style>{`
        * {
          box-sizing: border-box;
          -webkit-tap-highlight-color: transparent;
        }
        
        body {
          overflow-x: hidden;
          margin: 0;
        }
        
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: ${theme.light};
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, ${theme.secondary}, ${theme.primary});
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, #21867a, ${theme.primary});
        }
      `}</style>
    </div>
  );
};

export default About;
