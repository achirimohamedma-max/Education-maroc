// Navigation
function navigate(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

  const page = document.getElementById(pageId);
  if (page) page.classList.add('active');

  if (allQuestions[pageId]) {
    currentLevel = pageId;
    questions = allQuestions[pageId];
    startQuiz();
  }
}

// Data (كل مستوى مستقل)
const allQuestions = {
  level1: [
    { q: "2+3=?", answers: [4,5,6], correct: 5 },
    { q: "5-2=?", answers: [2,3,4], correct: 3 }
  ],
  level2: [
    { q: "9+5=?", answers: [13,14,15], correct: 14 },
    { q: "12-4=?", answers: [7,8,9], correct: 8 }
  ],
  level3: [
    { q: "6×2=?", answers: [10,12,14], correct: 12 }
  ],
  level4: [
    { q: "52-27=?", answers: [23,25,27], correct: 25 }
  ],
  level5: [
    { q: "123×3=?", answers: [369,360,390], correct: 369 }
  ],
  level6: [
    { q: "123×45=?", answers: [5535,5525,5545], correct: 5535 }
  ]
};

let questions = [];
let current = 0;
let score = 0;
let locked = false;
let currentLevel = "";

// Start quiz
function startQuiz() {
  current = 0;
  locked = false;

  let saved = localStorage.getItem("score_" + currentLevel);
  score = saved ? parseInt(saved) : 0;

  loadQuestion();
}

// Load question
function loadQuestion() {
  const page = document.querySelector(".page.active");

  const qEl = page.querySelector(".question");
  const aEl = page.querySelector(".answers");

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

// Check answer
function check(answer) {
  if (locked) return;
  locked = true;

  const page = document.querySelector(".page.active");

  const result = page.querySelector(".result");
  const scoreText = page.querySelector(".score");

  if (answer === questions[current].correct) {
    result.innerText = "✅ صحيح";
    score += 10;
  } else {
    result.innerText = "❌ خطأ";
  }

  localStorage.setItem("score_" + currentLevel, score);

  scoreText.innerText = "النقاط: " + score;

  current++;

  setTimeout(() => {
    locked = false;

    if (current < questions.length) {
      result.innerText = "";
      loadQuestion();
    } else {
      showFinalResult();
    }
  }, 1000);
}

// Final result
function showFinalResult() {
  const page = document.querySelector(".page.active");

  const qEl = page.querySelector(".question");
  const aEl = page.querySelector(".answers");
  const result = page.querySelector(".result");
  const scoreText = page.querySelector(".score");

  qEl.innerText = "🎉 انتهيت!";
  aEl.innerHTML = "";

  if (score >= questions.length * 8) {
    result.innerText = "🏆 ممتاز!";
  } else if (score >= questions.length * 5) {
    result.innerText = "👍 مزيان!";
  } else {
    result.innerText = "😅 حاول مرة أخرى";
  }

  scoreText.innerText = "النقاط: " + score;
}

// Start
window.onload = () => navigate("home"); 
