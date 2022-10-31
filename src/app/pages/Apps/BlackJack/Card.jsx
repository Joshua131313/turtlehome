import React from "react";
import PropTypes from "prop-types";

const Card = (props) => {
  const { card, i } = props;
  return (
    <div
      style={{left: i * 40, position: i > 0 ? 'absolute' : 'relative'}}
      className={`deckcard ${card.faceDown ? "facedown" : ""} ${
        card.suit === "heart" || card.suit === "diamond" ? "redsuits" : ""
      }`}
    >
      <div className="cardvalue up flexcol">
        <strong>{card.name}</strong>
        <i className={`fas fa-${card.suit}`}></i>
      </div>
      <div className="cardsuit">
        <i className={`fas fa-${card.suit}`}></i>
      </div>
      <div className="cardvalue down flexcol">
        <strong>{card.name}</strong>
        <i className={`fas fa-${card.suit}`}></i>
      </div>
    </div>
  );
};

Card.propTypes = {};

export default Card;
