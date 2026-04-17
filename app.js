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

function loadQuestion() {
  const q = questions[current];

  document.getElementById("question").innerText = q.q;

  const answersDiv = document.getElementById("answers");
  answersDiv.innerHTML = "";

  q.answers.forEach(a => {
    const btn = document.createElement("button");
    btn.innerText = a;
    btn.onclick = () => check(a);
    answersDiv.appendChild(btn);
  });
}

function check(answer) {
  const result = document.getElementById("result");

  if (answer === questions[current].correct) {
    result.innerText = "✅ صحيح!";
    score += 10;
  } else {
    result.innerText = "❌ خطأ";
  }

  document.getElementById("score").innerText = "النقاط: " + score;

  current++;

  if (current < questions.length) {
    setTimeout(loadQuestion, 1000);
  } else {
    document.getElementById("question").innerText = "🎉 انتهيت!";
    document.getElementById("answers").innerHTML = "";
  }
}

// أول تشغيل
window.addEventListener("load", loadQuestion);
