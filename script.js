const calculator = document.querySelector('.calculator');
const keys = calculator.querySelector('.calculator-keys');
const display = calculator.querySelector('.calculator-screen');

let firstValue = '';
let operator = '';
let secondValue = '';
let shouldResetScreen = false;

keys.addEventListener('click', e => {
    if (e.target.matches('button')) {
        const key = e.target;
        const action = key.dataset.action;
        const keyContent = key.textContent;
        const displayedNum = display.value;

        // Handle number buttons
        if (!action) {
            if (displayedNum === '0' || shouldResetScreen) {
                display.value = keyContent;
                shouldResetScreen = false;
            } else {
                display.value = displayedNum + keyContent;
            }
        }

        // Handle operator buttons
        if (
            action === 'add' ||
            action === 'subtract' ||
            action === 'multiply' ||
            action === 'divide'
        ) {
            if (firstValue && operator && !shouldResetScreen) {
                const result = calculate(firstValue, operator, displayedNum);
                display.value = result;
                firstValue = result;
            } else {
                firstValue = displayedNum;
            }
            operator = action;
            shouldResetScreen = true;
        }

        // Handle decimal button
        if (action === 'decimal') {
            if (!displayedNum.includes('.')) {
                display.value = displayedNum + '.';
            }
            if (shouldResetScreen) {
                display.value = '0.';
                shouldResetScreen = false;
            }
        }

        // Handle clear button
        if (action === 'clear') {
            firstValue = '';
            operator = '';
            shouldResetScreen = false;
            display.value = '0';
        }

        // Handle equals button
        if (action === 'calculate') {
            if (firstValue && operator) {
                const result = calculate(firstValue, operator, displayedNum);
                display.value = result;
                firstValue = '';
                operator = '';
                shouldResetScreen = true;
            }
        }
    }
});

function calculate(n1, operator, n2) {
    let result = '';

    if (operator === 'add') {
        result = parseFloat(n1) + parseFloat(n2);
    } else if (operator === 'subtract') {
        result = parseFloat(n1) - parseFloat(n2);
    } else if (operator === 'multiply') {
        result = parseFloat(n1) * parseFloat(n2);
    } else if (operator === 'divide') {
        result = parseFloat(n1) / parseFloat(n2);
    }

    return result;
}