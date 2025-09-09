console.log('calcuator')
function init() {
    /*-------------------------------- Constants --------------------------------*/

    /*-------------------------------- Variables --------------------------------*/
    let result = null
    let num1 = null
    let num2 = null
    let operator = null
    let setNum1 = false
    let setNum2 = false
    let setOp = false

    /*------------------------ Cached Element References ------------------------*/
    const numbersElems = document.querySelectorAll('.number')
    const operatorsElems = document.querySelectorAll('.operator')
    const equalElem = document.querySelector('.equals')
    const displayElem = document.querySelector('.display')
    const numOneElem = document.createElement('num1') // makes things easier to control for display (espicially for multidigit)
    const numTwoElem = document.createElement('num2')

    /*-------------------------------- Functions --------------------------------*/

    function handleOperators(event) {
        if (!setNum1 && event.target.innerText !== 'C') {
            console.log('you need to enter a num1')
            displayElem.innerText = 'ERROR' // display error message when error happens
            setToNull()
        }
        else if (event.target.innerText === 'C') {
            displayElem.innerText = ''
            setToNull()
        }
        else if (!setOp) { 
            operator = event.target.innerText
            setOp = true // this prevents from clicking an operator multiple times
            displayElem.append(operator)
        }
        console.log(`operator = ${operator}`)
    }


    function handleNumbers(event) {
        if (!setOp) { // any number entered before the operator take it as the first num
            displayElem.innerText = ''  // make display empty when starting new calculation
            num1 = ( num1 === null ? event.target.innerText : num1 + event.target.innerText )
            setNum1 = true
            numOneElem.innerText = num1
            displayElem.append(numOneElem)
            console.log(`number 1 = ${num1}`)
        } else {
            num2 = ( num2 === null ? event.target.innerText : num2 + event.target.innerText )
            setNum2 = true
            numTwoElem.innerText = num2
            displayElem.append(numTwoElem)
            // when i want to write 22 it displays 222 because display now has '2' and '22', because each click is a different string...
            // solved this problem by making an element for num1 and num2 so i will just refresh the element itself and then append it to display
            console.log(`number 2 = ${num2}`)
        }
    }


    function handleEqual() {
        if (operator !== null && setNum1 === true && setNum2 === true) { // is first number, second number and operator been clicked/chosen?
            num1 = parseFloat(num1) // to make it float instead of string
            num2 = parseFloat(num2)
            if (operator === '*') {
                result = num1 * num2
            } else if (operator === '+') {
                result = num1 + num2
            } else if (operator === '-') {
                result = num1 - num2
            } else if (operator === '/') {
                result = num1 / num2
            }
            displayElem.innerText = result.toFixed(2) // displays the result and removes previous things
            // learned .toFixed() from https://stackoverflow.com/questions/4098685/rounding-numbers-to-2-digits-after-comma
            console.log(`result = ${result}`)
            setToNull()
        } else {
            displayElem.innerText = 'ERROR'
            console.log('wrong value! error')
            setToNull() // to be sure nothing goes wrong i will set everything to null when any error occurs
        }
    }

    // sets everything to null , makes 'C' easier
    function setToNull() {
        num1 = null
        num2 = null
        result = null
        operator = null
        setNum1 = false
        setNum2 = false
        setOp = false
    }

    /*----------------------------- Event Listeners -----------------------------*/

    equalElem.addEventListener('click', handleEqual)
    operatorsElems.forEach(operatorElem => {
        operatorElem.addEventListener('click', handleOperators)
    })

    numbersElems.forEach(numberElem => {
        numberElem.addEventListener('click', handleNumbers)
    })
}

document.addEventListener('DOMContentLoaded', init)