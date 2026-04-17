// 📊 المتغيرات
let current = 0;
let score = 0;
let currentLevel = 1;

// 📚 جميع المستويات
const levels = {

  // 🟢 المستوى 1
  1: [
    {q:"2 + 1 = ?", a:[2,3,4], correct:3},
    {q:"3 + 2 = ?", a:[4,5,6], correct:5},
    {q:"5 - 2 = ?", a:[2,3,4], correct:3},
    {q:"6 - 1 = ?", a:[4,5,6], correct:5},
    {q:"4 + 3 = ?", a:[6,7,8], correct:7},
    {q:"7 - 3 = ?", a:[3,4,5], correct:4},
    {q:"1 + 6 = ?", a:[6,7,8], correct:7},
    {q:"9 - 4 = ?", a:[4,5,6], correct:5},
    {q:"2 + 5 = ?", a:[6,7,8], correct:7},
    {q:"8 - 2 = ?", a:[5,6,7], correct:6}
  ],

  // 🔵 المستوى 2 (جمع بالاحتفاظ)
  2: [
    {q:"8 + 7 = ?", a:[14,15,16], correct:15},
    {q:"9 + 6 = ?", a:[14,15,16], correct:15},
    {q:"12 + 8 = ?", a:[18,20,22], correct:20},
    {q:"14 + 7 = ?", a:[20,21,22], correct:21},
    {q:"16 + 5 = ?", a:[20,21,22], correct:21},
    {q:"20 - 5 = ?", a:[14,15,16], correct:15},
    {q:"18 - 6 = ?", a:[10,11,12], correct:12},
    {q:"25 - 7 = ?", a:[17,18,19], correct:18},
    {q:"30 - 9 = ?", a:[20,21,22], correct:21},
    {q:"22 - 8 = ?", a:[13,14,15], correct:14}
  ],

  // 🟣 المستوى 3
  3: [
    {q:"12 + 15 = ?", a:[25,27,30], correct:27},
    {q:"18 + 14 = ?", a:[30,32,34], correct:32},
    {q:"25 - 13 = ?", a:[10,11,12], correct:12},
    {q:"40 - 18 = ?", a:[20,21,22], correct:22},
    {q:"3 × 4 = ?", a:[10,11,12], correct:12},
    {q:"5 × 3 = ?", a:[12,15,18], correct:15},
    {q:"6 × 2 = ?", a:[10,12,14], correct:12},
    {q:"7 × 3 = ?", a:[20,21,22], correct:21},
    {q:"9 + 13 = ?", a:[20,21,22], correct:22},
    {q:"30 - 12 = ?", a:[16,18,20], correct:18}
  ],

  // 🟠 المستوى 4
  4: [
    {q:"45 - 27 = ?", a:[16,17,18], correct:18},
    {q:"63 - 28 = ?", a:[34,35,36], correct:35},
    {q:"12 × 3 = ?", a:[34,36,38], correct:36},
    {q:"15 × 4 = ?", a:[50,60,70], correct:60},
    {q:"23 × 2 = ?", a:[44,46,48], correct:46},
    {q:"36 × 2 = ?", a:[70,72,74], correct:72},
    {q:"50 - 19 = ?", a:[30,31,32], correct:31},
    {q:"70 - 25 = ?", a:[44,45,46], correct:45},
    {q:"18 × 2 = ?", a:[34,36,38], correct:36},
    {q:"21 × 3 = ?", a:[60,63,66], correct:63}
  ],

  // 🔴 المستوى 5
  5: [
    {q:"123 × 2 = ?", a:[244,246,248], correct:246},
    {q:"145 × 3 = ?", a:[430,435,440], correct:435},
    {q:"240 ÷ 2 = ?", a:[110,120,130], correct:120},
    {q:"360 ÷ 3 = ?", a:[100,110,120], correct:120},
    {q:"111 × 3 = ?", a:[300,333,360], correct:333},
    {q:"222 × 2 = ?", a:[440,444,448], correct:444},
    {q:"150 ÷ 5 = ?", a:[25,30,35], correct:30},
    {q:"200 ÷ 4 = ?", a:[40,50,60], correct:50},
    {q:"134 × 2 = ?", a:[266,268,270], correct:268},
    {q:"300 ÷ 3 = ?", a:[90,100,110], correct:100}
  ],

  // ⚫ المستوى 6
  6: [
    {q:"123 × 3 = ?", a:[360,369,372], correct:369},
    {q:"222 × 4 = ?", a:[880,888,900], correct:888},
    {q:"456 ÷ 3 = ?", a:[150,152,154], correct:152},
    {q:"600 ÷ 4 = ?", a:[140,150,160], correct:150},
    {q:"321 × 2 = ?", a:[640,642,644], correct:642},
    {q:"111 × 6 = ?", a:[660,666,670], correct:666},
    {q:"720 ÷ 6 = ?", a:[100,110,120], correct:120},
    {q:"840 ÷ 7 = ?", a:[110,120,130], correct:120},
    {q:"250 × 3 = ?", a:[700,750,800], correct:750},
    {q:"900 ÷ 9 = ?", a:[90,100,110], correct:100}
  ]

};


// 🚀 بدء المستوى
function startLevel(level){
  currentLevel = level;
  current = 0;
  score = 0;
  showQuestion();
}


// 📌 عرض السؤال
function showQuestion(){
  const q = levels[currentLevel][current];

  document.getElementById("question").innerText = q.q;

  const answersDiv = document.getElementById("answers");
  answersDiv.innerHTML = "";

  q.a.forEach(ans=>{
    const btn = document.createElement("button");
    btn.innerText = ans;
    btn.onclick = ()=>checkAnswer(ans);
    answersDiv.appendChild(btn);
  });
}


// ✅ التحقق من الجواب
function checkAnswer(answer){
  const correct = levels[currentLevel][current].correct;

  if(answer === correct){
    score++;
  }

  current++;

  if(current < 10){
    showQuestion();
  }else{
    alert("🎉 انتهيت!\nالنقاط: " + score + "/10");
  }
}
