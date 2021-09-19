class Calculator {
    constructor (prevNumber, currentNumber) {
        this.prevNumber = prevNumber;
        this.currentNumber = currentNumber;
        this.clear();
    }

    clear () {
        this.currentNumberText = '0';
        this.prevNumberText = '';
        this.operation = undefined;
    }

    erase () {
        this.currentNumberText = this.currentNumberText.toString().slice(0, -1);
        isFresh = false;
    }

    concatNumber (number) {
        if (number !== '.'  && this.currentNumberText === '0' || isFresh === true) {this.currentNumberText = ''};
        if (number == '.' && this.currentNumberText.includes('.') || this.currentNumberText.length === 14 || this.currentNumber.innerText.includes('e')) return;
        if (number == '.' && this.currentNumberText === '') {this.currentNumberText = '0'};
        this.currentNumberText = this.currentNumberText.toString() + number.toString();
        isFresh = false;
    }

    checkOperation (operation) {
        if (this.currentNumberText === '' || this.currentNumber.innerText.includes('e') ) return;
        if (this.prevNumberText !== '') {this.compute()}
        this.operation = operation;
        this.prevNumberText = this.currentNumberText;
        this.currentNumberText = '';
    }

    posNegChange () {
        if (this.currentNumberText.toString().slice(0,1) == '-') {
        this.currentNumberText = this.currentNumberText.toString().slice(1);
        } else {this.currentNumberText = '-' + this.currentNumberText};
    }

    percent () {
        if (this.prevNumberText == '' || this.currentNumberText == '' || this.currentNumber.innerText.includes('e')) return;
        let percentN;
        const firstN = parseFloat(this.prevNumberText);
        const currentN = parseFloat(this.currentNumberText);

        percentN = +(firstN / 100 * currentN).toFixed(10);
        this.currentNumberText = percentN;
    }

    compute () {
        let result;
        const firstN = parseFloat(this.prevNumberText);
        const currentN = parseFloat(this.currentNumberText);
        if (isNaN(firstN) || isNaN(currentN)) return
        switch (this.operation) {
            case '+':
                result = firstN + currentN
                break
            case '–':
                result = firstN - currentN
                break
            case '×':
                result = firstN * currentN
                break
            case '÷':
                result = firstN / currentN
                break
            default: return
        }

        result = +result.toFixed(10);

        this.currentNumberText = result;
        this.operation = undefined;
        this.prevNumberText = '';
    }

    displayModify (number) {
        let floor = number.toString().split('.')[0];

        if (floor.length > 3) {
            floor = floor.toString().split('').reverse();

            for (var f = 3; f < floor.length; f += 4) {
                floor.splice(f, 0, ' ');
            }

            floor = floor.reverse();
            if (floor[0] == '-' && floor[1] == ' ') {floor.splice(1, 1)}
            floor = floor.join('')

            if (number.toString().includes('.')) {
            return floor + '.' + number.toString().split('.')[1];
            } else return floor;

        } else return number;
    }

    updateDisplay () {
        if (this.currentNumberText.toString().length > 7 && this.currentNumberText.toString().length <= 11) {
            this.currentNumber.style.fontSize = 'var(--medium-font-size)'
        } else if (this.currentNumberText.toString().length > 11) {
            this.currentNumber.style.fontSize = 'var(--premedium-font-size)'
        } else {this.currentNumber.style.fontSize = 'var(--bigger-font-size)'};

        this.currentNumber.innerText = this.displayModify(this.currentNumberText);

        if (this.prevNumberText.toString().includes('.') && this.prevNumberText.toString().slice(this.prevNumberText.toString().length - 1) == '.') {
            this.prevNumberText = this.prevNumberText.toString().replace('.', '')
        }

        if (this.operation != null) {
            this.prevNumber.innerText = `${this.displayModify(this.prevNumberText)} ${this.operation}`;
        } else this.prevNumber.innerText = this.displayModify(this.prevNumberText);

               
    }
}

const numberButton = document.querySelectorAll('[data-number]');
const operatorButton = document.querySelectorAll('[data-operator]');
const clearButton = document.getElementById('clearbutton');
const posNegButton = document.getElementById('posnegbutton');
const percentButton = document.getElementById('percentbutton');
const equalsButton = document.getElementById('equals');
const eraseButton = document.getElementById('erasebutton');
const prevNumber = document.getElementById('prev-number');
const currentNumber = document.getElementById('current-number');
let isFresh = false;

const calculator = new Calculator (prevNumber, currentNumber);

numberButton.forEach(button => {
    button.addEventListener('click', () => {
        calculator.concatNumber(button.innerText);
        calculator.updateDisplay();
    })
})

operatorButton.forEach(button => {
    button.addEventListener('click', () => {
        calculator.checkOperation(button.innerText);
        calculator.updateDisplay();
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
    isFresh = true;
})

clearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
})

eraseButton.addEventListener('click', button => {
    calculator.erase();
    calculator.updateDisplay();
})

posNegButton.addEventListener('click', button => {
    calculator.posNegChange();
    calculator.updateDisplay();
})

percentButton.addEventListener('click', button => {
    calculator.percent();
    calculator.updateDisplay();
})