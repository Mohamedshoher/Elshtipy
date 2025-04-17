// تعيين السنة الحالية في الفوتر
document.getElementById('current-year').textContent = new Date().getFullYear();

// تبديل القائمة المتنقلة
const mobileMenuButton = document.querySelector('.mobile-menu-button');
const mobileMenu = document.querySelector('.mobile-menu');

if (mobileMenuButton && mobileMenu) {
  mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
  });
}

// إغلاق القائمة المتنقلة عند النقر خارجها
document.addEventListener('click', (event) => {
  if (!mobileMenuButton.contains(event.target) && !mobileMenu.contains(event.target) && mobileMenu.classList.contains('active')) {
    mobileMenu.classList.remove('active');
  }
});

// تفعيل النافذة المنبثقة للصور
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');
const downloadBtn = document.getElementById('downloadBtn');
const closeBtn = document.querySelector('.close-modal');
const galleryImages = document.querySelectorAll('.gallery-image');

if (modal && modalImg && downloadBtn && closeBtn && galleryImages) {
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
}

// معالجة نموذج المسابقة
const competitionForm = document.querySelector('.competition-form');
if (competitionForm) {
  competitionForm.addEventListener('submit', (event) => {
    event.preventDefault();
    
    // إظهار رسالة نجاح
    const toastContainer = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast success';
    toast.textContent = 'تم تقديم طلبك بنجاح! سنتواصل معك قريبًا.';
    toastContainer.appendChild(toast);
    
    // إزالة الرسالة بعد 5 ثوانٍ
    setTimeout(() => {
      toast.style.animation = 'toastOut 0.3s forwards';
      setTimeout(() => {
        toastContainer.removeChild(toast);
      }, 300);
    }, 5000);
    
    // إعادة تعيين النموذج
    competitionForm.reset();
  });
}