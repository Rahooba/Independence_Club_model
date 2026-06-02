import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const HomePage = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;

  // البيانات المحدثة للكاردات مع المعلومات الجديدة
  const tools = [
    {
      icon: "⏱️",
      title: "نموذج 10-10-10",
      subtitle: "التفاعل المتوازن",
      description: "تقسيم الحصة إلى ثلاث فترات زمنية متساوية لبناء الاستقلالية التدريجية – الطالب يتحمل مسؤولية تعلمه أولاً قبل طلب أي مساعدة",
      tags: ["فردي", "ثنائي", "جماعي"],
      color: "linear-gradient(135deg, #1E3A5F 0%, #2A5F8F 100%)",
      link: "/model-10-10-10",
      delay: 0.1,
      targetAudience: "👥 جميع الطلاب",
      duration: "⏰ 30 دقيقة من كل حصة",
      audienceIcon: "👥",
      durationIcon: "⏰"
    },
    {
      icon: "🪜",
      title: "سلم الدعم الخمسة",
      subtitle: "بطاقة على كل مكتب",
      description: "سلم مدروس من خمس خطوات يمنع الاعتماد الفوري على المعلم ويدفع الطالب لاستنفاد الموارد المتاحة قبل طلب المساعدة",
      tags: ["استقلالية", "تدرج", "توجيه"],
      color: "linear-gradient(135deg, #2A9D8F 0%, #21867a 100%)",
      link: "/support-ladder",
      delay: 0.2,
      targetAudience: "🎯 للطلاب ذوي الاعتمادية العالية",
      duration: "⏱️ دقيقة واحدة للتذكير قبل كل مهمة",
      audienceIcon: "🎯",
      durationIcon: "⏱️"
    },
    {
      icon: "🃏",
      title: "بطاقات التعبير الصامت",
      subtitle: "أخضر - أصفر - أحمر",
      description: "ثلاث بطاقات ملونة تتيح للطالب الهادئين التعبير عن مستوى فهمهم دون إجبار على الكلام أمام الجميع",
      tags: ["تعبير", "فهم", "حضور"],
      color: "linear-gradient(135deg, #E9C46A 0%, #d4a832 100%)",
      link: "/silent-cards",
      delay: 0.3,
      targetAudience: "🤫 للطلاب الهادئون والخجولون",
      duration: "⚡ فوري أثناء الشرح - لا يستغرق وقتاً إضافياً",
      audienceIcon: "🤫",
      durationIcon: "⚡"
    },
    {
      icon: "✨",
      title: "لوحة الأخطاء الجميلة",
      subtitle: "تحويل الخوف إلى فرصة",
      description: "لوحة مثبتة في الفصل تحول ثقافة الخوف من الخطأ إلى ثقافة الاحتفاء بالتعلم – الخطأ ليس عيباً، بل فرصة يحتفل بها الجميع",
      tags: ["خطأ", "تعلم", "احتفاء"],
      color: "linear-gradient(135deg, #E76F51 0%, #d45a3a 100%)",
      link: "/beautiful-mistakes",
      delay: 0.4,
      targetAudience: "📝 لجميع الطلاب خاصة الخائفون من الخطأ",
      duration: "📅 5 دقائق نهاية كل حصة + 10 دقائق نهاية الأسبوع",
      audienceIcon: "📝",
      durationIcon: "📅"
    }
  ];

  // الأرقام ثابتة كما هي في الصورة
  const stats = [
    { 
      label: "من الطلاب يبدأون المهام فوراً", 
      value: "70%", 
      target: "30% حالياً", 
      change: "+40%",
      color: "#2A9D8F",
      icon: "🚀",
      bigNumber: "70%"
    },
    { 
      label: "مرات رفع اليد لكل حصة", 
      value: "5-8", 
      target: "15-20 مرة", 
      change: "-60%",
      color: "#E76F51",
      icon: "✋",
      bigNumber: "5-8"
    },
    { 
      label: "من الطلاب الهادئين يتفاعلون", 
      value: "50%", 
      target: "غير مرتين", 
      change: "مستهدف",
      color: "#E9C46A",
      icon: "🤫",
      bigNumber: "50%"
    },
    { 
      label: "أخطاء جميلة أسبوعياً", 
      value: "+10", 
      target: "صفر حالياً", 
      change: "مستهدف",
      color: "#F4A261",
      icon: "✨",
      bigNumber: "+10"
    }
  ];

  return (
    <div style={{ overflowX: 'hidden' }}>
      {/* Animated Background */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at 50% 50%, rgba(30,58,95,0.03) 0%, rgba(42,95,143,0.02) 100%)',
        pointerEvents: 'none',
        zIndex: -1
      }} />
      
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        style={{
          background: 'linear-gradient(135deg, #1E3A5F 0%, #2A5F8F 100%)',
          color: 'white',
          padding: isMobile ? '40px 0' : (isTablet ? '60px 0' : '80px 0'),
          marginBottom: '32px',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Animated floating shapes - fewer on mobile */}
        {[...Array(isMobile ? 8 : 20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 0.1, 0],
              scale: [0, 1, 2],
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * 400
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
            style={{
              position: 'absolute',
              width: isMobile ? '50px' : '100px',
              height: isMobile ? '50px' : '100px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.05)',
              pointerEvents: 'none'
            }}
          />
        ))}
        
        <div className="container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 16px', position: 'relative', zIndex: 2 }}>
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, type: 'spring' }}
            style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}
          >
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{
                display: 'inline-block',
                background: 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(10px)',
                padding: isMobile ? '4px 12px' : '8px 20px',
                borderRadius: '50px',
                fontSize: isMobile ? '0.7rem' : '0.85rem',
                fontWeight: '500',
                marginBottom: '16px'
              }}
            >
              🚀 HP IDEA | وي الوادي الجديد
            </motion.div>
            
            <motion.h1
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, type: 'spring' }}
              style={{ 
                fontSize: isMobile ? '2rem' : (isTablet ? '3rem' : '4rem'), 
                marginBottom: '8px', 
                fontWeight: '800' 
              }}
            >
              🏆 <span style={{ color: '#F4A261' }}>نادي الاستقلالية</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              style={{ 
                fontSize: isMobile ? '0.8rem' : '1.1rem', 
                marginBottom: '16px', 
                opacity: 0.95, 
                letterSpacing: '1px' 
              }}
            >
              INDEPENDENCE CLUB
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              style={{ 
                fontSize: isMobile ? '1rem' : (isTablet ? '1.2rem' : '1.4rem'), 
                fontWeight: '500', 
                marginBottom: '24px', 
                lineHeight: '1.4' 
              }}
            >
              تحويل الطالب من معتمد على المعلم<br />إلى متعلم مستقل وواثق بنفسه
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: isMobile ? '16px' : '40px',
                flexWrap: 'wrap'
              }}
            >
              {['MVP Model', '5 أسابيع', '30 طالباً'].map((text, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.1, y: -5 }}
                  style={{ textAlign: 'center', cursor: 'pointer' }}
                >
                  <div style={{ 
                    fontSize: isMobile ? '1.2rem' : '2rem', 
                    fontWeight: 'bold', 
                    color: '#F4A261' 
                  }}>{text.split(' ')[0]}</div>
                  <div style={{ 
                    fontSize: isMobile ? '0.7rem' : '0.85rem', 
                    opacity: 0.9 
                  }}>{text.split(' ').slice(1).join(' ') || text}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
        
        <div style={{
          position: 'absolute',
          bottom: -2,
          left: 0,
          right: 0,
          height: '30px',
          background: 'white',
          clipPath: 'polygon(0% 100%, 100% 0%, 100% 100%, 0% 100%)'
        }} />
      </motion.section>

      {/* Challenge Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="container"
        style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 16px', marginBottom: '32px' }}
      >
        <motion.div
          whileHover={{ scale: 1.02 }}
          style={{
            background: 'linear-gradient(135deg, #FFF3E0 0%, #FFE8CC 100%)',
            borderRadius: '20px',
            padding: isMobile ? '24px 16px' : '40px',
            textAlign: 'center',
            border: '2px solid #F4A261',
            position: 'relative',
            overflow: 'hidden',
            cursor: 'pointer'
          }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            style={{
              position: 'absolute',
              top: -50,
              right: -50,
              width: isMobile ? '100px' : '150px',
              height: isMobile ? '100px' : '150px',
              background: 'radial-gradient(circle, rgba(244,162,97,0.1) 0%, transparent 70%)',
              borderRadius: '50%'
            }}
          />
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ fontSize: isMobile ? '2rem' : '3rem', marginBottom: '12px' }}
          >
            🎯
          </motion.div>
          <h2 style={{ 
            color: '#1E3A5F', 
            marginBottom: '12px', 
            fontSize: isMobile ? '1.3rem' : (isTablet ? '1.6rem' : '1.8rem') 
          }}>التحدي الذي نحله</h2>
          <p style={{ 
            fontSize: isMobile ? '0.9rem' : '1.1rem', 
            color: '#495057', 
            maxWidth: '700px', 
            margin: '0 auto', 
            lineHeight: '1.6' 
          }}>
            الطلاب يرفعون أيديهم فور مواجهة أي صعوبة دون محاولة التفكير بأنفسهم — 
            نريد تحويل هذا السلوك من الجذر من خلال <strong style={{ color: '#E76F51' }}>4 أدوات تربوية متكاملة</strong>.
          </p>
        </motion.div>
      </motion.div>

      {/* Stats Section - Responsive Grid */}
      <div className="container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 16px', marginBottom: '32px' }}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : (isTablet ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)'),
            gap: isMobile ? '12px' : '24px'
          }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5, type: 'spring' }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -5 }}
              style={{
                background: 'white',
                borderRadius: '16px',
                padding: isMobile ? '16px 12px' : '28px',
                textAlign: 'center',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                borderBottom: `4px solid ${stat.color}`,
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer'
              }}
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 1, delay: index * 0.2 }}
                style={{ fontSize: isMobile ? '1.5rem' : '2.5rem', marginBottom: '4px' }}
              >
                {stat.icon}
              </motion.div>
              
              <div style={{ 
                fontSize: isMobile ? '1.5rem' : '2.5rem', 
                fontWeight: 'bold', 
                color: stat.color 
              }}>
                {stat.bigNumber}
              </div>
              
              <div style={{ 
                fontSize: isMobile ? '0.7rem' : '0.85rem', 
                color: '#6C757D', 
                marginBottom: '6px', 
                fontWeight: '500' 
              }}>
                {stat.label}
              </div>
              
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{
                  fontSize: isMobile ? '0.6rem' : '0.7rem',
                  color: stat.change === '+40%' ? '#2A9D8F' : '#E76F51',
                  fontWeight: 'bold',
                  background: '#F8F9FA',
                  display: 'inline-block',
                  padding: '2px 8px',
                  borderRadius: '20px'
                }}
              >
                {stat.target && `من ${stat.target}`}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Tools Section - Responsive Cards */}
      <div className="container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 16px', marginBottom: '48px' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '40px' }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            style={{ display: 'inline-block', fontSize: '1.5rem', marginBottom: '12px' }}
          >
            🎨
          </motion.div>
          <h2 style={{ 
            fontSize: isMobile ? '1.5rem' : (isTablet ? '2rem' : '2.5rem'), 
            color: '#1E3A5F', 
            marginBottom: '8px' 
          }}>المحاور الأربعة للابتكار</h2>
          <p style={{ color: '#6C757D', fontSize: isMobile ? '0.9rem' : '1.1rem' }}>4 أدوات تربوية متكاملة لبناء جيل مستقل وواثق</p>
        </motion.div>
        
        {/* Responsive Cards Grid - 1 column on mobile, 2 on tablet/desktop */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
          gap: isMobile ? '20px' : '32px'
        }}>
          {tools.map((tool, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: tool.delay, duration: 0.5, type: 'spring' }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              style={{ perspective: '1000px', height: '100%' }}
            >
              <Link to={tool.link} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
                <motion.div
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{
                    background: 'white',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    boxShadow: hoveredCard === index 
                      ? `0 20px 40px rgba(0,0,0,0.2)`
                      : '0 4px 20px rgba(0,0,0,0.08)',
                    transition: 'all 0.3s ease',
                    height: '100%',
                    position: 'relative'
                  }}
                >
                  {hoveredCard === index && !isMobile && (
                    <motion.div
                      initial={{ x: '-100%' }}
                      animate={{ x: '100%' }}
                      transition={{ duration: 1, repeat: Infinity }}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '4px',
                        background: 'linear-gradient(90deg, transparent, #F4A261, transparent)'
                      }}
                    />
                  )}
                  
                  <motion.div
                    animate={{ scale: hoveredCard === index && !isMobile ? 1.05 : 1 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      background: tool.color,
                      padding: isMobile ? '24px' : '40px',
                      textAlign: 'center',
                      fontSize: isMobile ? '2.5rem' : '3.5rem'
                    }}
                  >
                    <motion.span
                      animate={{ 
                        rotate: hoveredCard === index && !isMobile ? [0, 10, -10, 0] : 0,
                        scale: hoveredCard === index && !isMobile ? 1.1 : 1
                      }}
                      transition={{ duration: 0.3 }}
                      style={{ display: 'inline-block' }}
                    >
                      {tool.icon}
                    </motion.span>
                  </motion.div>
                  
                  <div style={{ padding: isMobile ? '20px' : '28px' }}>
                    <h3 style={{ 
                      fontSize: isMobile ? '1.2rem' : '1.6rem', 
                      marginBottom: '4px', 
                      color: '#1E3A5F' 
                    }}>{tool.title}</h3>
                    <p style={{ 
                      fontSize: isMobile ? '0.75rem' : '0.9rem', 
                      color: '#F4A261', 
                      fontWeight: '600', 
                      marginBottom: '12px' 
                    }}>{tool.subtitle}</p>
                    <p style={{ 
                      color: '#6C757D', 
                      marginBottom: '16px', 
                      lineHeight: '1.6', 
                      fontSize: isMobile ? '0.85rem' : '0.95rem' 
                    }}>{tool.description}</p>
                    
                    {/* Target Audience */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: '#F8F9FA',
                      padding: '8px 12px',
                      borderRadius: '12px',
                      marginBottom: '10px'
                    }}>
                      <span style={{ fontSize: isMobile ? '0.8rem' : '0.85rem', color: '#495057', fontWeight: '500' }}>{tool.targetAudience}</span>
                    </div>
                    
                    {/* Duration */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: '#F8F9FA',
                      padding: '8px 12px',
                      borderRadius: '12px',
                      marginBottom: '16px'
                    }}>
                      <span style={{ fontSize: isMobile ? '0.8rem' : '0.85rem', color: '#495057', fontWeight: '500' }}>{tool.duration}</span>
                    </div>
                    
                    {/* Tags */}
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
                      {tool.tags.map((tag, i) => (
                        <motion.span
                          key={i}
                          whileHover={{ scale: 1.05 }}
                          style={{
                            background: '#F8F9FA',
                            padding: '4px 12px',
                            borderRadius: '20px',
                            fontSize: isMobile ? '0.65rem' : '0.75rem',
                            color: '#495057',
                            fontWeight: '500'
                          }}
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: (hoveredCard === index && !isMobile) ? 1 : (isMobile ? 1 : 0), 
                                 y: (hoveredCard === index && !isMobile) ? 0 : (isMobile ? 0 : 10) }}
                      transition={{ duration: 0.3 }}
                      style={{
                        paddingTop: '12px',
                        borderTop: '2px solid #F4A261',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <span style={{ color: '#F4A261', fontWeight: 'bold', fontSize: isMobile ? '0.85rem' : '0.95rem' }}>استخدم النموذج →</span>
                      <motion.span
                        animate={{ x: (hoveredCard === index && !isMobile) ? [0, 8, 0] : 0 }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                        style={{ fontSize: '1rem' }}
                      >
                        🎮
                      </motion.span>
                    </motion.div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        style={{
          background: 'linear-gradient(135deg, #1E3A5F 0%, #2A5F8F 100%)',
          margin: isMobile ? '0 12px 32px 12px' : '0 24px 48px 24px',
          borderRadius: '24px',
          padding: isMobile ? '32px 20px' : '60px 40px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 15, repeat: Infinity }}
          style={{
            position: 'absolute',
            top: -100,
            right: -100,
            width: isMobile ? '200px' : '300px',
            height: isMobile ? '200px' : '300px',
            background: 'radial-gradient(circle, rgba(244,162,97,0.1) 0%, transparent 70%)',
            borderRadius: '50%'
          }}
        />
        <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity }} style={{ fontSize: isMobile ? '2.5rem' : '4rem', marginBottom: '16px' }}>🎯</motion.div>
        <h2 style={{ 
          color: 'white', 
          fontSize: isMobile ? '1.3rem' : (isTablet ? '1.8rem' : '2rem'), 
          marginBottom: '12px' 
        }}>جاهز لبدء رحلة الاستقلالية؟</h2>
        <p style={{ 
          color: 'rgba(255,255,255,0.9)', 
          marginBottom: '24px', 
          fontSize: isMobile ? '0.85rem' : '1.1rem' 
        }}>
          اختر إحدى الأدوات الأربعة وابدأ بتطبيقها مع طلابك اليوم
        </p>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} style={{ display: 'inline-block', width: isMobile ? '100%' : 'auto' }}>
          <Link to="/model-10-10-10" style={{
            background: '#F4A261',
            color: '#1E3A5F',
            padding: isMobile ? '12px 32px' : '16px 48px',
            borderRadius: '50px',
            textDecoration: 'none',
            fontWeight: 'bold',
            fontSize: isMobile ? '0.9rem' : '1.1rem',
            display: 'inline-block',
            width: isMobile ? '100%' : 'auto',
            textAlign: 'center',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
          }}>
            ابدأ الآن 🚀
          </Link>
        </motion.div>
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        style={{ textAlign: 'center', padding: '24px 0', background: '#F8F9FA' }}
      >
        <div className="container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 16px' }}>
          <motion.p animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 2, repeat: Infinity }} style={{ fontSize: isMobile ? '0.7rem' : '0.9rem', color: '#6C757D' }}>
            تم التطوير ضمن برنامج <strong style={{ color: '#1E3A5F' }}>HP IDEA</strong> لتحسين التعليم التكنولوجي في مصر
          </motion.p>
        </div>
      </motion.div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        * { 
          -webkit-tap-highlight-color: transparent; 
        }
        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
};

export default HomePage;