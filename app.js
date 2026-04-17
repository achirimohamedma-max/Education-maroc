// Player
let player = {
  xp: parseInt(localStorage.getItem("xp")) || 0,
  level: Math.floor((parseInt(localStorage.getItem("xp"))||0)/50)+1
};

// Ranking
let ranking = JSON.parse(localStorage.getItem("ranking")) || [];

// Game vars
let current=0, score=0, currentLevel=1;
let timer, timeLeft=10;
let lives=3;
let correctAnswers=0;
let dailyGoal=5;

// Questions (اختصرنا – كل مستوى 10)
const levels={
1:[{q:"2+2=?",a:[3,4,5],correct:4},{q:"3+2=?",a:[4,5,6],correct:5},{q:"5-2=?",a:[2,3,4],correct:3},{q:"6-1=?",a:[4,5,6],correct:5},{q:"4+3=?",a:[6,7,8],correct:7},{q:"7-3=?",a:[3,4,5],correct:4},{q:"1+6=?",a:[6,7,8],correct:7},{q:"9-4=?",a:[4,5,6],correct:5},{q:"2+5=?",a:[6,7,8],correct:7},{q:"8-2=?",a:[5,6,7],correct:6}],
2:[{q:"8+7=?",a:[14,15,16],correct:15},{q:"9+6=?",a:[14,15,16],correct:15},{q:"12+8=?",a:[18,20,22],correct:20},{q:"14+7=?",a:[20,21,22],correct:21},{q:"16+5=?",a:[20,21,22],correct:21},{q:"20-5=?",a:[14,15,16],correct:15},{q:"18-6=?",a:[10,11,12],correct:12},{q:"25-7=?",a:[17,18,19],correct:18},{q:"30-9=?",a:[20,21,22],correct:21},{q:"22-8=?",a:[13,14,15],correct:14}],
3:[{q:"3×4=?",a:[10,11,12],correct:12},{q:"5×3=?",a:[12,15,18],correct:15},{q:"6×2=?",a:[10,12,14],correct:12},{q:"7×3=?",a:[20,21,22],correct:21},{q:"8×3=?",a:[24,26,28],correct:24},{q:"5×6=?",a:[28,30,32],correct:30},{q:"9×2=?",a:[16,18,20],correct:18},{q:"4×7=?",a:[26,28,30],correct:28},{q:"3×8=?",a:[22,24,26],correct:24},{q:"6×6=?",a:[34,36,38],correct:36}],
4:[{q:"12×3=?",a:[34,36,38],correct:36},{q:"15×4=?",a:[50,60,70],correct:60},{q:"23×2=?",a:[44,46,48],correct:46},{q:"36×2=?",a:[70,72,74],correct:72},{q:"18×2=?",a:[34,36,38],correct:36},{q:"21×3=?",a:[60,63,66],correct:63},{q:"27×4=?",a:[100,108,120],correct:108},{q:"19×5=?",a:[90,95,100],correct:95},{q:"16×6=?",a:[90,96,102],correct:96},{q:"22×3=?",a:[60,66,70],correct:66}],
5:[{q:"123×2=?",a:[244,246,248],correct:246},{q:"145×3=?",a:[430,435,440],correct:435},{q:"240÷2=?",a:[110,120,130],correct:120},{q:"360÷3=?",a:[100,110,120],correct:120},{q:"111×3=?",a:[300,333,360],correct:333},{q:"222×2=?",a:[440,444,448],correct:444},{q:"150÷5=?",a:[25,30,35],correct:30},{q:"200÷4=?",a:[40,50,60],correct:50},{q:"134×2=?",a:[266,268,270],correct:268},{q:"300÷3=?",a:[90,100,110],correct:100}],
6:[{q:"123×3=?",a:[360,369,372],correct:369},{q:"222×4=?",a:[880,888,900],correct:888},{q:"456÷3=?",a:[150,152,154],correct:152},{q:"600÷4=?",a:[140,150,160],correct:150},{q:"321×2=?",a:[640,642,644],correct:642},{q:"111×6=?",a:[660,666,670],correct:666},{q:"720÷6=?",a:[100,110,120],correct:120},{q:"840÷7=?",a:[110,120,130],correct:120},{q:"250×3=?",a:[700,750,800],correct:750},{q:"900÷9=?",a:[90,100,110],correct:100}]
};

