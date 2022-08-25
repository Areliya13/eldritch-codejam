import ancientsData from './ancients.js'
import difficulties from './difficulties.js'
import blueCardsData from './mythicCards/blue/index.js'
import brownCardsData from './mythicCards/brown/index.js'
import greenCardsData from './mythicCards/green/index.js'

// draw ancient
const ancientContainer = document.querySelector('.choose-anc')

ancientsData.forEach(el => {
    const div = document.createElement('div');
    div.classList.add('ancient')
    div.style.backgroundImage = `url(${el.cardFace})`
    ancientContainer.append(div)
})

// draw ancient
const modeContainer = document.querySelector('.choose-level')

difficulties.forEach(el => {
    const div = document.createElement('div');
    div.classList.add('mode')
    div.textContent = el.name
    modeContainer.append(div)
})

//shuffle
function randomN(n){
    return Math.floor(Math.random() * n)
}
  
function shuffle(arr){
    const array = arr
    const len = array.length
    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        const r = randomN(len)
        array[i] = array[r]
        array[r] = element
    }
    return array
}

function nShuffle(arr, n){
    if (n < 1) {
        return []
    }
    return shuffle(arr).slice(-n)
}

//make a deck

function makeADeck(anc, greenCards, brownCards, blueCards){
    const firstStage = []
    const secondStage = []
    const thirdStage = []
  
    const green = greenCards
    const brown = brownCards
    const blue = blueCards
  
    const green1 = anc.firstStage.greenCards
    const green2 = anc.secondStage.greenCards
    const green3 = anc.thirdStage.greenCards
    const brown1 = anc.firstStage.brownCards
    const brown2 = anc.secondStage.brownCards
    const brown3 = anc.thirdStage.brownCards
    const blue1 = anc.firstStage.blueCards
    const blue2 = anc.secondStage.blueCards
    const blue3 = anc.thirdStage.blueCards
  
    for (let i = 0; i < green1; i++) {
        firstStage.push(green.pop());
    }
    for (let i = 0; i < green2; i++) {
        secondStage.push(green.pop());
    }
    for (let i = 0; i < green3; i++) {
        thirdStage.push(green.pop());
    }
    for (let i = 0; i < brown1; i++) {
        firstStage.push(brown.pop());
    }
    for (let i = 0; i < brown2; i++) {
        secondStage.push(brown.pop());
    }
    for (let i = 0; i < brown3; i++) {
        thirdStage.push(brown.pop());
    }
    for (let i = 0; i < blue1; i++) {
        firstStage.push(blue.pop());
    }
    for (let i = 0; i < blue2; i++) {
        secondStage.push(blue.pop());
    }
    for (let i = 0; i < blue3; i++) {
        thirdStage.push(blue.pop());
    }
  
    const res = shuffle(thirdStage).concat(shuffle(secondStage),shuffle(firstStage))
  
    return res
  }

//choose anc and mode
let chosenAnc = ancientsData[0]
let chosenMode

const ancientList = document.querySelectorAll('.ancient')
const modeList = document.querySelectorAll('.mode')

ancientList.forEach((el, i, array) => {
    el.addEventListener('click', () => {
        for (let index = 0; index < array.length; index++) {
            const element = array[index];
            element.classList.remove('active')
        }
        array[i].classList.add('active')
        chosenAnc = ancientsData[i]
    })
})

modeList.forEach((el, i, array) => {
    el.addEventListener('click', () => {
        for (let index = 0; index < array.length; index++) {
            const element = array[index];
            element.classList.remove('active')
        }
        array[i].classList.add('active')
        chosenMode = difficulties[i]
    })
})

//mix
const mixButton = document.querySelector('.button')

let greenCount
let brownCount
let blueCount

const easyGreen = greenCardsData.filter(value => value.difficulty === 'easy')
const easyBrown = brownCardsData.filter(value => value.difficulty === 'easy')
const easyBlue = blueCardsData.filter(value => value.difficulty === 'easy')

const normalGreen = greenCardsData.filter(value => value.difficulty === 'normal')
const normalBrown = brownCardsData.filter(value => value.difficulty === 'normal')

const hardGreen = greenCardsData.filter(value => value.difficulty === 'hard')
const hardBrown = brownCardsData.filter(value => value.difficulty === 'hard')
const hardBlue = blueCardsData.filter(value => value.difficulty === 'hard')

let chosenGreenCards
let chosenBrownCards
let chosenBlueCards

let result

