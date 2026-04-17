let score = 0;
let current = 0;

const questions = [
  {
    q: "كم حاصل 2 + 2 ؟",
    answers: [2, 3, 4],
    correct: 4
  },
  {
    q: "كم حاصل 3 + 1 ؟",
    answers: [4, 5, 2],
    correct: 4
  },
  {
    q: "كم حاصل 5 - 2 ؟",
    answers: [3, 2, 4],
    correct: 3
  }
];

// 🔷 Navigation (مهم)
function navigate(pageId) {
  document.querySelectorAll('.page').forEach(p => {
    p.classList.remove('active');
  });

  const page = document.getElementById(pageId);
  if (page) {
    page.classList.add('active');
  }

  window.location.hash = pageId;

  // نشغل quiz غير فـ level1
  if (pageId === "level1") {
    startQuiz();
  }
}

// 🔷 Quiz
function startQuiz() {
  current = 0;
  score = 0;
  loadQuestion();
}

function loadQuestion() {
  const questionEl = document.getElementById("question");
  const
