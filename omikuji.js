const button = document.querySelector('#draw-button');
const result = document.querySelector('#result');

const fortunes = ['大吉', '中吉', '小吉', '吉', '凶'];

function drawFortune() {
  const randomIndex = Math.floor(Math.random() * fortunes.length);
  const fortune = fortunes[randomIndex];
  result.textContent = `今日の運勢は${fortune}です！`;
}

button.addEventListener('click', drawFortune);
