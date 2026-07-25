const buttons = document.querySelectorAll('.choice-btn');
const playerChoiceText = document.querySelector('#player-choice');
const computerChoiceText = document.querySelector('#computer-choice');
const message = document.querySelector('#message');

const choices = ['rock', 'paper', 'scissors'];

function getComputerChoice() {
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

function getResult(player, computer) {
  if (player === computer) {
    return '引き分けです';
  }

  if (
    (player === 'rock' && computer === 'scissors') ||
    (player === 'paper' && computer === 'rock') ||
    (player === 'scissors' && computer === 'paper')
  ) {
    return 'あなたの勝ちです';
  }

  return 'あなたの負けです';
}

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const playerChoice = button.dataset.choice;
    const computerChoice = getComputerChoice();
    const result = getResult(playerChoice, computerChoice);

    playerChoiceText.textContent = playerChoice;
    computerChoiceText.textContent = computerChoice;
    message.textContent = result;
  });
});
