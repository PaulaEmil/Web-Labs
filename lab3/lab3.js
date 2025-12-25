const display = document.getElementById('display');
const clrbutton = document.queryselector('#unique');
function appendChar(char) {
  display.value += char;
}

function clearDisplay() {
  display.value = '';
}

function deleteChar() {
  display.value = display.value.slice(0, -1);
}

function calculate() {
  try {
    display.value = eval(display.value);
  } catch (error) {
    display.value = 'Error';
  }
}
clrbutton.addEventListener('click', clearDisplay);
