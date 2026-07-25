const display = document.querySelector('#display');
const buttons = document.querySelectorAll('button');

let currentInput = '0';
let previousValue = null;
let operator = null;
let shouldResetDisplay = false;

function updateDisplay() {
  display.textContent = currentInput;
}

function appendNumber(number) {
  if (shouldResetDisplay) {
    currentInput = '';
    shouldResetDisplay = false;
  }

  if (currentInput === '0' && number !== '.') {
    currentInput = number;
  } else {
    currentInput += number;
  }

  updateDisplay();
}

function appendDecimal() {
  if (shouldResetDisplay) {
    currentInput = '0';
    shouldResetDisplay = false;
  }

  if (!currentInput.includes('.')) {
    currentInput += '.';
  }

  updateDisplay();
}

function setOperator(nextOperator) {
  if (operator !== null && !shouldResetDisplay) {
    calculate();
  }

  previousValue = Number(currentInput);
  operator = nextOperator;
  shouldResetDisplay = true;
}

function calculate() {
  if (operator === null || previousValue === null) {
    return;
  }

  const currentValue = Number(currentInput);
  let result = 0;

  switch (operator) {
    case '+':
      result = previousValue + currentValue;
      break;
    case '-':
      result = previousValue - currentValue;
      break;
    case '*':
      result = previousValue * currentValue;
      break;
    case '/':
      result = previousValue / currentValue;
      break;
    default:
      return;
  }

  currentInput = String(result);
  previousValue = null;
  operator = null;
  shouldResetDisplay = true;
  updateDisplay();
}

function clearAll() {
  currentInput = '0';
  previousValue = null;
  operator = null;
  shouldResetDisplay = false;
  updateDisplay();
}

function deleteLast() {
  if (currentInput.length <= 1) {
    currentInput = '0';
  } else {
    currentInput = currentInput.slice(0, -1);
  }

  updateDisplay();
}

function percent() {
  currentInput = String(Number(currentInput) / 100);
  updateDisplay();
}

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const action = button.dataset.action;
    const value = button.dataset.value;

    if (action === 'number') {
      appendNumber(value);
      return;
    }

    if (action === 'decimal') {
      appendDecimal();
      return;
    }

    if (action === 'operator') {
      setOperator(value);
      return;
    }

    if (action === 'equals') {
      calculate();
      return;
    }

    if (action === 'clear') {
      clearAll();
      return;
    }

    if (action === 'delete') {
      deleteLast();
      return;
    }

    if (action === 'percent') {
      percent();
    }
  });
});

updateDisplay();
