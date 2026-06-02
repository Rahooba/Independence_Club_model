import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Model101010 = () => {
  const [animatedSteps, setAnimatedSteps] = useState([false, false, false]);

  useEffect(() => {
    const timers = [0, 300, 600].map((delay, index) => {
      return setTimeout(() => {
        setAnimatedSteps(prev => {
          const newState = [...prev];
          newState[index] = true;
          return newState;
        });
      }, delay);
    });
    return () => timers.forEach(timer => clearTimeout(timer));
  }, []);

  const steps = [
    {
      number: "1",
      icon: "🎯",
      title: "أول 10 دقائق: العمل الفردي الصامت",
      rule: "لا يُسمح لأحد بالتحدث أو رفع اليد",
      task: "كل طالب يحاول حل التمرين بمفرده",
      teacherRole: "يتجول ويلاحظ فقط، لا يتدخل",
      goal: "إجبار الطلاب على الاعتماد على انفسهم لبناء الثقة بالنفس وإعطاء الدماغ وقتاً للتفكير",
      color: "#1E3A5F",
      bgColor: "rgba(30, 58, 95, 0.05)"
    },
    {
      number: "2",
      icon: "🤝",
      title: "ثاني 10 دقائق: العمل الثنائي (زميل بجانب زميل)",
      rule: "يتحدث الطالب مع زميله فقط، لا رفع يد للمعلم",
      task: "مناقشة الحلول، تبادل الأفكار، مساعدة بعضهم البعض",
      teacherRole: "يتجول ويلاحظ، يوجه بتلميحات بسيطة جداً فقط إذا لزم الأمر",
      goal: "استثمار التعلم التعاوني، إعطاء فرصة للطلاب الاجتماعيين للتفاعل",
      color: "#2A9D8F",
      bgColor: "rgba(42, 157, 143, 0.05)"
    },
    {
      number: "3",
      icon: "🗣️",
      title: "آخر 10 دقائق: المناقشة الجماعية مع المعلم",
      rule: "المعلم يوجه أسئلة، الطلاب يرفعون أيديهم للمشاركة",
      task: "عرض الحلول، مناقشة الأخطاء، استخلاص النتائج النهائية",
      teacherRole: "يلعب دور الميسر ويقدم التغذية الراجعة النهائية",
      goal: "توثيق المعلومات، وتكريم المشاركات الصحيحة، وتحويل الأخطاء إلى دروس",
      color: "#F4A261",
      bgColor: "rgba(244, 162, 97, 0.05)"
    }
  ];

  const impacts = [
    {
      icon: "🤔",
      title: "الطلاب الضعفاء",
      description: "مجبرون على المحاولة الفردية أولاً — يبني ثقتهم",
      color: "#2A9D8F",
      gradient: "linear-gradient(135deg, #2A9D8F 0%, #21867a 100%)"
    },
    {
      icon: "🤫",
      title: "الطلاب الهادئون",
      description: "مساحة صمت في أول 10 دقائق ثم مشاركة ثنائية مريحة",
      color: "#E9C46A",
      gradient: "linear-gradient(135deg, #E9C46A 0%, #d4a832 100%)"
    },
    {
      icon: "⭐",
      title: "الطلاب المتميزون",
      description: "دور قيادي محدد في الـ 10 دقائق الثانية",
      color: "#E76F51",
      gradient: "linear-gradient(135deg, #E76F51 0%, #d45a3a 100%)"
    },
    {
      icon: "👩‍🏫",
      title: "المعلم",
      description: "يتدخل فقط في آخر 10 دقائق — وقت تركيز أعلى",
      color: "#1E3A5F",
      gradient: "linear-gradient(135deg, #1E3A5F 0%, #2A5F8F 100%)"
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

      <div className="container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        {/* Back Button with Animation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/home" className="btn-back" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: '#3b4e68',
            border: 'none',
            padding: '10px 24px',
            borderRadius: '30px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            color: 'white',
            textDecoration: 'none',
            marginBottom: '32px',
            marginTop: '24px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateX(-5px)';
            e.currentTarget.style.background = '#F4A261';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateX(0)';
            e.currentTarget.style.background = '#1E3A5F';
          }}>
            ← العودة إلى الرئيسية
          </Link>
        </motion.div>
        
        <div className="tool-page">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="tool-header"
            style={{ textAlign: 'center', marginBottom: '48px' }}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ fontSize: '4rem', marginBottom: '16px' }}
            >
              ⏱️
            </motion.div>
            <h1 style={{ fontSize: '2.5rem', color: '#1E3A5F', marginBottom: '16px' }}>
              نموذج <span style={{ color: '#F4A261' }}>10-10-10</span> للتفاعل المتوازن
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              style={{ fontSize: '1.1rem', color: '#828486', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}
            >
              تقسيم الحصة إلى ثلاث فترات زمنية واضحة، كل فترة 10 دقائق، لتحقيق توازن بين العمل الفردي والجماعي — 
              الطالب يتحمل مسؤولية تعلمه أولاً قبل طلب أي مساعدة
            </motion.p>
          </motion.div>

          {/* Timer Info Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            style={{
              background: 'linear-gradient(135deg, #1E3A5F 0%, #2A5F8F 100%)',
              borderRadius: '24px',
              padding: '32px',
              marginBottom: '48px',
              textAlign: 'center',
              color: 'white',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{
                position: 'absolute',
                top: -50,
                right: -50,
                width: '200px',
                height: '200px',
                background: 'radial-gradient(circle, rgba(244,162,97,0.2) 0%, transparent 70%)',
                borderRadius: '50%'
              }}
            />
            <div style={{ position: 'relative', zIndex: 2 }}>
              <div style={{ fontSize: '3rem', marginBottom: '16px' }}>⏲️</div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>30 دقيقة من كل حصة</h3>
              <p style={{ opacity: 0.9 }}>10 دقائق فردي ← 10 دقائق ثنائي ← 10 دقائق جماعي</p>
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '16px',
                marginTop: '24px',
                flexWrap: 'wrap'
              }}>
                {['فردي صامت', 'عمل ثنائي', 'مناقشة جماعية'].map((phase, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.05, y: -3 }}
                    style={{
                      background: 'rgba(255,255,255,0.15)',
                      padding: '8px 20px',
                      borderRadius: '50px',
                      fontSize: '0.9rem',
                      backdropFilter: 'blur(10px)'
                    }}
                  >
                    {phase}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Steps Section */}
          <div className="tool-steps" style={{ marginBottom: '48px' }}>
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={animatedSteps[index] ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, type: 'spring' }}
                className="step"
                style={{
                  display: 'flex',
                  gap: '24px',
                  marginBottom: '32px',
                  padding: '24px',
                  background: step.bgColor,
                  borderRadius: '20px',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                whileHover={{ scale: 1.02, boxShadow: '0 8px 25px rgba(0,0,0,0.1)' }}
              >
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className="step-number"
                  style={{
                    width: '60px',
                    height: '60px',
                    background: step.color,
                    color: 'white',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.8rem',
                    fontWeight: 'bold',
                    flexShrink: 0
                  }}
                >
                  {step.number}
                </motion.div>
                <div className="step-content" style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '1.4rem', marginBottom: '16px', color: step.color }}>
                    {step.icon} {step.title}
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                    <div>
                      <strong style={{ color: step.color }}>📋 القاعدة:</strong>
                      <p style={{ color: '#6C757D', marginTop: '4px' }}>{step.rule}</p>
                    </div>
                    <div>
                      <strong style={{ color: step.color }}>✏️ المهمة:</strong>
                      <p style={{ color: '#6C757D', marginTop: '4px' }}>{step.task}</p>
                    </div>
                    <div>
                      <strong style={{ color: step.color }}>👩‍🏫 دور المعلم:</strong>
                      <p style={{ color: '#6C757D', marginTop: '4px' }}>{step.teacherRole}</p>
                    </div>
                    <div>
                      <strong style={{ color: step.color }}>🎯 الهدف:</strong>
                      <p style={{ color: '#6C757D', marginTop: '4px' }}>{step.goal}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Impact Section - التأثير المتوقع على كل فئة */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            style={{ marginBottom: '48px' }}
          >
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ fontSize: '2.5rem', marginBottom: '8px' }}
              >
                📊
              </motion.div>
              <h2 style={{ fontSize: '1.8rem', color: '#1E3A5F', marginBottom: '8px' }}>التأثير المتوقع على كل فئة</h2>
              <p style={{ color: '#6C757D' }}>كيف يستفيد كل فرد من هذا النموذج</p>
            </div>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '24px'
            }}
            className="impacts-grid">
              {impacts.map((impact, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5, type: 'spring' }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  style={{
                    background: impact.gradient,
                    borderRadius: '20px',
                    padding: '28px 20px',
                    textAlign: 'center',
                    color: 'white',
                    cursor: 'pointer',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                    style={{ fontSize: '3rem', marginBottom: '16px' }}
                  >
                    {impact.icon}
                  </motion.div>
                  <h3 style={{ fontSize: '1.3rem', marginBottom: '12px' }}>{impact.title}</h3>
                  <p style={{ fontSize: '0.9rem', opacity: 0.95, lineHeight: '1.5' }}>{impact.description}</p>
                  
                  {/* Animated shine effect */}
                  <motion.div
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.5 }}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                      pointerEvents: 'none'
                    }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Interactive Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', margin: '32px 0' }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{ boxShadow: ['0 4px 15px rgba(244,162,97,0.3)', '0 8px 30px rgba(244,162,97,0.6)', '0 4px 15px rgba(244,162,97,0.3)'] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ display: 'inline-block' }}
            >
              <Link to="/model-10-10-10/interactive" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                background: 'linear-gradient(135deg, #F4A261 0%, #E76F51 100%)',
                color: 'white',
                padding: '16px 40px',
                borderRadius: '50px',
                fontSize: '1.2rem',
                fontWeight: 'bold',
                textDecoration: 'none',
                transition: 'all 0.3s ease'
              }}>
                🎮 استخدم النموذج مع الطلاب
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  →
                </motion.span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Implementation Box */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="implementation-box"
            style={{
              background: 'linear-gradient(135deg, #1E3A5F 0%, #2A5F8F 100%)',
              borderRadius: '24px',
              padding: '32px',
              marginBottom: '32px',
              color: 'white',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <motion.div
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 8, repeat: Infinity }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
                pointerEvents: 'none'
              }}
            />
            <div style={{ position: 'relative', zIndex: 2 }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                📋 كيف ننفذ هذا النموذج؟
              </h3>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {[
                  'استخدم مؤقت زمني (Timer) واضح للطلاب يعرفهم ببداية ونهاية كل فترة',
                  'ضع بطاقة تذكير للمعلم على المكتب فيها قواعد كل فترة',
                  'في أول 10 دقائق: ممنوع التدخل المباشر - المعلم يتجول ويلاحظ فقط',
                  'في الـ10 دقائق الثانية: شجع الحوار بين الطلاب ولا تعطِ حلولاً جاهزة',
                  'في الـ10 دقائق الأخيرة: كن ميسراً للنقاش وليس محاضراً'
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.4 }}
                    viewport={{ once: true }}
                    style={{
                      padding: '10px 0',
                      paddingRight: '28px',
                      position: 'relative',
                      borderBottom: i < 4 ? '1px solid rgba(255,255,255,0.1)' : 'none'
                    }}
                  >
                    <span style={{
                      position: 'absolute',
                      right: 0,
                      color: '#F4A261',
                      fontWeight: 'bold'
                    }}>✓</span>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Digital Tools */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="digital-tools"
            style={{
              background: '#F8F9FA',
              borderRadius: '24px',
              padding: '32px',
              textAlign: 'center'
            }}
          >
            <h3 style={{ fontSize: '1.5rem', color: '#1E3A5F', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
              💻 الأدوات الرقمية المساعدة
            </h3>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
              {[
                { icon: '⏱️', text: 'مؤقت رقمي (Digital Timer)' },
                { icon: '📊', text: 'PowerPoint تفاعلي' },
                { icon: '📱', text: 'تطبيق مؤقت على جهاز المعلم' },
                { icon: '🎯', text: 'مؤقت مرئي على الشاشة' }
              ].map((tool, i) => (
                <motion.span
                  key={i}
                  whileHover={{ scale: 1.05, y: -3 }}
                  style={{
                    background: 'white',
                    padding: '10px 24px',
                    borderRadius: '50px',
                    fontWeight: '500',
                    color: '#1E3A5F',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'pointer'
                  }}
                >
                  {tool.icon} {tool.text}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        
        * {
          -webkit-tap-highlight-color: transparent;
        }
        
        /* Responsive Styles */
        @media (max-width: 768px) {
          .step {
            flex-direction: column;
            text-align: center;
          }
          .step-number {
            margin: 0 auto;
          }
          
          /* Make impact cards stack vertically on mobile */
          .impacts-grid {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
        }
        
        /* For tablets - 2 columns */
        @media (min-width: 769px) and (max-width: 1024px) {
          .impacts-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        
        /* For desktop - 4 columns */
        @media (min-width: 1025px) {
          .impacts-grid {
            grid-template-columns: repeat(4, 1fr) !important;
          }
        }
      `}</style>
      
    </div>
  );
};

export default Model101010;