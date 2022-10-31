var suits = ["spade", "diamond", "club", "heart"];
var values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
export function getDeck() {
  let deck = [];

  for (let i = 0; i < suits.length; i++) {
    for (let x = 0; x < values.length; x++) {
      let card = { name: values[x], suit: suits[i] };
      deck.push(card);
    }
  }
  return deck;
}
