import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // لا نظهر الهيدر في صفحة الترحيب
  if (location.pathname === '/') {
    return null;
  }

  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;

  const navItems = [
    { path: "/home", label: "الرئيسية", icon: "🏠" },
    { path: "/model-10-10-10", label: "نموذج 10-10-10", icon: "⏱️" },
    { path: "/support-ladder", label: "سلم الدعم", icon: "🪜" },
    { path: "/silent-cards", label: "بطاقات التعبير الصامت", icon: "🃏" },
    { path: "/beautiful-mistakes", label: "الأخطاء الجميلة", icon: "✨" },
    { path: "/about", label: "عن النادي", icon: "📖" }
  ];

  return (
    <>
      <header className="header" style={{
        background: 'white',
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        backdropFilter: 'blur(10px)',
        background: 'rgba(255,255,255,0.95)'
      }}>
        <div className="container" style={{ 
          maxWidth: '1280px', 
          margin: '0 auto', 
          padding: isMobile ? '12px 16px' : (isTablet ? '16px 24px' : '16px 24px')
        }}>
          <div className="header-content" style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            flexDirection: 'row-reverse' // لعكس الترتيب (اللوجو عاليمين، القائمة عالشمال)
          }}>
            {/* Logo - على اليمين */}
            <div className="logo">
              <Link to="/home" style={{ textDecoration: 'none', color: 'inherit' }}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <h1 style={{ 
                    fontSize: isMobile ? '1.1rem' : (isTablet ? '1.3rem' : '1.5rem'), 
                    margin: 0,
                    color: '#1E3A5F'
                  }}>
                    🏆 نادي الاستقلالية
                  </h1>
                  <p style={{ 
                    fontSize: isMobile ? '0.6rem' : (isTablet ? '0.7rem' : '0.8rem'), 
                    margin: '2px 0 0 0',
                    color: '#6C757D'
                  }}>
                    Independence Club
                  </p>
                </motion.div>
              </Link>
            </div>

            {/* Desktop Navigation - على الشمال */}
            {!isMobile && (
              <ul className="nav-links" style={{
                display: 'flex',
                gap: isTablet ? '16px' : '24px',
                listStyle: 'none',
                margin: 0,
                padding: 0,
                alignItems: 'center'
              }}>
                {navItems.map((item) => (
                  <motion.li
                    key={item.path}
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link 
                      to={item.path} 
                      style={{
                        textDecoration: 'none',
                        color: location.pathname === item.path ? '#F4A261' : '#495057',
                        fontWeight: location.pathname === item.path ? '600' : '500',
                        fontSize: isTablet ? '0.85rem' : '0.95rem',
                        transition: 'color 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '8px 0',
                        borderBottom: location.pathname === item.path ? '2px solid #F4A261' : '2px solid transparent'
                      }}
                      onMouseEnter={(e) => {
                        if (location.pathname !== item.path) {
                          e.currentTarget.style.color = '#F4A261';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (location.pathname !== item.path) {
                          e.currentTarget.style.color = '#495057';
                        }
                      }}
                    >
                      <span style={{ fontSize: '1rem' }}>{item.icon}</span>
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            )}

            {/* Mobile Menu Button (Hamburger) - على الشمال */}
            {isMobile && (
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '8px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                  zIndex: 1001,
                  position: 'relative'
                }}
                aria-label="القائمة"
              >
                <motion.span
                  animate={isMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    width: '25px',
                    height: '3px',
                    background: '#1E3A5F',
                    borderRadius: '3px',
                    display: 'block'
                  }}
                />
                <motion.span
                  animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    width: '25px',
                    height: '3px',
                    background: '#1E3A5F',
                    borderRadius: '3px',
                    display: 'block'
                  }}
                />
                <motion.span
                  animate={isMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    width: '25px',
                    height: '3px',
                    background: '#1E3A5F',
                    borderRadius: '3px',
                    display: 'block'
                  }}
                />
              </motion.button>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && isMobile && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsMenuOpen(false)}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0,0,0,0.5)',
                zIndex: 999,
                backdropFilter: 'blur(5px)'
              }}
            />
            
            {/* Menu Panel - يظهر من الشمال (اليمين في العربية) */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                bottom: 0,
                width: '80%',
                maxWidth: '300px',
                background: 'white',
                boxShadow: '2px 0 20px rgba(0,0,0,0.1)',
                zIndex: 1000,
                padding: '80px 24px 24px 24px',
                overflowY: 'auto'
              }}
            >
              {/* Close button inside menu */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMenuOpen(false)}
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px', // غيرت من left لـ right
                  background: 'none',
                  border: 'none',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  color: '#1E3A5F'
                }}
              >
                ✕
              </motion.button>

              {/* Mobile Navigation Items */}
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '16px'
              }}>
                {navItems.map((item, index) => (
                  <motion.li
                    key={item.path}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      to={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      style={{
                        textDecoration: 'none',
                        color: location.pathname === item.path ? '#F4A261' : '#495057',
                        fontWeight: location.pathname === item.path ? '600' : '500',
                        fontSize: '1.1rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '12px 16px',
                        borderRadius: '12px',
                        background: location.pathname === item.path ? 'rgba(244,162,97,0.1)' : 'transparent',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        if (location.pathname !== item.path) {
                          e.currentTarget.style.background = '#F8F9FA';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (location.pathname !== item.path) {
                          e.currentTarget.style.background = 'transparent';
                        }
                      }}
                    >
                      <span style={{ fontSize: '1.3rem' }}>{item.icon}</span>
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              {/* Mobile Footer Info */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                style={{
                  marginTop: '32px',
                  paddingTop: '16px',
                  borderTop: '1px solid #E9ECEF',
                  textAlign: 'center'
                }}
              >
                <p style={{ fontSize: '0.7rem', color: '#ADB5BD', margin: 0 }}>
                  تم التطوير ضمن برنامج HP IDEA
                </p>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          body {
            overflow: ${isMenuOpen ? 'hidden' : 'auto'};
          }
        }
        
        /* Smooth transitions */
        .nav-links a {
          transition: all 0.3s ease;
        }
      `}</style>
    </>
  );
};

export default Header;