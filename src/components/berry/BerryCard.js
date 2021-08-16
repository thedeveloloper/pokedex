import React from "react";

import BerryImage from "./BerryImage";

import { Card, Label } from "semantic-ui-react";

import "./BerryCard.css";

function BerryCard(props) {
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
    props.handleInfoNumber(props.berryNumber);
    props.handleInfoOpen(true);
  }

  return (
    <Card className="berryCard" onClick={handleClick} raised>
      <Label corner size="medium" content={props.berryNumber} circular />
      <div style={{ padding: "50px" }}>
        <BerryImage lazy={props.lazy} berryName={props.berryName} size="tiny" />
      </div>

      <Card.Content>
        <Card.Header>{getName(props.name)}</Card.Header>
      </Card.Content>
    </Card>
  );
}

export default BerryCard;
