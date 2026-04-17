// Questions بسيطة
const levels = {
1:[
{q:"2+2=?",a:[3,4,5],correct:4},
{q:"3+1=?",a:[3,4,5],correct:4}
]
};

let current = 0;
let currentLevel = 1;

// 🔥 الدخول للمستوى
function goLevel(level){
  startLevel(level);
}

// 🚀 بداية المستوى
function startLevel(level){
  currentLevel = level;
  current = 0;

  document.getElementById("map").style.display="none";
  document.getElementById("quiz").style.display="block";

  showQuestion();
}

// 📌 عرض السؤال
function showQuestion(){
  let q = levels[currentLevel][current];

  document.getElementById("question").innerText = q.q;

  let answers = document.getElementById("answers");
  answers.innerHTML = "";

  q.a.forEach(ans=>{
    let btn = document.createElement("button");
    btn.className = "answer-btn";
    btn.innerText = ans;

    btn.onclick = ()=>{
      next();
    };

    answers.appendChild(btn);
  });
}

// ➡️ السؤال التالي
function next(){
  current++;

  if(current < levels[currentLevel].length){
    showQuestion();
  }else{
    alert("🏁 انتهى المستوى");
    backToMap();
  }
}

// 🔙 رجوع
function backToMap(){
  document.getElementById("map").style.display="block";
  document.getElementById("quiz").style.display="none";
}

// 🏠 الرئيسية
function goHome(){
  backToMap();
}
