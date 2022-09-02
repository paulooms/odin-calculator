const add = function (a, b) {
    return parseInt(a) + parseInt(b);
}

const subtract = function (a, b) {
    return parseInt(a) - parseInt(b);
}

const multiply = function (a, b) {
    return parseInt(a) * parseInt(b);
}

const divide = function (a, b) {
    return parseInt(a) / parseInt(b);
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

let display = document.getElementById('display-current');
let displayPrev = document.getElementById('display-previous');

let btn = document.getElementsByClassName('button');

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
        buttonIsClear();
    }

}


let buttonIsNumber = function (num) {
    currentValue += num;
    display.textContent = currentValue;

    console.log(`Current value = ${currentValue}`)
    console.log(`Previous value = ${previousValue}`)
}

let buttonIsDecimal = function () {
    if (currentValue.includes('.')) {
        return;
    } else {
        currentValue += '.';
    }
}

let buttonIsOperator = function (operator) {
    currentOperator = operator;
    // if previous number does not exist, 
    if (previousValue === "") {
        previousValue = currentValue;
        displayPrev.textContent = previousValue;
        currentValue = "";
        display.textContent = "0";

        // if previous number exists, operate first, then assign values
    } else {
        currentValue = operate(currentOperator, previousValue, currentValue);
        display.textContent = currentValue;
        previousValue = currentValue;
        displayPrev.textContent = previousValue;
        currentValue = "";
    }


    console.log(`Current value = ${currentValue}`)
    console.log(`Previous value = ${previousValue}`)
}

let buttonIsEquals = function () {
    currentValue = operate(currentOperator, previousValue, currentValue);
    previousValue = currentValue;
    currentValue = "";
    display.textContent = currentValue;
    displayPrev.textContent = previousValue;
    display.textContent = "0";

    console.log(`Current value = ${currentValue}`)
    console.log(`Previous value = ${previousValue}`)
}

let buttonIsBS = function () {
    console.log('BS');
}

let buttonIsClear = function () {
    console.log('CLEAR')
}


// setup calculation array = [currentNum,previousNum,operator];
// when typing numbers or decimal, add them to string (currentNum)
// when typing an operator, change operator value, currentNum becomes previousNum 
// when typing numbers after typing an operator, add them to string (value B)
// when typing equals, run operate with arguments from calculation array
// when typing bs, remove last character in currentNum
// when typing cl, reset the calculator