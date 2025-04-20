// إنشاء ملف جديد للنماذج
function handleFormSubmit(formType, scriptURL) {
  const form = document.querySelector(`form[data-form-type="${formType}"]`);
  
  if (!form) return;
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(form);
    const data = {};
    
    formData.forEach((value, key) => {
      data[key] = value;
    });

    fetch(scriptURL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(() => {
      alert('تم إرسال طلبك بنجاح! سنتواصل معك قريباً');
      form.reset();
    })
    .catch(error => {
      console.error('Error:', error);
      alert('حدث خطأ في إرسال الطلب. يرجى المحاولة مرة أخرى');
    });
  });
}

// تهيئة النماذج
document.addEventListener('DOMContentLoaded', function() {
  // نموذج الإجازات
  handleFormSubmit('registration', 'https://script.google.com/macros/s/AKfycby7m3np-AeKJCAK_HAX4x2aEn8Chz20EWAWGPPwmDbT3B5rRTNcxpg7Xx19EzDM-YZ82A/exec');
  
  // نموذج التواصل
  handleFormSubmit('contact', 'YOUR_CONTACT_FORM_SCRIPT_URL');
  
  // نموذج التسجيل في الدورات
  handleFormSubmit('course', 'YOUR_COURSE_FORM_SCRIPT_URL');
  
  // أي نماذج إضافية...
});