mixButton.addEventListener('click', () => {
    if (chosenMode && chosenAnc){
        document.querySelector('.result').classList.remove('hidden')
        deck.classList.remove('hidden')
        if (currentCard) currentCard.style.backgroundImage = 'none'
        greenCount = chosenAnc.firstStage.greenCards + chosenAnc.secondStage.greenCards + chosenAnc.thirdStage.greenCards
        brownCount = chosenAnc.firstStage.brownCards + chosenAnc.secondStage.brownCards + chosenAnc.thirdStage.brownCards
        blueCount = chosenAnc.firstStage.blueCards + chosenAnc.secondStage.blueCards + chosenAnc.thirdStage.blueCards
        
        switch (chosenMode.id) {
            case 'easiest':
                if (chosenAnc.name === 'shubNiggurath') {
                    chosenGreenCards = shuffle(easyGreen.concat(nShuffle(normalGreen, greenCount - easyGreen.length)))
                } else {
                    chosenGreenCards = nShuffle(easyGreen, greenCount)
                }
                chosenBrownCards = shuffle(easyBrown.concat(nShuffle(normalBrown, brownCount - easyBrown.length)))
                chosenBlueCards = nShuffle(easyBlue, blueCount)
                break;
        
            case 'easy':
                chosenGreenCards = nShuffle(greenCardsData.filter(value => value.difficulty !== 'hard'), greenCount)
                chosenBrownCards = nShuffle(brownCardsData.filter(value => value.difficulty !== 'hard'), brownCount)
                chosenBlueCards = nShuffle(blueCardsData.filter(value => value.difficulty !== 'hard'), blueCount)
                break;
                    
            case 'normal':
                chosenGreenCards = nShuffle(greenCardsData, greenCount)
                chosenBrownCards = nShuffle(brownCardsData, brownCount)
                chosenBlueCards = nShuffle(blueCardsData, blueCount)
                break;
                
            case 'hard':
                chosenGreenCards = nShuffle(greenCardsData.filter(value => value.difficulty !== 'easy'), greenCount)
                chosenBrownCards = nShuffle(brownCardsData.filter(value => value.difficulty !== 'easy'), brownCount)
                chosenBlueCards = nShuffle(blueCardsData.filter(value => value.difficulty !== 'easy'), blueCount)
                break;
                
            case 'hardest':
                if (chosenAnc.name === 'shubNiggurath') {
                    chosenGreenCards = shuffle(hardGreen.concat(nShuffle(normalGreen, greenCount - hardGreen.length)))
                } else {
                    chosenGreenCards = nShuffle(hardGreen, greenCount)
                }
                chosenBrownCards = shuffle(hardBrown.concat(nShuffle(normalBrown, brownCount - hardBrown.length)))
                chosenBlueCards = nShuffle(hardBlue, blueCount)
                break;
            default:
                alert("Wrong data")
            
        }
        result = makeADeck(chosenAnc, chosenGreenCards, chosenBrownCards, chosenBlueCards)
        setCounter()
        counterRender()
    }
})

//open card
const deck = document.querySelector('.card-background')
const currentCard = document.querySelector('.current-card')

deck.addEventListener('click', () => {
    if (result.length > 1) {
        const newCard = result.pop()
        currentCard.style.backgroundImage = `url(${newCard.cardFace})`
        countCards(newCard)
        counterRender()
    } else if (result.length === 1) {
        const newCard = result.pop()
        currentCard.style.backgroundImage = `url(${newCard.cardFace})`
        countCards(newCard)
        counterRender()
        deck.classList.add('hidden')
    }
})

//counter
const greenNum = [0, 0, 0]
const brownNum = [0, 0, 0]
const blueNum = [0, 0, 0]
const greenList = document.querySelectorAll('.green')
const brownList = document.querySelectorAll('.brown')
const blueList = document.querySelectorAll('.blue')

function counterRender() {
    for (let i = 0; i < greenList.length; i++) {
        greenList[i].textContent = greenNum[i]
        brownList[i].textContent = brownNum[i]
        blueList[i].textContent = blueNum[i]
    }
}

function setCounter() {
    if (chosenAnc){
        greenNum[0] = chosenAnc.firstStage.greenCards
        brownNum[0] = chosenAnc.firstStage.brownCards
        blueNum[0] = chosenAnc.firstStage.blueCards
        greenNum[1] = chosenAnc.secondStage.greenCards
        brownNum[1] = chosenAnc.secondStage.brownCards
        blueNum[1] = chosenAnc.secondStage.blueCards
        greenNum[2] = chosenAnc.thirdStage.greenCards
        brownNum[2] = chosenAnc.thirdStage.brownCards
        blueNum[2] = chosenAnc.thirdStage.blueCards
    }
}

function countCards(card) {
    if (card.color === 'green'){
        for (let i = 0; i < greenNum.length; i++) {
            if (greenNum[i]) {
                greenNum[i]--
                break
            }
        }
    }
    if (card.color === 'brown'){
        for (let i = 0; i < brownNum.length; i++) {
            if (brownNum[i]) {
                brownNum[i]--
                break
            }
        }
    }
    if (card.color === 'blue'){
        for (let i = 0; i < blueNum.length; i++) {
            if (blueNum[i]) {
                blueNum[i]--
                break
            }
        }
    }
}