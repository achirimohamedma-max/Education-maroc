function navigate(pageId) {
  document.querySelectorAll('.page').forEach(p => {
    p.classList.remove('active');
  });

  document.getElementById(pageId).classList.add('active');

  // تغيير الرابط
  window.location.hash = pageId;
}

// عند تحميل الصفحة
window.addEventListener("load", () => {
  const page = window.location.hash.replace("#", "") || "home";
  navigate(page);
}); 
