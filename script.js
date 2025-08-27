const cards = [
  {
  term: "巴納姆效應",
  hint: ["心理學", "物理學", "占星術"],
  meaning: "人傾向接受模糊、普遍的描述為準確形容自己，常見於星座或心理測驗解釋。"
},
{
  term: "卡尼曼陷阱",
  hint: ["心理學", "經濟學", "氣象學"],
  meaning: "人類在做決策時更容易記住極端與結局，而非完整過程，常影響消費者體驗評價。"
},
  {
    term: "倒插門",
    hint: ["建築", "婚姻", "儀式"],
    meaning: "指男子嫁入女方家並改隨女姓，為舊式婚姻模式。"
  },
  {
    term: "打漏風",
    hint: ["建築", "心理", "醫療"],
    meaning: "形容說話沒遮掩、洩漏秘密。"
  },
  {
    term: "鳳眼果",
    hint: ["水果", "動物", "生藥"],
    meaning: "龍眼的古文名稱，常見於詩詞，日常少用。"
  },
  {
  term: "雞尾酒會效應",
  hint: ["心理學", "飲食", "社交禮儀"],
  meaning: "即使在嘈雜環境中，大腦能專注聆聽特定訊息，如自己的名字。"
},
  {
  term: "反應釜",
  hint: ["化學工程", "烹飪", "音響設備"],
  meaning: "用於化工反應的密閉容器，可耐高溫高壓，用來進行合成、聚合等過程。"
},
{
  term: "日冕質量拋射",
  hint: ["天文學", "醫學", "電影特效"],
  meaning: "太陽釋放的高速等離子體事件，會影響地球磁場並導致極光現象。"
},
{
  term: "超臨界流體",
  hint: ["物理化學", "時尚設計", "攝影"],
  meaning: "指在臨界溫壓以上，兼具液體與氣體性質的物質，應用於萃取技術。"
},
{
  term: "語意飽和",
  hint: ["語言學", "營養學", "文學"],
  meaning: "重複唸一個詞會讓人暫時失去其意義感，屬語言知覺的心理現象。"
},
{
  term: "卡邁克循環",
  hint: ["熱力學", "交通設計", "腸胃醫學"],
  meaning: "一種可逆熱機理論模型，追求最高熱效率，屬於理論物理範疇。"
},
{
  term: "裂解塔",
  hint: ["石化工業", "醫療器械", "考古學"],
  meaning: "用於石油裂解的裝置，使大型分子分裂成小型分子，如乙烯。"
},
{
  term: "密碼子",
  hint: ["分子生物學", "密碼學", "神秘學"],
  meaning: "RNA 中每三個核苷酸組成的密碼，決定生成的胺基酸。"
},
{
  term: "拉格朗日點",
  hint: ["天體力學", "繪畫技法", "統計學"],
  meaning: "在兩天體間產生平衡力點，衛星可停駐於該點穩定運行。"
},
{
  term: "臨界角",
  hint: ["光學", "幾何", "攝影"],
  meaning: "光線在介質中入射超過某角度時會產生全反射，此角稱為臨界角。"
},
{
  term: "波氏數字",
  hint: ["心理學", "數學", "生物學"],
  meaning: "指人類短期記憶容量約為 7 ± 2，超過即難以保留訊息。"
},
  {
    term: "金水",
    hint: ["煉金術", "命理", "遊戲"],
    meaning: "狼人殺遊戲用語，指被預言家驗證為好人的人，為遊戲中角色關係的專用詞。"
  },
  {
    term: "走水",
    hint: ["消防", "烹飪", "宗教"],
    meaning: "建築或地點發生火災的俗稱。"
  },
  {
  term: "飛白書",
  hint: ["書法", "宗教", "地理"],
  meaning: "書法技法之一，筆觸中留有白痕，如飛雪狀，出現於漢代。"
},
{
  term: "形上學",
  hint: ["哲學", "醫學", "工程學"],
  meaning: "研究存在、實體、宇宙本源等超越經驗的學問，屬哲學分支。"
},
  {
    term: "撒豆成兵",
    hint: ["民俗", "軍事", "農業"],
    meaning: "傳說中將豆子撒地變成士兵，多用於形容神力或虛構戰術。"
  }
];

