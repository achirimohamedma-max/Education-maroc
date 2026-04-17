const correctSound=new Audio("https://www.soundjay.com/buttons/sounds/button-3.mp3");
const wrongSound=new Audio("https://www.soundjay.com/buttons/sounds/button-10.mp3");

function launchConfetti(){
confetti({particleCount:120,spread:70});
}

let player={
name:"تلميذ",
xp:parseInt(localStorage.getItem("xp"))||0
};

function savePlayer(){
localStorage.setItem("xp",player.xp);
}

function getLevel(){
return Math.floor(player.xp/100)+1;
}

const allQuestions={
level1:[{q:"2+3=?",answers:[4,5,6],correct:5},{q:"5-2=?",answers:[2,3,4],correct:3},{q:"4+1=?",answers:[4,5,6],correct:5},{q:"7-3=?",answers:[3,4,5],correct:4},{q:"6+2=?",answers:[7,8,9],correct:8},{q:"9-5=?",answers:[3,4,5],correct:4},{q:"3+3=?",answers:[5,6,7],correct:6},{q:"8-6=?",answers:[1,2,3],correct:2},{q:"4+4=?",answers:[7,8,9],correct:8},{q:"10-7=?",answers:[2,3,4],correct:3}],
level2:[{q:"12+8=?",answers:[18,20,22],correct:20},{q:"15+7=?",answers:[20,22,23],correct:22},{q:"23+9=?",answers:[30,31,32],correct:32},{q:"18-5=?",answers:[12,13,14],correct:13},{q:"20-9=?",answers:[10,11,12],correct:11},{q:"14+6=?",answers:[18,20,21],correct:20},{q:"27+5=?",answers:[30,32,33],correct:32},{q:"19-8=?",answers:[10,11,12],correct:11},{q:"16+7=?",answers:[22,23,24],correct:23},{q:"25-6=?",answers:[18,19,20],correct:19}],
level3:[{q:"6×4=?",answers:[20,24,28],correct:24},{q:"7×5=?",answers:[30,35,40],correct:35},{q:"8×3=?",answers:[24,26,28],correct:24},{q:"5×6=?",answers:[28,30,32],correct:30},{q:"9×2=?",answers:[16,18,20],correct:18},{q:"4×7=?",answers:[26,28,30],correct:28},{q:"3×8=?",answers:[22,24,26],correct:24},{q:"6×6=?",answers:[34,36,38],correct:36},{q:"7×4=?",answers:[26,28,30],correct:28},{q:"5×5=?",answers:[20,25,30],correct:25}],
level4:[{q:"46×3=?",answers:[138,140,150],correct:138},{q:"25×4=?",answers:[90,100,110],correct:100},{q:"34×5=?",answers:[160,170,180],correct:170},{q:"48×2=?",answers:[86,96,106],correct:96},{q:"36×3=?",answers:[98,108,118],correct:108},{q:"27×4=?",answers:[100,108,120],correct:108},{q:"19×5=?",answers:[90,95,100],correct:95},{q:"16×6=?",answers:[90,96,102],correct:96},{q:"22×3=?",answers:[60,66,70],correct:66},{q:"31×2=?",answers:[60,62,64],correct:62}],
level5:[{q:"123×4=?",answers:[480,492,500],correct:492},{q:"234×3=?",answers:[690,702,720],correct:702},{q:"456÷3=?",answers:[150,152,154],correct:152},{q:"369÷3=?",answers:[120,123,126],correct:123},{q:"128×5=?",answers:[620,640,650],correct:640},{q:"345×2=?",answers:[680,690,700],correct:690},{q:"864÷4=?",answers:[200,216,224],correct:216},{q:"735÷5=?",answers:[145,147,150],correct:147},{q:"219×3=?",answers:[650,657,660],correct:657},{q:"144÷3=?",answers:[46,48,50],correct:48}],
level6:[{q:"123×45=?",answers:[5535,5525,5545],correct:5535},{q:"234×56=?",answers:[13000,13104,13200],correct:13104},{q:"345×23=?",answers:[7935,7945,7955],correct:7935},{q:"456÷12=?",answers:[36,38,40],correct:38},{q:"789÷3=?",answers:[260,263,266],correct:263},{q:"678×12=?",answers:[8120,8136,8140],correct:8136},{q:"900÷15=?",answers:[50,60,70],correct:60},{q:"321×14=?",answers:[4494,4500,4510],correct:4494},{q:"640÷8=?",answers:[70,80,90],correct:80},{q:"512÷16=?",answers:[30,32,34],correct:32}]
};

let questions=[],current=0,score=0,currentLevel="";
let timer,timeLeft=10;

function navigate(id){
document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));
document.getElementById(id).classList.add("active");

document.querySelector(".topbar").style.display=id.startsWith("level")?"none":"flex";

if(id==="ranking") showRanking();

if(allQuestions[id]){
currentLevel=id;
questions=allQuestions[id];
startQuiz();
}
}

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
if(timeLeft<=0){clearInterval(timer);check(null);}
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
player.xp+=10;
savePlayer();
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
let scoreEl=page.querySelector(".score");

let stars="";
if(score>=80){stars="⭐⭐⭐";launchConfetti();}
else if(score>=50){stars="⭐⭐";}
else{stars="⭐";}

starsEl.innerText=stars;
scoreEl.innerText="النقاط: "+score;

saveRanking();
}

function saveRanking(){
let ranking=JSON.parse(localStorage.getItem("ranking"))||[];
ranking.push({name:player.name,xp:player.xp});
ranking.sort((a,b)=>b.xp-a.xp);
localStorage.setItem("ranking",JSON.stringify(ranking.slice(0,10)));
}

function showRanking(){
let list=document.getElementById("rankingList");
let ranking=JSON.parse(localStorage.getItem("ranking"))||[];
list.innerHTML="";
ranking.forEach((p,i)=>{
let div=document.createElement("div");
div.className="rank-item";
div.innerText=`${i+1} - ${p.name} | ${p.xp} XP`;
list.appendChild(div);
});
}

window.onload=function(){
navigate("home");
document.getElementById("startBtn").onclick=()=>navigate("levels");
};
