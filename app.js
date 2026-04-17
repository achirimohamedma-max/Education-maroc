// Navigation
function navigate(pageId) {
  document.querySelectorAll('.page').forEach(p => {
    p.classList.remove('active');
  });

  const page = document.getElementById(pageId);
  if (page) {
    page.classList.add('active');
  }

  window.location.hash = pageId;

  if (pageId === "level1") {
    startQuiz();
  }
}

// Quiz
let score = 0;
let current = 0;

const questions = [
  {
    q: "2 + 2 = ؟",
    answers: [2, 3, 4],
    correct: 4
  }
];

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
  const result = document.getElementById("result");

  if (!result) return;

  if (answer === questions[current].correct) {
    result.innerText = "✅ صحيح";
  } else {
    result.innerText = "❌ خطأ";
  }
}

// Load
window.onload = function () {
  navigate("home");
};