let currentCardIndex = 0;
let roles = [];
let revealed = {};
let locked = {};
let meaningVisible = false;
let currentlyRevealing = null;

function drawNewCard() {
  currentCardIndex = Math.floor(Math.random() * cards.length);
  const card = cards[currentCardIndex];
  document.getElementById("term").innerText = card.term;
  document.getElementById("hint").innerText = `提示：${card.hint.join("、")}`;
  document.getElementById("meaning").innerText = `👉 正解：${card.meaning}`;
  document.getElementById("meaning").classList.add("hidden");
  meaningVisible = false;
}

function toggleMeaning() {
  meaningVisible = !meaningVisible;
  document.getElementById("meaning").classList.toggle("hidden", !meaningVisible);
}

function assignRoles(total) {
  const temp = Array(total).fill("C");
  const a = Math.floor(Math.random() * total);
  let b = Math.floor(Math.random() * total);
  while (b === a) b = Math.floor(Math.random() * total);
  temp[a] = "A";
  temp[b] = "B";
  return temp;
}

function setupPlayers() {
  const count = parseInt(document.getElementById("playerCount").value);
  if (isNaN(count) || count < 3) return;
  roles = assignRoles(count);
  revealed = {};
  locked = {};
  currentlyRevealing = null;
  const container = document.getElementById("playerButtons");
  container.innerHTML = "";
  for (let i = 0; i < count; i++) {
    const btn = document.createElement("button");
    btn.innerText = `玩家 ${i + 1}`;
    btn.id = `player-btn-${i}`;
    btn.onclick = () => togglePlayerRole(i);
    container.appendChild(btn);
  }
  document.getElementById("privateRoleDisplay").classList.add("hidden");
  document.getElementById("confirmHint").classList.add("hidden");
}

function togglePlayerRole(index) {
  const display = document.getElementById("privateRoleDisplay");
  const hint = document.getElementById("confirmHint");
  const btn = document.getElementById(`player-btn-${index}`);

  if (currentlyRevealing !== null && currentlyRevealing !== index) return;

  if (!revealed[index]) {
    const role = roles[index];
    let text = role === "A" ? "大聰明" :
               role === "B" ? "老實人" :
               "瞎掰者";
    display.innerText = text;
    display.classList.remove("hidden");
    hint.classList.remove("hidden");
    revealed[index] = true;
    currentlyRevealing = index;
    btn.classList.add("viewing");
  } else {
    display.classList.add("hidden");
    hint.classList.add("hidden");
    locked[index] = true;
    btn.classList.remove("viewing");
    btn.classList.add("locked");
    btn.innerText = `玩家 ${index + 1}`;
    currentlyRevealing = null;

    if (Object.keys(locked).length === roles.length) {
      for (let i = 0; i < roles.length; i++) {
        const b = document.getElementById(`player-btn-${i}`);
        b.classList.remove("locked");
        b.classList.remove("viewing");
        b.innerText = `玩家 ${i + 1}`;
        revealed[i] = false;
        locked[i] = false;
      }
    }
  }
}

function restartGame() {
  // 保留原本輸入的人數，不要重設成 6
  const count = parseInt(document.getElementById("playerCount").value);
  if (!isNaN(count) && count >= 3) {
    roles = assignRoles(count);
  }

  document.getElementById("playerButtons").innerHTML = "";
  document.getElementById("privateRoleDisplay").classList.add("hidden");
  document.getElementById("confirmHint").classList.add("hidden");

  revealed = {};
  locked = {};
  currentlyRevealing = null;

  drawNewCard();
}

drawNewCard();


function toggleRules() {
  document.getElementById("rulesModal").classList.toggle("hidden");
  document.getElementById("rulesBackdrop").classList.toggle("hidden");
}
