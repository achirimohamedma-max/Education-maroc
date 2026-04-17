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

  // 🟢 الأول ابتدائي (جمع + طرح بسيط)
  level1: [
    { q: "2 + 3 = ؟", answers: [4,5,6], correct: 5 },
    { q: "5 - 2 = ؟", answers: [2,3,4], correct: 3 },
    { q: "1 + 4 = ؟", answers: [4,5,6], correct: 5 },
    { q: "6 - 3 = ؟", answers: [2,3,4], correct: 3 },
    { q: "2 + 2 = ؟", answers: [3,4,5], correct: 4 },
    { q: "7 - 5 = ؟", answers: [1,2,3], correct: 2 },
    { q: "3 + 1 = ؟", answers: [3,4,5], correct: 4 },
    { q: "8 - 6 = ؟", answers: [1,2,3], correct: 2 },
    { q: "4 + 2 = ؟", answers: [5,6,7], correct: 6 },
    { q: "9 - 7 = ؟", answers: [1,2,3], correct: 2 }
  ],

  // 🟡 الثاني ابتدائي (جمع بالاحتفاظ + طرح عادي)
  level2: [
    { q: "9 + 5 = ؟", answers: [13,14,15], correct: 14 },
    { q: "8 + 7 = ؟", answers: [14,15,16], correct: 15 },
    { q: "12 - 4 = ؟", answers: [7,8,9], correct: 8 },
    { q: "15 - 6 = ؟", answers: [8,9,10], correct: 9 },
    { q: "7 + 8 = ؟", answers: [14,15,16], correct: 15 },
    { q: "13 - 5 = ؟", answers: [7,8,9], correct: 8 },
    { q: "6 + 9 = ؟", answers: [14,15,16], correct: 15 },
    { q: "14 - 7 = ؟", answers: [6,7,8], correct: 7 },
    { q: "5 + 7 = ؟", answers: [11,12,13], correct: 12 },
    { q: "11 - 3 = ؟", answers: [7,8,9], correct: 8 }
  ],

  // 🟠 الثالث ابتدائي (جمع + طرح بالمبادلة + ضرب بسيط)
  level3: [
    { q: "14 + 8 = ؟", answers: [21,22,23], correct: 22 },
    { q: "21 - 9 = ؟", answers: [11,12,13], correct: 12 },
    { q: "6 × 2 = ؟", answers: [10,12,14], correct: 12 },
    { q: "15 + 7 = ؟", answers: [21,22,23], correct: 22 },
    { q: "30 - 12 = ؟", answers: [16,18,20], correct: 18 },
    { q: "3 × 4 = ؟", answers: [10,12,14], correct: 12 },
    { q: "18 + 5 = ؟", answers: [22,23,24], correct: 23 },
    { q: "25 - 8 = ؟", answers: [15,17,19], correct: 17 },
    { q: "5 × 3 = ؟", answers: [12,15,18], correct: 15 },
    { q: "9 × 2 = ؟", answers: [16,18,20], correct: 18 }
  ],

  // 🔵 الرابع ابتدائي (طرح بالمبادلة + ضرب بالاحتفاظ)
  level4: [
    { q: "52 - 27 = ؟", answers: [23,25,27], correct: 25 },
    { q: "34 × 2 = ؟", answers: [66,68,70], correct: 68 },
    { q: "63 - 29 = ؟", answers: [32,34,36], correct: 34 },
    { q: "25 × 3 = ؟", answers: [70,75,80], correct: 75 },
    { q: "81 - 46 = ؟", answers: [33,35,37], correct: 35 },
    { q: "14 × 4 = ؟", answers: [52,56,60], correct: 56 },
    { q: "70 - 38 = ؟", answers: [30,32,34], correct: 32 },
    { q: "32 × 3 = ؟", answers: [94,96,98], correct: 96 },
    { q: "90 - 55 = ؟", answers: [33,35,37], correct: 35 },
    { q: "18 × 5 = ؟", answers: [80,90,100], correct: 90 }
  ],

  // 🟣 الخامس ابتدائي (ضرب كبير + قسمة)
  level5: [
    { q: "123 × 3 = ؟", answers: [369,360,390], correct: 369 },
    { q: "144 ÷ 12 = ؟", answers: [10,11,12], correct: 12 },
    { q: "205 × 4 = ؟", answers: [810,820,830], correct: 820 },
    { q: "96 ÷ 8 = ؟", answers: [10,11,12], correct: 12 },
    { q: "321 × 2 = ؟", answers: [640,642,650], correct: 642 },
    { q: "81 ÷ 9 = ؟", answers: [7,8,9], correct: 9 },
    { q: "150 × 3 = ؟", answers: [450,460,470], correct: 450 },
    { q: "72 ÷ 6 = ؟", answers: [10,11,12], correct: 12 },
    { q: "412 × 2 = ؟", answers: [824,820,830], correct: 824 },
    { q: "63 ÷ 7 = ؟", answers: [8,9,10], correct: 9 }
  ],

  // 🔴 السادس ابتدائي (ضرب كبير + قسمة أصعب)
  level6: [
    { q: "123 × 45 = ؟", answers: [5535,5525,5545], correct: 5535 },
    { q: "144 ÷ 12 = ؟", answers: [10,11,12], correct: 12 },
    { q: "234 × 12 = ؟", answers: [2808,2810,2820], correct: 2808 },
    { q: "225 ÷ 15 = ؟", answers: [14,15,16], correct: 15 },
    { q: "312 × 21 = ؟", answers: [6552,6542,6562], correct: 6552 },
    { q: "360 ÷ 12 = ؟", answers: [28,30,32], correct: 30 },
    { q: "145 × 32 = ؟", answers: [4640,4645,4650], correct: 4640 },
    { q: "420 ÷ 14 = ؟", answers: [28,30,32], correct: 30 },
    { q: "256 × 11 = ؟", answers: [2816,2826,2836], correct: 2816 },
    { q: "600 ÷ 25 = ؟", answers: [20,24,25], correct: 24 }
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
