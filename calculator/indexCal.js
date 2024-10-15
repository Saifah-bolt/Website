const display = document.getElementById('display');
let num1 = "";
let num2 = "";
let operator = "";

const press = (num) => {
    num1 += num;
    display.innerText = parseFloat(num1).toLocaleString("en-US");
}

const setOperator = (op) => {
    if (operator !== "") {
        operator = "";
        num1 = num2;
    }
    operator = op;
    num2 = num1;
    num1 = "";
}

const clr = () => {
    num1 = "";
    num2 = "";
    num3 = "";
    operator = "";
    display.innerText = "0";
}

const calculate = () => {
    let a = parseFloat(num2);
    let b = parseFloat(num1);
    let result = 0;
    switch (operator) {
        case "+":
            result = a + b;
            break;
        case "-":
            result = a - b;
            break;
        case "*":
            result = a * b;
            break;
        case "/":
            result = a / b;
            break;
    }
    num2 = result.toString();
    display.innerText = parseFloat(result).toLocaleString("en-US");
}