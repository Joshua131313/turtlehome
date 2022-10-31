const cardIsBroadway = (card) => {
  if(card.name === 'K' || card.name === 'Q' || card.name === 'J' || card.name === '10') {
    return true
  }
  else return false
} 
export const getCardsValueWithoutAce = (cards) => {
    let count = 0;

    cards.forEach((card) => {
      if (card.name === "A") {

      } else if (cardIsBroadway(card)) {
        count = count + 10;
      } else {
        count = count + parseFloat(card.name) + 1;
      }
    });
    return count;
  };
  export const getCardsValue = (cards) => {
    let count = 0; 
    let numberOfAces = cards.filter(x=> x.name === 'A').length
    cards.forEach((card) => {
      if (card.name === "A") {
        count = count + 1
        if(count < 12) {
          count = count + 10
        }
        
        else {
          count = count - (10 * (numberOfAces-1))
        }
      } else if (card.name === "K" || card.name === "J" || card.name === "Q") {
        count = count + 10;
      } else {
        count = count + parseFloat(card.name);
      }
    });
    return count;
  };
  export const hasBlackJack = (cards) => {
    let firstCard = cards[0]
    let secondCard = cards[1]
    if(typeof firstCard === 'object') { 
      if((firstCard.name === 'A' && cardIsBroadway(secondCard)) || cardIsBroadway(firstCard) && secondCard.name === 'A') {
        return true
      } 
    }
  }
  export const handleWinLose = (dealerHasBlackJack, playerHasBlackJack, tempState, index, playerCardsValue, dealerCardsValue) => {
    if(dealerHasBlackJack && playerHasBlackJack) {
      tempState[index].credit = tempState[index].originalCredit
      console.log('push')
    }
    else if (dealerHasBlackJack) {
      tempState[index].originalCredit = tempState[index].credit
    }
    else if(playerHasBlackJack) {
      tempState[index].originalCredit =  tempState[index].credit + (tempState[index].bet * 3/2)
      tempState[index].credit =  tempState[index].credit + (tempState[index].bet * 3/2)
    }
    else if(playerCardsValue > 21) {
      tempState[index].originalCredit = tempState[index].credit
      console.log('busted')
    }
    else if (dealerCardsValue > 21) {
      tempState[index].originalCredit =  tempState[index].credit + (tempState[index].bet * 2)
      tempState[index].credit =  tempState[index].credit + (tempState[index].bet * 2)
      console.log('win')
    }
    else if (dealerCardsValue > playerCardsValue) {
        // dealer cards > player cards (dealer wins)
      tempState[index].originalCredit = tempState[index].credit
      console.log('lose')
    }
    else if(dealerCardsValue < playerCardsValue) {
      tempState[index].originalCredit =  tempState[index].credit + (tempState[index].bet * 2)
      tempState[index].credit =  tempState[index].credit + (tempState[index].bet * 2)
      console.log('win')
    }
    else {
      // push
      tempState[index].credit = tempState[index].originalCredit
      console.log('push')
    }
  }