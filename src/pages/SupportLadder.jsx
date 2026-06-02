import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

const SupportLadder = () => {
  const [hoveredStep, setHoveredStep] = useState(null);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [activeStep, setActiveStep] = useState(null);
  const containerRef = useRef(null);
  
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

  // Updated color scheme to match the home card theme
  const theme = {
    primary: '#1E3A5F',      // Dark blue (main background)
    secondary: '#2A9D8F',    // Teal (accents)
    accent: '#F4A261',       // Orange (highlights)
    light: '#F8F9FA',        // Light gray
    white: '#FFFFFF',
    gradient: 'linear-gradient(135deg, #1E3A5F 0%, #2A5F8F 100%)'
  };

  const steps = [
    {
      number: "01",
      icon: "💪",
      title: "جرب بنفسك",
      description: "حاول حل التمرين بمفردك لمدة دقيقتين. فكر، جرب، اكتب أي فكرة تخطر ببالك.",
      color: theme.secondary,
      lightColor: `${theme.secondary}15`,
      gradient: `linear-gradient(135deg, ${theme.secondary} 0%, #21867a 100%)`,
      tip: "التركيز على المحاولة وليس النتيجة",
      time: "⏱️ 2 دقيقة",
      longDescription: "ابدأ بمحاولة حل التمرين بنفسك دون أي مساعدة. هذه الخطوة تبني ثقتك بنفسك وتطور مهارات التفكير النقدي لديك."
    },
    {
      number: "02",
      icon: "📚",
      title: "ارجع للكتاب أو المذكرة",
      description: "ابحث في الكتاب المدرسي أو المذكرة عن شرح أو مثال مشابه.",
      color: "#E9C46A",
      lightColor: "#E9C46A15",
      gradient: "linear-gradient(135deg, #E9C46A 0%, #d4a832 100%)",
      tip: "تعلم كيف تبحث عن المعلومات بنفسك",
      time: "⏱️ 3 دقائق",
      longDescription: "استخدم المصادر المتاحة لديك. ابحث في الكتاب المدرسي أو المذكرات عن أمثلة مشابهة أو قواعد تساعدك في الحل."
    },
    {
      number: "03",
      icon: "👥",
      title: "اسأل زميلك الذي بجانبك",
      description: "ناقش الحل مع زميلك. اسأله: 'إيه رأيك في كده؟' أو 'إنت فهمت الجزء ده ازاي؟'",
      color: theme.accent,
      lightColor: `${theme.accent}15`,
      gradient: `linear-gradient(135deg, ${theme.accent} 0%, #E76F51 100%)`,
      tip: "التعلم التعاوني يبني الثقة",
      time: "⏱️ 3 دقائق",
      longDescription: "التعاون مع زملائك يساعدك على رؤية وجهات نظر مختلفة وفهم أعمق للمادة. شارك أفكارك واستمع لآرائهم."
    },
    {
      number: "04",
      icon: "🔍",
      title: "ابحث في المصادر المتاحة",
      description: "استخدم QR Code على المكتب، أو الفيديوهات القصيرة، أو الملصقات التعليمية في الفصل.",
      color: "#E76F51",
      lightColor: "#E76F5115",
      gradient: "linear-gradient(135deg, #E76F51 0%, #d45a3a 100%)",
      tip: "تكنولوجيا التعليم في متناول يدك",
      time: "⏱️ 5 دقائق",
      longDescription: "استفد من التكنولوجيا المتاحة. شاهد الفيديوهات التعليمية، استخدم تطبيقات الهاتف، أو امسح أكواد QR للمصادر الإضافية."
    },
    {
      number: "05",
      icon: "👩‍🏫",
      title: "ارفع يدك للمعلمة",
      description: "بعد أن استنفدت جميع الخطوات السابقة، يمكنك الآن طلب مساعدة المعلمة.",
      color: theme.primary,
      lightColor: `${theme.primary}15`,
      gradient: theme.gradient,
      tip: "لا تتردد في السؤال بعد المحاولة",
      time: "🎯 الخطوة الأخيرة",
      longDescription: "بعد أن جربت كل الحلول الممكنة، يمكنك الآن طلب المساعدة من المعلمة بثقة، لأنك أثبت أنك بذلت جهدك أولاً."
    }
  ];

  const stepVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: (i) => ({ 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        delay: i * 0.15,
        duration: 0.5,
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    })
  };

  return (
    <div style={{ 
      overflowX: 'hidden', 
      minHeight: '100vh', 
      background: theme.light,
      position: 'relative'
    }} ref={containerRef}>
      
      {/* Hero Section - Using the card's background color */}
      <motion.div style={{
        background: theme.gradient,
        padding: isMobile ? '60px 20px 80px' : '80px 20px 100px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
      animate={{
        backgroundPosition: ['0% 0%', '100% 100%'],
      }}
      transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse' }}
      >
        {/* Animated background pattern */}
        <motion.div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 2%, transparent 2%)',
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
          <Link to="/home" style={{
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
            style={{ fontSize: isMobile ? '4rem' : '5rem', marginBottom: '20px', display: 'inline-block' }}
          >
            🪜
          </motion.div>
          
          <motion.h1 style={{ 
            color: 'white', 
            fontSize: isMobile ? '1.8rem' : (isTablet ? '2.5rem' : '3rem'),
            marginBottom: '16px',
            fontWeight: 'bold'
          }}>
            سلم <motion.span 
              style={{ color: theme.accent, display: 'inline-block' }}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              الدعم الخمسة
            </motion.span>
            
          </motion.h1>
          
          <motion.p style={{ 
            color: 'rgba(255,255,255,0.95)', 
            fontSize: isMobile ? '0.9rem' : '1.1rem',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            خريطة طريق تساعدك على الاعتماد على نفسك قبل طلب المساعدة
            وهو عبارة عن سلم مدروس من خمس خطوات يمنع الاعتماد الفوري على المعلم ويدفع الطالب لاستنفاد الموارد المتاحة قبل طلب المساعدة
          </motion.p>
          
        </motion.div>
      </motion.div>

      {/* Main Section */}
      <div style={{
        maxWidth: '1200px',
        margin: '-30px auto 0',
        padding: isMobile ? '20px 16px 60px' : '40px 32px 80px',
        position: 'relative',
        zIndex: 2
      }}>
        
        {/* Cards Grid */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: isMobile ? '30px' : '35px',
          position: 'relative'
        }}>
          
          {/* Vertical connecting line for desktop */}
          {!isMobile && (
            <div style={{
              position: 'absolute',
              right: '50%',
              top: '40px',
              bottom: '40px',
              width: '3px',
              transform: 'translateX(50%)',
              zIndex: 0,
              background: 'linear-gradient(180deg, #2A9D8F, #E9C46A, #F4A261, #E76F51, #1E3A5F)',
              borderRadius: '2px'
            }}>
              <motion.div
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                style={{
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(180deg, #2A9D8F, #E9C46A, #F4A261, #E76F51, #1E3A5F)',
                  transformOrigin: 'top'
                }}
              />
            </div>
          )}
          
          {steps.map((step, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={stepVariants}
              style={{
                position: 'relative',
                zIndex: 2
              }}
            >
              {/* Mobile connector line */}
              {isMobile && index < steps.length - 1 && (
                <motion.div
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  style={{
                    position: 'absolute',
                    bottom: '-30px',
                    right: '50%',
                    width: '3px',
                    height: '30px',
                    background: `linear-gradient(180deg, ${step.color}, ${steps[index + 1].color})`,
                    transform: 'translateX(50%)',
                    zIndex: 0
                  }}
                />
              )}
              
              {/* Main Card */}
              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.3 }}
                style={{
                  background: theme.white,
                  borderRadius: '24px',
                  padding: isMobile ? '20px' : '28px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                  border: `1px solid rgba(0,0,0,0.05)`,
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'pointer'
                }}
                onMouseEnter={() => setHoveredStep(index)}
                onMouseLeave={() => setHoveredStep(null)}
                onClick={() => setActiveStep(activeStep === index ? null : index)}
              >
                {/* Colored side bar */}
                <div style={{
                  position: 'absolute',
                  right: 0,
                  top: 0,
                  bottom: 0,
                  width: '6px',
                  background: step.gradient,
                  borderTopRightRadius: '24px',
                  borderBottomRightRadius: '24px'
                }} />
                
                {/* Animated background blob */}
                <motion.div
                  style={{
                    position: 'absolute',
                    top: -50,
                    right: -50,
                    width: '150px',
                    height: '150px',
                    background: `radial-gradient(circle, ${step.color}10, transparent)`,
                    borderRadius: '50%'
                  }}
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
                
                {/* Card Content */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: isMobile ? '16px' : '20px',
                  marginBottom: '16px',
                  flexWrap: isMobile ? 'wrap' : 'nowrap'
                }}>
                  {/* Center Circle */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      width: isMobile ? '70px' : '85px',
                      height: isMobile ? '70px' : '85px',
                      background: step.gradient,
                      borderRadius: '50%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      boxShadow: `0 5px 15px ${step.color}60`,
                      flexShrink: 0
                    }}
                  >
                    <span style={{ fontSize: isMobile ? '1.8rem' : '2rem' }}>{step.icon}</span>
                    <span style={{ fontSize: isMobile ? '0.7rem' : '0.8rem', fontWeight: 'bold', marginTop: '4px' }}>
                      {step.number}
                    </span>
                  </motion.div>
                  
                  <div style={{ flex: 1 }}>
                    <h3 style={{ 
                      color: step.color, 
                      margin: 0, 
                      fontSize: isMobile ? '1.2rem' : '1.4rem',
                      fontWeight: 'bold',
                      marginBottom: '8px'
                    }}>
                      {step.title}
                    </h3>
                    
                    <p style={{ 
                      color: '#495057', 
                      lineHeight: '1.6', 
                      margin: 0,
                      fontSize: isMobile ? '0.85rem' : '0.95rem'
                    }}>
                      {step.description}
                    </p>
                  </div>
                </div>
                
                {/* Time and Tips */}
                <div style={{
                  display: 'flex',
                  gap: '12px',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  marginTop: '12px',
                  paddingTop: '12px',
                  borderTop: `1px solid ${step.lightColor}`
                }}>
                  <span style={{ 
                    fontSize: isMobile ? '0.75rem' : '0.85rem', 
                    color: step.color, 
                    background: step.lightColor, 
                    padding: '6px 14px', 
                    borderRadius: '25px', 
                    fontWeight: 'bold',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    {step.time}
                  </span>
                  
                  <AnimatePresence>
                    {hoveredStep === index && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        style={{ 
                          fontSize: isMobile ? '0.75rem' : '0.85rem', 
                          color: step.color, 
                          background: step.lightColor, 
                          padding: '6px 14px', 
                          borderRadius: '25px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        💡 {step.tip}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
                
                {/* Expandable Details */}
                <AnimatePresence>
                  {activeStep === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{
                        marginTop: '16px',
                        paddingTop: '16px',
                        borderTop: `1px dashed ${step.color}`,
                        color: '#6c757d',
                        fontSize: isMobile ? '0.8rem' : '0.9rem',
                        lineHeight: '1.6',
                        overflow: 'hidden'
                      }}
                    >
                      {step.longDescription}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Interactive Button with theme accent */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginTop: isMobile ? '50px' : '70px' }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            animate={{ 
              boxShadow: [
                `0 4px 15px ${theme.secondary}30`, 
                `0 8px 25px ${theme.secondary}50`, 
                `0 4px 15px ${theme.secondary}30`
              ] 
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Link to="/support-ladder/interactive" style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              background: `linear-gradient(135deg, ${theme.secondary} 0%, #21867a 100%)`,
              color: 'white',
              padding: isMobile ? '14px 28px' : '16px 40px',
              borderRadius: '50px',
              fontSize: isMobile ? '0.9rem' : '1.1rem',
              fontWeight: 'bold',
              textDecoration: 'none',
              width: isMobile ? '100%' : 'auto',
              transition: 'all 0.3s ease'
            }}>
              🎮 استخدم النموذج مع الطلاب
              <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1, repeat: Infinity }}>
                →
              </motion.span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Implementation Tips */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          viewport={{ once: true }}
          style={{
            background: theme.white,
            borderRadius: isMobile ? '20px' : '28px',
            padding: isMobile ? '24px 20px' : '32px',
            marginTop: isMobile ? '40px' : '60px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
            border: '1px solid rgba(0,0,0,0.05)'
          }}
        >
          <h3 style={{ 
            fontSize: isMobile ? '1.2rem' : '1.5rem', 
            color: theme.primary, 
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            justifyContent: 'center'
          }}>
            📋 <span>نصائح للتنفيذ في الفصل</span>
          </h3>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : (isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)'),
            gap: '16px'
          }}>
            {[
              { icon: "🖨️", text: "اطبع بطاقات السلم وضعها على كل مكتب", color: theme.secondary },
              { icon: "🗣️", text: "اشرح الفكرة للطلاب قبل بدء التطبيق", color: "#E9C46A" },
              { icon: "❓", text: "عند رفع اليد، اسأل: 'أي درجة وصلت؟'", color: theme.accent },
              { icon: "🎯", text: "كافئ الطلاب على استخدام السلم بشكل صحيح", color: "#E76F51" },
              { icon: "📊", text: "تتبع تقدم الطلاب واحتفل بنجاحاتهم", color: theme.secondary },
              { icon: "🏆", text: "اجعل السلم مرئياً في مكان بارز", color: theme.primary }
            ].map((tip, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 + 0.5, duration: 0.4 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, y: -2 }}
                style={{
                  background: `linear-gradient(135deg, ${tip.color}10 0%, white 100%)`,
                  padding: '14px',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  border: `1px solid ${tip.color}20`,
                  transition: 'all 0.3s ease'
                }}
              >
                <span style={{ fontSize: '1.5rem' }}>{tip.icon}</span>
                <span style={{ color: '#495057', fontSize: isMobile ? '0.8rem' : '0.9rem', flex: 1 }}>
                  {tip.text}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>



      <style>{`
        * {
          -webkit-tap-highlight-color: transparent;
          box-sizing: border-box;
        }
        
        body {
          overflow-x: hidden;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @media print {
          .btn-back, .motion-div, button, footer {
            display: none;
          }
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

export default SupportLadder;