// ----- isi pesan yang akan diketik -----
const lines = [
  "Sayang, semangat ya kerjanya hari ini ✨.",
  "Ingat: kamu kuat, kamu bisa, dan aku selalu dukung kamu ❤️.",
  "Kalau capek, istirahat sebentar dan ingat aku selalu nunggu kamu disini.",
  "Love u sayangkuuu cintakuuu."
];

const messageEl = document.getElementById("message");
const encourageBtn = document.getElementById("encourageBtn");
const surpriseBtn = document.getElementById("surpriseBtn");
const heartsContainer = document.getElementById("hearts");

let typing = false;

// simple typing effect that cycles through lines
function typeLines(arr, el, speed=28, pause=1500){
  if (typing) return;
  typing = true;
  el.textContent = "";
  let i = 0;

  function typeLine(lineIndex){
    el.textContent = "";
    const line = arr[lineIndex];
    let pos = 0;

    function step(){
      if (pos <= line.length){
        el.textContent = line.slice(0,pos) + (pos % 2 === 0 ? "▍" : "");
        pos++;
        setTimeout(step, speed);
      } else {
        // done typing this line
        el.textContent = line; // remove caret
        setTimeout(() => {
          // next line or finish
          i++;
          if (i < arr.length) {
            typeLine(i);
          } else {
            typing = false;
          }
        }, pause);
      }
    }
    step();
  }

  typeLine(i);
}

// spawn small floating hearts for fun
function spawnHeart(x = null){
  const heart = document.createElement("div");
  heart.className = "floating-heart";
  heart.textContent = "💖";
  const size = 14 + Math.random()*18;
  heart.style.fontSize = size + "px";
  const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
  const left = (x === null) ? (10 + Math.random() * (vw - 20)) : x;
  heart.style.left = left + "px";
  const bottomStart = 6 + Math.random() * 30;
  heart.style.bottom = bottomStart + "px";
  const duration = 2200 + Math.random()*1200;
  heart.style.animationDuration = duration + "ms";
  heartsContainer.appendChild(heart);

  // remove after animation
  setTimeout(()=> heart.remove(), duration + 50);
}

// on click: mulai typing dan sedikit hati
encourageBtn.addEventListener("click", () => {
  typeLines(lines, messageEl);
  // burst of hearts
  for (let i=0;i<14;i++){
    setTimeout(()=> spawnHeart(), i*80);
  }
});

// surprise: longer heart shower + custom message
surpriseBtn.addEventListener("click", () => {
  messageEl.textContent = "Kejutan romantis: kamu spesial banget buat aku 💕";
  // continuous hearts for 3 seconds
  let t = 0;
  const iv = setInterval(()=> {
    spawnHeart(Math.random() * window.innerWidth);
    t++;
    if (t > 45) clearInterval(iv);
  }, 75);
});

// also spawn a couple of hearts gently on load
window.addEventListener("load", () => {
  for (let i=0;i<6;i++){
    setTimeout(()=> spawnHeart(), i*220);
  }
});