// ===== Navigation =====
function navigate(pageId) {
  document.querySelectorAll('.page').forEach(p => {
    p.classList.remove('active');
  });

  const page = document.getElementById(pageId);
  if (page) {
    page.classList.add('active');
  }

  window.location.hash = pageId;

  if (allQuestions[pageId]) {
    questions = allQuestions[pageId];
    startQuiz();
  }
}

// ===== Data =====
const allQuestions = {
  level1: [
    { q: "2 + 2 = ؟", answers: [2, 3, 4], correct: 4 },
    { q: "1 + 1 = ؟", answers: [1, 2, 3], correct: 2 }
  ],
  level2: [
    { q: "5 + 3 = ؟", answers: [7, 8, 9], correct: 8 },
    { q: "6 - 2 = ؟", answers: [3, 4, 5], correct: 4 }
  ]
};

let questions = [];
let current = 0;
let score = 0;
let locked = false;

// ===== Quiz =====
function startQuiz() {
  current = 0;
  score = 0;
  loadQuestion();
}

function loadQuestion() {
  const qEl = document.getElementById("question");
  const aEl = document.getElementById("answers");

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

  const result = document.getElementById("result");
  const scoreText = document.getElementById("score");

  if (answer === questions[current].correct) {
    result.innerText = "✅ صحيح!";
    result.style.color = "lightgreen";
    score += 10;
  } else {
    result.innerText = "❌ خطأ";
    result.style.color = "red";
  }

  if (scoreText) {
    scoreText.innerText = "النقاط: " + score;
  }

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

function showFinalResult() {
  const qEl = document.getElementById("question");
  const aEl = document.getElementById("answers");
  const result = document.getElementById("result");
  const scoreText = document.getElementById("score");

  if (!qEl || !aEl) return;

  qEl.innerText = "🎉 انتهيت!";
  aEl.innerHTML = "";

  result.innerText = "النتيجة النهائية:";
  scoreText.innerText = "النقاط: " + score;
}

// ===== Load =====
window.onload = function () {
  navigate("home");
}; 
