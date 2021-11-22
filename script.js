class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }
    
    clear() {  
        if(this.previousOperand !== ''){
            this.currentOperand = '';
            clear.innerText = 'AC';
            this.currentOperandTextElement.innerHTML = '0';
        }
        else{
            this.currentOperand = '';
            this.previousOperand = '';
            this.operation = undefined;
            clear.innerText = 'AC';
            this.currentOperandTextElement.innerHTML = '0';  
        }
           
    }

    sign() {
        if(this.currentOperand === '' || this.currentOperand === '0'){
            this.currentOperand = '-0';
            this.updateDisplay();
        }
        else if(this.currentOperand === '-0'){
            this.currentOperand = '0';
            this.updateDisplay();
        }
        else if(this.currentOperand === '-0.'){
            this.currentOperand = '0.';
            this.updateDisplay();
        }
        else if(this.currentOperand === '0.'){
            this.currentOperand = '-0.';
            this.updateDisplay();
        }
        else {
            if(this.currentOperand < 0){
                this.currentOperand = this.currentOperand.substring(1);
                this.updateDisplay();
            }
            else{
                this.currentOperand = '-' + this.currentOperand;
                this.updateDisplay();
            }
        }
    }

    point() {
        if(this.currentOperand === '-0'){
            this.currentOperand = '-0.';
            this.updateDisplay();
        }
        else if(this.currentOperand === '' || this.currentOperand === '0'){
            this.currentOperand = '0.';
            this.updateDisplay();
        }
        else if(!this.currentOperand.includes('.')){
            this.currentOperand = this.currentOperand + '.';
            this.updateDisplay();
        }
        clear.innerText = 'C';
    }

    percent(){
        if(this.currentOperand === '0' || this.currentOperand === '')
            return ;
        if(this.currentOperand === '-0'){
            this.currentOperand = '0';
            this.updateDisplay()
        }
        else {
            this.currentOperand = this.currentOperand / 100
            this.updateDisplay()
        }

    }

    appendNumber(number) {
        if(this.currentOperand === '-0'){
            this.currentOperand = '-'+ number;
            this.updateDisplay();
        }
        else if(this.currentOperand !== '0' && this.currentOperand !== 'error'){
            if(this.currentOperand.length < 9){
                this.currentOperand = this.currentOperand + number;
                this.updateDisplay();
            }
        }
        else{
            this.currentOperand = number;
            this.updateDisplay();        
           }
        clear.innerText = 'C'
    }

    chooseOperation(operation) {
        if(this.currentOperand === '')
            return ;
        if(this.previousOperand !== ''){
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        switch(this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '−':
                computation = prev - current;
                break;
            case '×':
                computation = prev * current;
                break;
            case '÷':
                computation = prev / current;
                break;
            default :
                return ;
        }
        if(computation > Math.pow(10, 9)){
            this.currentOperand = 'error';
        }
        else if(String(computation).length > 9){
            this.currentOperand = String(computation).substring(0, 9);
        }
        else{
            this.currentOperand = computation;
        }
        this.operation = undefined;
        this.previousOperand = '';
        this.updateDisplay();
    }

    updateDisplay(){    
        this.currentOperandTextElement.innerText = this.currentOperand;
    }
}
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const signButton = document.querySelector('[data-sign]');
const percentButton = document.querySelector('[data-percent]');
const clearButton = document.querySelector('[data-clear]');
const pointButton = document.querySelector('[data-point]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute();
})

clearButton.addEventListener('click', button => {
    calculator.clear();
})

signButton.addEventListener('click', button => {
    calculator.sign();
})

pointButton.addEventListener('click', button => {
    calculator.point();
})

percentButton.addEventListener('click', button =>{
    calculator.percent();
})

function showTime(){
    let date = new Date();
    let hour = date.getHours();
    let minute = date.getMinutes(); 
    
    hour = (hour < 10) ? "0" + hour : hour;
    minute = (minute < 10) ? "0" + minute : minute;
    
    let time = hour + ":" + minute  ;
    document.querySelector('.clock').innerText = time;

    setTimeout(showTime, 1000);
    
}
showTime();
