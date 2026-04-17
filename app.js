const correctSound=new Audio("https://www.soundjay.com/buttons/sounds/button-3.mp3");
const wrongSound=new Audio("https://www.soundjay.com/buttons/sounds/button-10.mp3");

function launchConfetti(){
confetti({particleCount:120,spread:70});
}

let questions=[],current=0,score=0,currentLevel="";
let timer,timeLeft=10;

function navigate(id){
document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));
document.getElementById(id).classList.add("active");

document.querySelector(".topbar").style.display=
id.startsWith("level")?"none":"flex";

if(allQuestions[id]){
currentLevel=id;
questions=allQuestions[id];
startQuiz();
}
}

const allQuestions={
level1:[{q:"2+2=?",answers:[3,4,5],correct:4}],
level2:[{q:"5+5=?",answers:[9,10,11],correct:10}],
level3:[{q:"6×2=?",answers:[10,12,14],correct:12}],
level4:[{q:"52-27=?",answers:[23,25,27],correct:25}],
level5:[{q:"123×3=?",answers:[369,360,390],correct:369}],
level6:[{q:"123×45=?",answers:[5535,5525,5545],correct:5535}]
};

function startQuiz(){
current=0;score=0;loadQuestion();
}

function loadQuestion(){
let page=document.querySelector(".page.active");
let qEl=page.querySelector(".question");
let aEl=page.querySelector(".answers");
let progress=page.querySelector(".progress-bar");
let timerEl=page.querySelector(".timer");

qEl.innerText=questions[current].q;
aEl.innerHTML="";

progress.style.width=(current/questions.length*100)+"%";

timeLeft=10;
timerEl.innerText="⏱️ "+timeLeft;

clearInterval(timer);

timer=setInterval(()=>{
timeLeft--;
timerEl.innerText="⏱️ "+timeLeft;

if(timeLeft<=0){
clearInterval(timer);
check(null);
}
},1000);

questions[current].answers.forEach(a=>{
let btn=document.createElement("button");
btn.innerText=a;
btn.onclick=()=>check(a);
aEl.appendChild(btn);
});
}

function check(ans){
clearInterval(timer);

let page=document.querySelector(".page.active");
let result=page.querySelector(".result");

if(ans===questions[current].correct){
result.innerText="✅ صحيح";
score+=10;
correctSound.play();
}else{
result.innerText="❌ خطأ";
wrongSound.play();
}

current++;

setTimeout(()=>{
if(current<questions.length){
result.innerText="";
loadQuestion();
}else{
showFinalResult();
}
},1000);
}

function showFinalResult(){
let page=document.querySelector(".page.active");
let starsEl=page.querySelector(".stars");

let stars="";
if(score>=8){stars="⭐⭐⭐";launchConfetti();}
else if(score>=5){stars="⭐⭐";}
else{stars="⭐";}

starsEl.innerText=stars;

localStorage.setItem("done_"+currentLevel,true);
updateBadges();
}

function updateBadges(){
Object.keys(allQuestions).forEach(l=>{
let b=document.getElementById("badge-"+l);
if(b){
b.innerText=localStorage.getItem("done_"+l)?"🏆":"🔒";
}
});
}

window.onload=function(){
navigate("home");
document.getElementById("startBtn").onclick=()=>navigate("levels");
updateBadges();
};
