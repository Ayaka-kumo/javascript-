const questionEl = document.querySelector('#question');
const choicesEl = document.querySelector('#choices');
const nextBtn = document.querySelector('#next-btn');
const restartBtn = document.querySelector('#restart-btn');
const progressEl = document.querySelector('#progress');
const resultEl = document.querySelector('#result');

const questions = [
  {
    question: 'JavaScriptで変数を宣言するキーワードはどれ？',
    choices: ['var', 'let', 'const', 'すべて使える'],
    answerIndex: 3,
  },
  {
    question: '配列の最初の要素は何番？',
    choices: ['1', '0', '-1', 'どれでもない'],
    answerIndex: 1,
  },
  {
    question: '次のうち「オブジェクト」でないものは？',
    choices: ['{}', '[]', 'function(){}', 'new Date()'],
    answerIndex: 1,
  },
];

let currentIndex = 0;
let score = 0;
let answered = false;

function startQuiz() {
  currentIndex = 0;
  score = 0;
  resultEl.hidden = true;
  restartBtn.hidden = true;
  nextBtn.disabled = true;
  showQuestion();
}

function showQuestion() {
  const current = questions[currentIndex];
  questionEl.textContent = current.question;
  choicesEl.innerHTML = '';
  current.choices.forEach((text, i) => {
    const btn = document.createElement('button');
    btn.className = 'choice';
    btn.textContent = text;
    btn.dataset.index = i;
    btn.addEventListener('click', () => selectChoice(i, btn));
    choicesEl.appendChild(btn);
  });

  progressEl.textContent = `${currentIndex + 1} / ${questions.length}`;
  answered = false;
  nextBtn.disabled = true;
}

function selectChoice(index, btn) {
  if (answered) return;
  answered = true;
  const correct = questions[currentIndex].answerIndex;
  // mark choices
  const buttons = choicesEl.querySelectorAll('button');
  buttons.forEach((b) => (b.disabled = true));

  if (index === correct) {
    btn.classList.add('correct');
    score += 1;
  } else {
    btn.classList.add('wrong');
    // highlight correct
    const correctBtn = choicesEl.querySelector(`[data-index="${correct}"]`);
    if (correctBtn) correctBtn.classList.add('correct');
  }

  nextBtn.disabled = false;
}

nextBtn.addEventListener('click', () => {
  currentIndex += 1;
  if (currentIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
});

restartBtn.addEventListener('click', startQuiz);

function showResult() {
  questionEl.textContent = '結果';
  choicesEl.innerHTML = '';
  resultEl.hidden = false;
  resultEl.textContent = `あなたのスコア: ${score} / ${questions.length}`;
  restartBtn.hidden = false;
  nextBtn.disabled = true;
}

// start immediately
startQuiz();
