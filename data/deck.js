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

  export default makeADeck