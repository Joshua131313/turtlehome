import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import ImgLoaded from "../../../components/Imgloaded/Imgloaded";
import "./BlackJack.css";
import AppBtn from "../../../components/AppBtn/AppBtn";
import Layout from "../../../containers/Layout/Layout";
import { getDeck } from "./deck";
import Card from "./Card";
import Popup from "../../../components/Popup/Popup";
import { AppInput } from "../../../components/AppInput/AppInput";
import { addNotification } from "../../../../Notification/Addnotification";
import { StoreContext } from "../../../../ContextAPI";
import { getCardsValue, getCardsValueWithoutAce, handleWinLose, hasBlackJack } from "./helpers";
import { editState } from "../../../utils/general";

const BlackJack = (props) => {
  const {addNoti} = useContext(StoreContext)
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false)
  const [cardsDealt, setCardsDealt] = useState(false)
  const [dealerCards, setDealerCards] = useState([]);
  const [configurePopup, setConfigurePopup] = useState(false)
  const [players, setPlayers] = useState([]);
  const deck = getDeck()
  const [minBet, setMinBet] = useState(25)
  const [maxBet, setMaxBet] = useState(400)
  const [buyIn, setBuyIn] = useState(0)

  const dealerCardsRender = dealerCards?.map((card, i)=> {
    return (
      <Card card={card} i={i}/>
    )
  })
  const playersRender  = players?.filter(x=> x.bet !== 0 || !cardsDealt).map(player=> {
    let playerCardsValue = getCardsValue(player.cards)
    let dealerCardsValue = getCardsValue(dealerCards)
    let dealerHasBlackJack = hasBlackJack(dealerCards)
    let playerWon = player.blackJack || (playerCardsValue > dealerCardsValue && playerCardsValue <=21) || dealerCardsValue > 21
    let playerLost = playerCardsValue > 21 || (playerCardsValue < dealerCardsValue && dealerCardsValue <=21) || dealerHasBlackJack
    let disabled = player.stand || player.blackJack
    return ( 
      <div className="outerplayercontainer flexcol">
        <div className={`${(playerWon && disabled) ? 'winner' : (playerLost && disabled) ? 'loser' : ''} playerbet flexcol`}>
          <div className={`bet   ${cardsDealt ? 'flexcol jc' : 'flexrow sb'}`}>
            {cardsDealt && 
              <strong className="flexrow ac">
                {playerCardsValue > 21 ? 'Busted: ' : player.blackJack ? 'Black Jack: '  : ''}{playerCardsValue}{" "}
                {/* {
                player.cards.some((x) => x.name === "A") &&
                 getCardsValueWithoutAce(player.cards) > 10
                   ? "| " +
                    (getCardsValueWithoutAce(player.cards) +
                      player.cards.filter((x) => x.name === "A").length)
                  : ""
                  } */}
                  
              </strong>
            }
            <span className="flexrow gap-10 ac" style={{whiteSpace: 'nowrap'}}>Bet:
              {cardsDealt ? <> ${player.bet}</> : <input min={0} value={player.bet} onChange={(e)=> handleCustomBet(player, e)} type={'number'}/>}
            </span>
            {!cardsDealt && <AppBtn text='Ready' onClick={()=> handleReadyUser(player)} className={player.ready ? 'readybtn' : 'graybtn'}/>}
          </div>
            <div className="controls">
             {!cardsDealt ? <>
                <AppBtn text={`Min Bet: ${minBet}`} onClick={()=> handlePlayerBet(minBet, player)}/>
                {/* <AppBtn text={`Custom Bet`} onClick={()=> handleCustomBet(player)}/> */}
                <AppBtn text={`Max Bet: ${maxBet}`} onClick={()=> handlePlayerBet(maxBet, player)}/>
              </> 
              : 
              <>
                <AppBtn disabled={disabled} text='Hit' onClick={()=> handleHit(player)}/>
                <AppBtn text='Double' disabled={disabled || player.originalCredit <= player.bet * 2}  onClick={()=> handleDouble(player)}/>
                <AppBtn text='Stand' disabled={disabled} onClick={()=> handleStand(player)}/>
              </> 
              }
            </div>
        </div>
        <div className="player playercontainer">
          {
            player?.cards.map((card, i)=> {
              return (
                <Card card={card} i={i}/>
              )
            })
          }
        </div>
        <div className="playerfunds">
            <strong>Credit: ${player.credit}</strong>
        </div>
      </div>
    )
  })
  let emptyPlayersRender = [...Array.from(Array(5 - players.length).keys())].map(empty=> {
    return (
      <div className="addplayer" onClick={()=> addBuyInNoti()}>
        <i className="fal fa-plus"></i>
      </div>
    )
  })
  const startGame = () => {
    setGameStarted(true)
    setConfigurePopup(false)
  }
  
  const handleHit = (player, double) => {
    const {tempState, index} = editState(players, player.id)
    let randomID = Math.floor(Math.random() * deck.length)
    tempState[index].cards.push(deck[randomID])
    if(double) {
      tempState[index].stand = true
    }
    if(getCardsValue(tempState[index].cards) >= 21) {
      tempState[index].stand = true

    }
    setPlayers(tempState)
  }
  const handleDouble = (player) => {
    const {tempState, index} = editState(players, player.id)
    if(tempState[index].originalCredit >= tempState[index].bet * 2) {
      tempState[index].credit = tempState[index].originalCredit - (tempState[index].bet * 2)
      tempState[index].bet = tempState[index].bet * 2
      handleHit(player, true)
      setPlayers(tempState)
    }
  }
  const handleStand = (player) => {
    const {tempState, index} = editState(players, player.id)
    tempState[index].stand = true
    setPlayers(tempState)
  }

  const handleReadyUser = (player) => {
    const {tempState, index} = editState(players, player.id)

    tempState[index].ready = !tempState[index].ready
    setPlayers(tempState)

  }
  const handlePlayerBet = (bet, player) => {
    const {tempState, index} = editState(players, player.id)

    if(tempState[index].originalCredit < bet) {
      addNoti('Not enough credit!', 'fal fa-exclamation-circle')
    }
    else {
      tempState[index].bet = bet 
      tempState[index].credit = tempState[index].originalCredit - bet
    }
    setPlayers(tempState)
  }
  const handleCustomBet = (player, e) => {
    let customBet = e.target.value === '' ? 0 : e.target.value
      handlePlayerBet(parseFloat(customBet), player)
  }
  const addBuyInNoti = () => {
   let buyIn = prompt('Buy in:')
   if(typeof parseFloat(buyIn) === 'number' && buyIn !== null && buyIn !== '') {
    addPlayer(buyIn)
   }
   else {
     addNoti('Enter a valid number', 'fal fa-exclamation-circle')
   }
  }
  const dealPlayerCards = () => {
    let tempPlayers = [...players]

    for(let s = 0; s < tempPlayers.length; s++ ) {
      if(tempPlayers[s].bet !== 0) {
        let pCards = []
        for(let i = 0; i < 2; i++) {
          let randomID = Math.floor(Math.random() * deck.length)
          pCards.push(deck[randomID])
         
        }
        // pCards.push({
        //   name: 'A',
        //   suit: 'spade'
        // })
        // pCards.push({
        //   name: '10',
        //   suit: 'spade'
        // })
        if(hasBlackJack(pCards)) {
          tempPlayers[s].blackJack = true
          tempPlayers[s].stand = true
        }
        tempPlayers[s].cards = pCards
      }
    }
    setPlayers(tempPlayers)
  }
  const dealDealerCards = () => {
    let tempDealer = [...dealerCards]
    let dCards = []
      for(let x = 0; x < 2; x++) {
        let randomID = Math.floor(Math.random() * deck.length)
        dCards.push({
            faceDown: x === 0 ? true : false,
            ...deck[randomID]
        })
        tempDealer = dCards
      }
    setDealerCards(tempDealer)
  }
  const dealCards = () => {
    setGameEnded(false)

    let tempState = [...players]
    tempState.forEach(player=> {
      player.ready = false
    })
    setPlayers(tempState)
    dealPlayerCards()
    dealDealerCards()
    setCardsDealt(true)
  }
  const addPlayer = (buyIn) => {
    let tempPlayers = [...players]
    tempPlayers.push({
      credit: buyIn,
      originalCredit: buyIn,
      cards: [],
      id: players.length,
      bet: 0,
      ready: false,
      stand: false,
      blackJack: false
    })
    setPlayers(tempPlayers)
  }
  const revealDealerCard = () => {
    if(dealerCards.length > 1) {
      let tempState = [...dealerCards]
      tempState[0].faceDown = false
      setDealerCards(tempState)
    } 
  }
  const hitDealer = () => {
    let tempState = [...dealerCards]
    let randomID = Math.floor(Math.random() * deck.length)

    tempState.push(deck[randomID])
    setDealerCards(tempState)
  }

  const handleWinner = () => {
    let dealerHasBlackJack = hasBlackJack(dealerCards)
    const dealerCardsValue = getCardsValue(dealerCards)
    setGameEnded(true)
    players.forEach(player=> {
      const {tempState, index} = editState(players, player.id)
      let playerHasBlackJack = hasBlackJack(player.cards)
      let playerCardsValue = getCardsValue(player.cards)
      handleWinLose(dealerHasBlackJack, playerHasBlackJack, tempState, index, playerCardsValue, dealerCardsValue)
      setPlayers(tempState)
    })
  }
  const newGame = () => {
     players.forEach(player=> {
      let {tempState, index} = editState(players, player.id)
      tempState[index].cards = []
      tempState[index].stand = false
      tempState[index].blackJack = false
      if(tempState[index].credit >= tempState[index].bet ) {
        tempState[index].credit = tempState[index].credit - tempState[index].bet
      }
      else {
        tempState[index].bet = 0
      }
      setPlayers(tempState)
    })
    setDealerCards([])
    setCardsDealt(false)
  }

  useEffect(()=> {
      let allPlayersReady = players.every(x=> x.ready)
      if(allPlayersReady && players.length > 0) {
        if(players.length === 1 && players[0].bet === 0) {
          addNoti('You must place a bet before starting the game.', 'fal fa-exclamation-circle')
        } 
        else {
          dealCards()
        }
      }
  }, [players])
  useEffect(()=> {
    let allPlayersStand = players.every(x=> x.stand)
    let dealerHasBlackJack = hasBlackJack(dealerCards)
    if(dealerHasBlackJack) {
      handleWinner()
    }
    else if(allPlayersStand && players.length > 0 && !gameEnded) {
      console.log('asd')
      revealDealerCard()
        if(getCardsValue(dealerCards) > 16) {
          handleWinner()
        }
        else {
          hitDealer()
        }
    }
  }, [players, dealerCards, gameEnded])
  return (
    <Layout noBtn title="BlackJack" className="blackjack">
      <Popup popupClassName='configurepopup' visible={configurePopup} setVisible={setConfigurePopup}>
          <h2 className="configtitle">Configure your game</h2>
          <div className="option">
            <AppInput type='number' placeholder={'Min Bet'} value={minBet} setValue={setMinBet}/>
            <AppInput type='number' placeholder={'Max Bet'} value={maxBet} setValue={setMaxBet}/>
          </div>
          <AppBtn text='Save' onClick={()=> maxBet > minBet ? startGame() : addNoti('Max bet must be greater than the min bet.', 'fal fa-exclamation-circle')}/>
      </Popup>
      {!gameStarted ?
        <div className="startgamecont">
        <ImgLoaded img="https://i.imgur.com/3TlheD8.jpg" />
        <div className="startgameoverlay">
          <AppBtn 
            text="Start Game" 
            onClick={() => setConfigurePopup(true)} 
            />
        </div>
      </div>
       : 
       <div className="table">
          <div className="outerdealercontainer flexcol ac">
           
                {players.every(x=> x.stand) && cardsDealt && 
                   <div className="bet flexcol ac jc">
                      <div className="flexrow sb ac dealervalue">
                        <span>
                        {getCardsValue(dealerCards)}
                        </span>
                        <AppBtn text='New game' onClick={()=> newGame()}/>
                      </div>
                  </div>
                }
        
            <div className="dealercontainer">
              {dealerCardsRender}
            </div>
          </div>
         <div className="playerscontainer">
           {playersRender}
           {!cardsDealt && emptyPlayersRender}
         </div>
       </div>
      }
    </Layout>
  );
};

BlackJack.propTypes = {};

export default BlackJack;
