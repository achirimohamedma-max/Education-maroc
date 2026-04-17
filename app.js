let unlockedLevels = JSON.parse(localStorage.getItem("unlockedLevels")) || ["level1"];
// Navigation
function navigate(pageId) {

  // منع الدخول إلا ما مفتوحش
  if (allQuestions[pageId] && !unlockedLevels.includes(pageId)) {
    alert("🔒 خاصك تكمل المستوى السابق");
    return;
  }

  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

  const page = document.getElementById(pageId);
  if (page) page.classList.add('active');

  if (allQuestions[pageId]) {
    questions = allQuestions[pageId];
    currentLevel = pageId;
    startQuiz();
  }
}

// Data (مختصر دابا)
const allQuestions = {
  level1: [
    { q: "2 + 2 = ؟", answers: [2,3,4], correct: 4 },
    { q: "5 - 2 = ؟", answers: [2,3,4], correct: 3 }
  ],
  level2: [
    { q: "9 + 5 = ؟", answers: [13,14,15], correct: 14 },
    { q: "12 - 4 = ؟", answers: [7,8,9], correct: 8 }
  ],
  level3: [
    { q: "6 × 2 = ؟", answers: [10,12,14], correct: 12 }
  ],
  level4: [
    { q: "52 - 27 = ؟", answers: [23,25,27], correct: 25 }
  ],
  level5: [
    { q: "123 × 3 = ؟", answers: [369,360,390], correct: 369 }
  ],
  level6: [
    { q: "123 × 45 = ؟", answers: [5535,5525,5545], correct: 5535 }
  ]
};

let questions = [];
let current = 0;
let score = 0;
let locked = false;

function startQuiz() {
  current = 0;
  score = 0;
  locked = false;
  loadQuestion();
}

function loadQuestion() {
  const page = document.querySelector(".page.active");

  const qEl = page.querySelector("#question");
  const aEl = page.querySelector("#answers");

  if (!qEl || !aEl) return;

  const q = questions[current];

  qEl.innerText = q.q;
  aEl.innerHTML = "";

  q.answers.forEach(a => {
    const btn = document.createElement("button");
    btn.innerText = a;
    btn.onclick = () => check(a);
    aEl.appendChild(btn);
  });
}

function check(answer) {
  if (locked) return;
  locked = true;

  const page = document.querySelector(".page.active");

  const result = page.querySelector("#result");
  const scoreText = page.querySelector("#score");

  if (answer === questions[current].correct) {
    result.innerText = "✅ صحيح";
    score += 10;
  } else {
    result.innerText = "❌ خطأ";
  }

  scoreText.innerText = "النقاط: " + score;

  current++;

  setTimeout(() => {
    locked = false;

    if (current < questions.length) {
  loadQuestion();
} else {
  showFinalResult();
    } 
  }, 1000);
}
function showFinalResult() {
  const page = document.querySelector(".page.active");

  const qEl = page.querySelector("#question");
  const aEl = page.querySelector("#answers");
  const result = page.querySelector("#result");
  const scoreText = page.querySelector("#score");

  qEl.innerText = "🎉 انتهيت!";
  aEl.innerHTML = "";

  // 🎮 Gamification
  if (score >= questions.length * 8) {
    result.innerText = "🏆 ممتاز! نجحت!";
  } else if (score >= questions.length * 5) {
    result.innerText = "👍 مزيان!";
  } else {
    result.innerText = "😅 حاول مرة أخرى";
  }

  scoreText.innerText = "النقاط: " + score;

  // 🔓 Unlock system
  const levels = ["level1","level2","level3","level4","level5","level6"];
  let index = levels.indexOf(currentLevel);

  if (index !== -1 && index < levels.length - 1) {
    const nextLevel = levels[index + 1];

    if (!unlockedLevels.includes(nextLevel)) {
      unlockedLevels.push(nextLevel);
      localStorage.setItem("unlockedLevels", JSON.stringify(unlockedLevels));
    }
  }
}
// Start
window.onload = () => navigate("home"); 
