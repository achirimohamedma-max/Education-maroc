// 🎮 Player
let player = {
xp: 0,
level: 1
};

// 🏆 Ranking
let ranking = JSON.parse(localStorage.getItem("ranking")) || [];

// 📊 Variables
let current = 0;
let score = 0;
let currentLevel = 1;
let timer;
let timeLeft = 10;

// 📚 Questions
const levels = {
1:[
{q:"2+2=?",a:[3,4,5],correct:4},
{q:"3+2=?",a:[4,5,6],correct:5},
{q:"5-2=?",a:[2,3,4],correct:3},
{q:"6-1=?",a:[4,5,6],correct:5},
{q:"4+3=?",a:[6,7,8],correct:7},
{q:"7-3=?",a:[3,4,5],correct:4},
{q:"1+6=?",a:[6,7,8],correct:7},
{q:"9-4=?",a:[4,5,6],correct:5},
{q:"2+5=?",a:[6,7,8],correct:7},
{q:"8-2=?",a:[5,6,7],correct:6}
]
};

// 🚀 Start
startLevel(1);

function startLevel(level){
currentLevel=level;
current=0;
score=0;
player.xp=0;
showQuestion();
}

// ⏱️ Timer
function startTimer(){
clearInterval(timer);
timeLeft=10;

document.getElementById("timer").innerText=timeLeft;

timer=setInterval(()=>{
timeLeft--;
document.getElementById("timer").innerText=timeLeft;

if(timeLeft<=0){
clearInterval(timer);
next();
}
},1000);
}

// 📌 Show question
function showQuestion(){
startTimer();

let q=levels[currentLevel][current];
document.getElementById("question").innerText=q.q;

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

// ✅ Check
function checkAnswer(ans){
clearInterval(timer);

let correct=levels[currentLevel][current].correct;

if(ans===correct){
score++;
player.xp+=10;

document.getElementById("correctSound").play();

confetti({
particleCount:100,
spread:70
});

}else{
player.xp+=2;
document.getElementById("wrongSound").play();
}

updatePlayer();
next();
}

// 🎮 Level system
function updatePlayer(){
document.getElementById("xp").innerText=player.xp;

if(player.xp>=50){
player.level++;
document.getElementById("playerLevel").innerText=player.level;
}
}

// ➡️ Next
function next(){
current++;

if(current<10){
showQuestion();
}else{
endGame();
}
}

// 🏅 Badge
function getBadge(level){
const badges={
1:"🥉 مبتدئ",
2:"🥈 متعلم",
3:"🥇 متفوق",
4:"🏅 محترف",
5:"🏆 بطل",
6:"👑 أسطورة"
};
return badges[level];
}

// 🏁 End
function endGame(){
let name=prompt("اسمك؟");

ranking.push({
name:name||"لاعب",
score:score
});

ranking.sort((a,b)=>b.score-a.score);

localStorage.setItem("ranking",JSON.stringify(ranking.slice(0,5)));

alert(
"🎉 انتهيت!\n" +
"النقاط: "+score+"/10\n" +
"🏅 "+getBadge(currentLevel)
);
}
