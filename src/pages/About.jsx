import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="container">
      <Link to="/" className="btn-back">← العودة إلى الرئيسية</Link>
      
      <div className="tool-page">
        <div className="tool-header">
          <h1>🏆 عن نادي الاستقلالية</h1>
          <p className="description">Independence Club - نموذج متكامل لتحويل الطلاب من الاعتماد على المعلم إلى الاعتماد على الذات</p>
        </div>

        <div className="tool-steps">
          <div className="step">
            <div className="step-number">🎯</div>
            <div className="step-content">
              <h3>الرؤية</h3>
              <p>تحويل الطلاب من متلقين سلبيين إلى متعلمين مستقلين وواثقين، قادرين على مواجهة التحديات وحل المشكلات بأنفسهم.</p>
            </div>
          </div>

          <div className="step">
            <div className="step-number">📋</div>
            <div className="step-content">
              <h3>المشكلة المستهدفة</h3>
              <p>وجود مؤشرات على انخفاض مستوى تفاعل الطلاب داخل الحصص واعتمادهم المباشر على التوجيه من المعلم مع ضعف القدرة على تنفيذ المهام بشكل فردي.</p>
            </div>
          </div>

          <div className="step">
            <div className="step-number">💡</div>
            <div className="step-content">
              <h3>الحل - نادي الاستقلالية</h3>
              <p>نموذج متكامل يجمع بين الأنشطة المتدرجة (10-10-10)، وسلم الدعم الخمسة، ونظام الأختام والتكريم، ومنصة رقمية بسيطة.</p>
            </div>
          </div>

          <div className="step">
            <div className="step-number">📊</div>
            <div className="step-content">
              <h3>النتائج المستهدفة</h3>
              <ul style={{ marginTop: '8px', paddingRight: '20px' }}>
                <li>تحسن الاعتماد على الذات بنسبة 70%</li>
                <li>انخفاض طلب المساعدة المباشرة من 15-20 إلى 5-8 مرات لكل حصة</li>
                <li>ظهور تفاعل الطلاب الهادئين عبر بطاقات التعبير الصامت</li>
                <li>مشاركة 10-15 خطأً جميلاً أسبوعياً على لوحة الأخطاء</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="implementation-box">
          <h3>🏫 العينة التجريبية</h3>
          <p><strong>المدرسة:</strong> مدرسة وي الوادي الجديد</p>
          <p><strong>الطلاب:</strong> 30 طالباً من الصف الأول والثاني الثانوي (مستويات متنوعة: ضعيف، متميز، هادئ)</p>
          <p><strong>المواد:</strong> شبكات، برمجة، فيزياء، لغة إنجليزية، رياضيات</p>
          <p><strong>المدة:</strong> 5 أسابيع (تصميم: أسبوعان، تنفيذ: 3 أسابيع)</p>
        </div>

        <div className="digital-tools">
          <h3>👥 فريق العمل</h3>
          <div className="tools-badges">
            <span className="badge">👩‍🏫 رحاب أشرف</span>
            <span className="badge">👩‍🏫 سارة عمر</span>
            <span className="badge">👨‍🏫 عصمت حمدي</span>
            <span className="badge">👨‍🏫 مصطفى جويد</span>
            <span className="badge">👩‍🏫 زينب حمادة</span>
            <span className="badge">👩‍🏫 منى مصطفى</span>
            <span className="badge">👩‍🏫 شيماء علي</span>
          </div>
          <p style={{ marginTop: '20px', fontSize: '0.9rem', color: 'var(--gray-dark)' }}>
            برنامج HP IDEA لتحسين التعليم التكنولوجي في مصر
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;