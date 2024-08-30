let display = document.getElementById("display");
let currentInput = "";
let colorPicker = document.getElementById("colorPicker");

function appendToDisplay(value) {
  if (currentInput === "0" && value !== ".") {
    currentInput = value;
  } else {
    currentInput += value;
  }
  updateDisplay();
}

function clearDisplay() {
  currentInput = "0";
  updateDisplay();
}

function calculate() {
  try {
    currentInput = eval(currentInput).toString();
  } catch (error) {
    currentInput = "Error";
  }
  updateDisplay();
}

function updateDisplay() {
  display.textContent = currentInput;
}

// Add keyboard support
document.addEventListener("keydown", (event) => {
  const key = event.key;
  if (/[0-9\+\-\*\/\(\)\.=]/.test(key)) {
    event.preventDefault();
    if (key === "=") {
      calculate();
    } else {
      appendToDisplay(key);
    }
  } else if (key === "Enter") {
    event.preventDefault();
    calculate();
  } else if (key === "Backspace") {
    event.preventDefault();
    currentInput = currentInput.slice(0, -1);
    if (currentInput === "") {
      currentInput = "0";
    }
    updateDisplay();
  } else if (key === "Escape") {
    event.preventDefault();
    clearDisplay();
  }
});


function triggerGlitch() {
  display.classList.add("glitch");
  setTimeout(() => {
    display.classList.remove("glitch");
  }, 1000);
}

const originalCalculate = calculate;
calculate = function () {
  triggerGlitch();
  originalCalculate();
};


colorPicker.addEventListener("input", function () {
  document.documentElement.style.setProperty("--main-color", this.value);
});
