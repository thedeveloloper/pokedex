import React from "react";

import ItemImage from "./ItemImage";

import { Card, Label } from "semantic-ui-react";

import "./ItemCard.css";

function ItemCard(props) {
  function getName(name) {
    if (!name) {
      return "";
    }
    let splitName = name.split("-");

    return splitName
      .map((letter) => letter.charAt(0).toUpperCase() + letter.substring(1))
      .join(" ");
  }

  function handleClick() {
    props.handleInfoNumber(props.itemNumber);
    props.handleInfoOpen(true);
  }

  return (
    <Card className="itemCard" onClick={handleClick} raised>
      <Label corner size="medium" content={props.itemNumber} circular />
      <div style={{ padding: "50px" }}>
        <ItemImage lazy={props.lazy} itemName={props.itemName} size="tiny" />
      </div>

      <Card.Content>
        <Card.Header>{getName(props.name)}</Card.Header>
      </Card.Content>

      <Card.Content extra></Card.Content>
    </Card>
  );
}

export default ItemCard;
