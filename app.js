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
let locked = false;

function check(answer) {
  if (locked) return;
  locked = true;

  const result = document.getElementById("result");

  if (answer === questions[current].correct) {
    result.innerText = "✅ صحيح!";
    result.style.color = "lightgreen";
    score += 10;
  } else {
    result.innerText = "❌ خطأ";
    result.style.color = "red";
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
// Load
window.onload = function () {
  navigate("home");
};
