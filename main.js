const resultElement = document.getElementById('result')
const lengthElement = document.getElementById('length')
const uppercaseElement = document.getElementById('uppercase')
const lowercaseElement = document.getElementById('lowercase')
const numbersElement = document.getElementById('numbers')
const symbolsElement = document.getElementById('symbols')
const clipboardElement = document.getElementById('clipboard')
const generateBtn = document.getElementById('generate')

const randomFunction = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number:getRandomNumber,
    symbol:getRandomSymbol
}
function getRandomLower(){
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}
function getRandomUpper(){
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}
function getRandomNumber(){
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
}
function getRandomSymbol(){
   const symbols ='!@#$%^&*(){}<>,./?'
   return symbols[Math.floor(Math.random() * symbols.length)]
}
generateBtn.addEventListener('click', ()=>{
    const length = +lengthElement.value
    const hasLower = lowercaseElement.checked
    const hasUpper = uppercaseElement.checked
    const hasNumber = numbersElement.checked
    const hasSymbol = symbolsElement.checked

    resultElement.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length)

})

function generatePassword (lower, upper, number, symbol, length){
    let generatedPassword = ''
    const selectedTypes = lower + upper + number + symbol
    const typesArray = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0])
        if(selectedTypes === 0){
            return ''
        }

        for(let i = 0; i < length; i+=selectedTypes){
            typesArray.forEach(type =>{
                const funcName = Object.keys(type)[0]
                generatedPassword += randomFunction[funcName]()
            })
        }

    const finalPassword = generatedPassword.slice(0, length)
    return finalPassword
}

clipboardElement.addEventListener('click', () =>{
    const textArea = document.createElement('textarea')
    const password = resultElement.innerText

    !password  
        ? null 
        : 
        (   
        textArea.value = password ,
        document.body.appendChild(textArea),
        textArea.select(),
        document.execCommand('copy'),
        textArea.remove,
        alert(`Your Password is copied to clipboard`)
    )
   
})  