// Start level
function startLevel(level){
  document.getElementById("map").style.display="none";
  document.getElementById("quiz").style.display="block";

  currentLevel=level;
  current=0; score=0;
  lives=3; correctAnswers=0;

  updateUI();
  showQuestion();
}

function backToMap(){
  document.getElementById("map").style.display="block";
  document.getElementById("quiz").style.display="none";
}

// Timer
function startTimer(){
  clearInterval(timer);
  timeLeft=10;
  document.getElementById("timer").innerText=timeLeft;

  timer=setInterval(()=>{
    timeLeft--;
    document.getElementById("timer").innerText=timeLeft;
    if(timeLeft<=0){ clearInterval(timer); next(); }
  },1000);
}

// Show question
function showQuestion(){
  startTimer();

  let q=levels[currentLevel][current];
  document.getElementById("question").innerText=q.q;

  document.getElementById("progressBar").style.width=(current/10*100)+"%";

  let answers=document.getElementById("answers");
  answers.innerHTML="";

  q.a.forEach(ans=>{
    let btn=document.createElement("button");
    btn.className="answer-btn";
    btn.innerText=ans;
    btn.onclick=()=>checkAnswer(ans);
    answers.appendChild(btn);
  });
}

// Check
function checkAnswer(ans){
  clearInterval(timer);
  let correct=levels[currentLevel][current].correct;

  if(ans===correct){
    score++; correctAnswers++;
    player.xp+=10;
    document.getElementById("correctSound").play();
    confetti({particleCount:80,spread:60});
  }else{
    lives--;
    document.getElementById("wrongSound").play();
    if(lives<=0){ alert("💀 انتهت القلوب!"); endGame(); return; }
  }

  updateUI();
  next();
}

// Next
function next(){
  current++;
  if(current<10) setTimeout(showQuestion,500);
  else endGame();
}

// UI
function updateUI(){
  document.getElementById("xp").innerText=player.xp;
  document.getElementById("playerLevel").innerText=Math.floor(player.xp/50)+1;
  document.getElementById("lives").innerText=lives;
}

// End
function endGame(){
  let badge = getBadge(score);

  if(score>=5){
    localStorage.setItem("level"+currentLevel,"done");
  }

  let name = prompt("اسمك؟");

  ranking.push({name:name||"لاعب",score:score});
  ranking.sort((a,b)=>b.score-a.score);
  localStorage.setItem("ranking",JSON.stringify(ranking.slice(0,5)));

  if(correctAnswers>=dailyGoal){
    alert("🎯 أكملت المهمة اليومية!");
  }

  alert("🏁 النتيجة: "+score+"/10\n🏅 "+badge);

  backToMap();
  unlockLevels();
}

// Badges
function getBadge(score){
  if(score===10) return "👑 عبقري";
  if(score>=8) return "🏆 بطل";
  if(score>=5) return "🥇 جيد جدا";
  return "🥉 حاول مرة أخرى";
}

// Unlock
function unlockLevels(){
  for(let i=2;i<=6;i++){
    let prev=localStorage.getItem("level"+(i-1));
    let el=document.getElementById("lvl"+i);
    if(!el) continue;
    if(prev==="done") el.classList.add("done");
    else el.classList.add("locked");
  }
}
function goLevel(l){
  if(l===1 || localStorage.getItem("level"+(l-1))==="done") startLevel(l);
  else alert("🔒 كمل المستوى السابق");
}

window.onload=()=>unlockLevels();
