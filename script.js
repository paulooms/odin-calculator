const add = function (a, b) {
    return parseFloat(a) + parseFloat(b);
}

const subtract = function (a, b) {
    return parseFloat(a) - parseFloat(b);
}

const multiply = function (a, b) {
    return parseFloat(a) * parseFloat(b);
}

const divide = function (a, b) {
    if (b === "0") {
        return "error";
    }
    return parseFloat(a) / parseFloat(b);
}

const operate = function (operator, a, b) {
    switch (operator) {
        case 'add':
            return add(a, b);
        case 'subtract':
            return subtract(a, b);
        case 'multiply':
            return multiply(a, b);
        case 'divide':
            return divide(a, b);
        default:
            return "ERROR"
    }
}

let currentValue = "";
let previousValue = "";
let currentOperator = "";

const display = document.getElementById('display');

const btn = document.getElementsByClassName('button');

for (let i = 0; i < btn.length; i++) {
    btn[i].addEventListener('click', () => {
        buttonClicked(btn[i]);
    })
}

const buttonClicked = function (btn) {
    // cases: number, operator, decimal, equals, bs, cl

    if (btn.classList.contains('number')) {
        buttonIsNumber(btn.id);
    } else if (btn.classList.contains('decimal')) {
        buttonIsDecimal();
    } else if (btn.classList.contains('operator')) {
        buttonIsOperator(btn.id);
    } else if (btn.classList.contains('equals')) {
        buttonIsEquals();
    } else if (btn.classList.contains('bs')) {
        buttonIsBS();
    } else if (btn.classList.contains('cl')) {
        clear();
    }
}

const buttonIsNumber = function (num) {

    if (currentOperator === "") {
        previousValue = "";
    }

    currentValue += num;
    setDisplay('current');

}

const buttonIsDecimal = function () {
    if (currentValue.includes('.')) {
        return;
    } else {
        currentValue += '.';
    }
}

const buttonIsOperator = function (operator) {
    if (previousValue === "error") {
        clear();
    }

    if (currentOperator != "") { // We already have a current operator , so we have to operate() before we can set a new one. Unless we don't have a current value yet.
        if (currentValue === "") {
            currentOperator = operator
        } else {
            previousValue = operate(currentOperator, previousValue, currentValue);
            setDisplay('previous');
            currentOperator = operator;
            currentValue = "";
        }

    } else if (currentOperator === "" && previousValue != "") { //We don't have an operator yet, but we do have a previous value. We have to set the current operator.
        currentOperator = operator;

    } else { // We don't have an operator, and no previous value. We need to set the current operator and move the current value to previous.
        previousValue = currentValue;
        currentOperator = operator;
        setDisplay('previous');
        currentValue = "";
    }
}

const buttonIsEquals = function () {

    if (currentOperator != "" && currentValue != "" && previousValue != "") {
        previousValue = operate(currentOperator, previousValue, currentValue);
        setDisplay('previous');
        currentOperator = "";
        currentValue = "";

    } else if (currentValue != "") {
        previousValue = currentValue;
        currentValue = "";
        setDisplay('previous')
    }
}

const buttonIsBS = function () {
    if (previousValue === "error") {
        clear();
        return;
    }
    if (currentValue != "") {
        currentValue = currentValue.slice(0, -1);
        setDisplay('current');
    } else {
        currentValue = previousValue.toString().slice(0, -1);
        previousValue = "";
        setDisplay('current');
    }
}

function clear() {
    currentOperator = "";
    currentValue = "";
    previousValue = "";
    setDisplay();
}

function setDisplay(value) {

    if (value === "previous") {
        let previousNumber = Math.round(previousValue * 100000000000) / 100000000000;

        if (isNaN(previousNumber)) {
            display.textContent = "ERROR X_X";
        } else {
            display.textContent = previousNumber;
        }
    } else if (value === "current") {
        display.textContent = currentValue;
    } else {
        display.textContent = "0";
    }
}

window.addEventListener('keydown', function (e) {
    if (e.key >= 0 && e.key < 10) {
        buttonIsNumber(e.key)
    } else if (e.key === ".") {
        buttonIsDecimal();
    } else if (e.code === 'Equal') {
        buttonIsEquals();
    }
    console.log(e);
});