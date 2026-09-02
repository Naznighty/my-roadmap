const display = document.getElementById("display");

const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator:not(#equal)");

const equalButton = document.getElementById("equal");
const clearButton = document.getElementById("clear");
const backspaceButton = document.getElementById("backspace");
const signButton = document.getElementById("sign");

let firstNumber = "";
let secondNumber = "";
let operator = "";

function updateDisplay() {
  if (operator === "") {
    display.value = firstNumber || "0";
  } else {
    display.value = secondNumber || firstNumber || "0";
  }
}

numberButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const value = button.textContent;

    if (value === ".") {
      if (operator === "" && firstNumber.includes(".")) return;
      if (operator !== "" && secondNumber.includes(".")) return;
    }

    if (operator === "") {
      firstNumber += value;
    } else {
      secondNumber += value;
    }

    updateDisplay();
  });
});

operatorButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    if (firstNumber === "") return;

    if (operator !== "" && secondNumber !== "") {
      const result = calculate(
        Number(firstNumber),
        Number(secondNumber),
        operator,
      );
      firstNumber = String(result);
      secondNumber = "";
    }

    operator = symbolToOperator(button.textContent);
    updateDisplay();
  });
});

function symbolToOperator(symbol) {
  if (symbol === "×") return "*";
  if (symbol === "÷") return "/";
  if (symbol === "−") return "-";
  if (symbol === "+") return "+";
  if (symbol === "%") return "%";
  return symbol;
}

function calculate(num1, num2, operator) {
  if (operator === "+") return num1 + num2;
  if (operator === "-") return num1 - num2;
  if (operator === "*") return num1 * num2;
  if (operator === "%") return num1 % num2;
  if (operator === "/") {
    if (num2 === 0) return "Error";
    return num1 / num2;
  }
}

equalButton.addEventListener("click", function () {
  if (operator === "" || secondNumber === "") return;

  const num1 = Number(firstNumber);
  const num2 = Number(secondNumber);

  const result = calculate(num1, num2, operator);

  display.value = result;
  firstNumber = String(result);
  secondNumber = "";
  operator = "";
});

clearButton.addEventListener("click", function () {
  firstNumber = "";
  secondNumber = "";
  operator = "";
  display.value = "0";
});

backspaceButton.addEventListener("click", function () {
  if (operator === "") {
    firstNumber = firstNumber.slice(0, -1);
  } else {
    secondNumber = secondNumber.slice(0, -1);
  }
  updateDisplay();
});

signButton.addEventListener("click", function () {
  if (operator === "" && firstNumber !== "") {
    firstNumber = String(Number(firstNumber) * -1);
  } else if (secondNumber !== "") {
    secondNumber = String(Number(secondNumber) * -1);
  }
  updateDisplay();
});

display.value = "0";
