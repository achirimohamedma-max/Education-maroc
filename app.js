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
let score = 0;

function answer(value) {
  const result = document.getElementById("result");
  const scoreText = document.getElementById("score");

  if (value === 4) {
    result.innerText = "✅ صحيح!";
    result.style.color = "lightgreen";
    score += 10;
  } else {
    result.innerText = "❌ خطأ";
    result.style.color = "red";
  }

  scoreText.innerText = "النقاط: " + score;
}
