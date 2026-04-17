// 🎮 PLAYER
let player = {
  xp: 0,
  level: 1
};

// 🏆 Ranking (LocalStorage)
let ranking = JSON.parse(localStorage.getItem("ranking")) || [];

// 📊 VARIABLES
let current = 0;
let score = 0;
let currentLevel = 1;
let timer;
let timeLeft = 10;

// 📚 الأسئلة (نفس لي عطيتك قبل)
const levels = { /* خليه كيف هو */ };

// 🚀 START
function startLevel(level){
  currentLevel = level;
  current = 0;
  score = 0;
  player.xp = 0;
  updatePlayer();
  showQuestion();
}

// ⏱️ TIMER
function startTimer(){
  clearInterval(timer);
  timeLeft = 10;

  document.getElementById("timer").innerText = timeLeft;

  timer = setInterval(()=>{
    timeLeft--;
    document.getElementById("timer").innerText = timeLeft;

    if(timeLeft <= 0){
      current++;
      if(current < 10){
        showQuestion();
      }else{
        endGame();
      }
    }
  },1000);
}

// 📌 SHOW QUESTION
function showQuestion(){
  startTimer();

  const q = levels[currentLevel][current];

  document.getElementById("question").innerText = q.q;

  const answersDiv = document.getElementById("answers");
  answersDiv.innerHTML = "";

  q.a.forEach(ans=>{
    const btn = document.createElement("button");
    btn.className = "answer-btn";
    btn.innerText = ans;
    btn.onclick = ()=>checkAnswer(ans);
    answersDiv.appendChild(btn);
  });
}

// ✅ CHECK
function checkAnswer(answer){
  const correct = levels[currentLevel][current].correct;

  if(answer === correct){
    score++;
    player.xp += 10;
  }else{
    player.xp += 2;
  }

  levelUp();
  updatePlayer();

  current++;

  if(current < 10){
    showQuestion();
  }else{
    endGame();
  }
}

// 🎮 LEVEL UP
function levelUp(){
  if(player.xp >= player.level * 50){
    player.level++;
    alert("🔥 ارتقيت للمستوى " + player.level);
  }
}

// 📊 UPDATE UI
function updatePlayer(){
  document.getElementById("xp").innerText = player.xp;
  document.getElementById("playerLevel").innerText = player.level;
}

// 🏁 END GAME
function endGame(){
  clearInterval(timer);

  const name = prompt("دخل اسمك:");

  ranking.push({
    name: name || "لاعب",
    score: score
  });

  ranking.sort((a,b)=>b.score - a.score);
  ranking = ranking.slice(0,5);

  localStorage.setItem("ranking", JSON.stringify(ranking));

  showRanking();
}

// 🏆 SHOW RANKING
function showRanking(){
  let text = "🏆 الترتيب:\n\n";

  ranking.forEach((p,i)=>{
    text += `${i+1}. ${p.name} - ${p.score}/10\n`;
  });

  alert(text);
}
