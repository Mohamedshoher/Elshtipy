
// تهيئة المتغيرات
const mobileMenuButton = document.querySelector('.mobile-menu-button');
const mobileMenu = document.querySelector('.mobile-menu');
const yearSpan = document.getElementById('current-year');

// إعداد السنة الحالية
yearSpan.textContent = new Date().getFullYear();

// تشغيل/إيقاف القائمة المتنقلة
if (mobileMenuButton && mobileMenu) {
  mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
  });

  // إغلاق القائمة المتنقلة عند النقر خارجها
  document.addEventListener('click', (event) => {
    if (!mobileMenuButton.contains(event.target) && !mobileMenu.contains(event.target)) {
      mobileMenu.classList.remove('active');
    }
  });
}

// دالة إنشاء نجوم عشوائية في الخلفية
function createStars() {
  const starBackgrounds = document.querySelectorAll('.star-background');
  
  starBackgrounds.forEach(background => {
    for (let i = 0; i < 50; i++) {
      const star = document.createElement('div');
      const size = Math.random() * 2 + 1; // 1-3px
      star.style.position = 'absolute';
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.borderRadius = '50%';
      star.style.backgroundColor = 'rgba(212, 175, 55, 0.7)';
      star.style.top = `${Math.random() * 100}%`;
      star.style.left = `${Math.random() * 100}%`;
      star.style.opacity = '0';
      star.style.animation = `twinkle ${Math.random() * 3 + 2}s ease-in-out ${Math.random() * 5}s infinite`;
      
      background.appendChild(star);
    }
  });
}

// نظام الإشعارات
const toastContainer = document.getElementById('toast-container');

function showToast(message, type = 'success', duration = 3000) {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  
  if (toastContainer) {
    toastContainer.appendChild(toast);
    
    setTimeout(() => {
      toast.style.animation = 'toastOut 0.3s ease-in-out forwards';
      setTimeout(() => {
        toastContainer.removeChild(toast);
      }, 300);
    }, duration);
  }
}

// وظيفة معالجة النماذج
function handleFormSubmission(form, googleScriptUrl) {
  if (!form || !googleScriptUrl) return;
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const button = form.querySelector('[type="submit"]');
    const originalText = button.textContent;
    button.textContent = 'جاري الإرسال...';
    button.disabled = true;
    
    try {
      const formData = new FormData(form);
      const queryString = new URLSearchParams(formData).toString();
      
      // إنشاء وظيفة رد استدعاء فريدة
      const callbackName = 'formCallback_' + Date.now();
      window[callbackName] = function(response) {
        if (response && response.result === 'success') {
          showToast('تم إرسال الطلب بنجاح!', 'success');
          form.reset();
        } else {
          showToast('حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.', 'error');
        }
        
        // تنظيف
        delete window[callbackName];
        document.body.removeChild(script);
        
        // إعادة زر الإرسال لحالته الأصلية
        button.textContent = originalText;
        button.disabled = false;
      };
      
      // استخدام JSONP لتجاوز قيود CORS
      const script = document.createElement('script');
      script.src = `${googleScriptUrl}?${queryString}&callback=${callbackName}`;
      document.body.appendChild(script);
      
    } catch (error) {
      console.error('خطأ في إرسال النموذج:', error);
      showToast('حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.', 'error');
      
      button.textContent = originalText;
      button.disabled = false;
    }
  });
}

// تنفيذ بعض المهام عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.getElementById('navbar');
  createStars();
  
  // معالجة النماذج في الصفحة
  const contactForms = document.querySelectorAll('form[data-form-type="contact"]');
  const registrationForms = document.querySelectorAll('form[data-form-type="registration"]');
  
  contactForms.forEach(form => {
    handleFormSubmission(form, 'https://script.google.com/macros/s/YOUR_CONTACT_SCRIPT_ID/exec');
  });
  
  registrationForms.forEach(form => {
    handleFormSubmission(form, 'https://script.google.com/macros/s/YOUR_REGISTRATION_SCRIPT_ID/exec');
  });
  
  // الحصول على الوضع الحالي من URL (إذا كان متاحًا)
  const urlParams = new URLSearchParams(window.location.search);
  const level = urlParams.get('level');
  
  if (level) {
    const levelSelects = document.querySelectorAll('select[name="level"]');
    levelSelects.forEach(select => {
      select.value = level;
    });
    
    // التمرير إلى نموذج التسجيل
    const applyForm = document.getElementById('apply-form');
    if (applyForm) {
      setTimeout(() => {
        applyForm.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    }
  }

  // Navbar scroll effect
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) { // Add class if scrolled more than 50px
        navbar.classList.add('navbar-scrolled');
      } else {
        navbar.classList.remove('navbar-scrolled');
      }
    });
  }
    
    // ... existing script ...

    // تفعيل النافذة المنبثقة للصور
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const downloadBtn = document.getElementById('downloadBtn');
    const closeBtn = document.querySelector('.close-modal');
    const galleryImages = document.querySelectorAll('.gallery-image');

    galleryImages.forEach(img => {
      img.addEventListener('click', () => {
        modal.style.display = "flex";
        modalImg.src = img.src;
        downloadBtn.href = img.src;
      });
    });

    closeBtn.addEventListener('click', () => {
      modal.style.display = "none";
    });

    window.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
  
});

