import React, { useEffect, useState } from "react";

import ItemImage from "./ItemImage";

import { getItemInfo } from "../../services/HTTPGet";

import { Card, Grid, Loader, Icon, Label } from "semantic-ui-react";

import "./ItemCard.css";

import data from "../../data.json";

function ItemCard(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [itemInfo, setItemInfo] = useState([]);

  function getName(name) {
    if (!name) {
      return "";
    }
    let splitName = name.split("-");

    if (
      splitName[splitName.length - 1] === "f" ||
      splitName[splitName.length - 1] === "m"
    ) {
      splitName.pop();
    }

    return splitName
      .map((letter) => letter.charAt(0).toUpperCase() + letter.substring(1))
      .join(" ");
  }

  function handleClick() {
    props.handleInfoNumber(props.itemNumber);
    props.handleInfoOpen(true);
  }

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setItemInfo(await getItemInfo(props.itemNumber));
      setIsLoading(false);
    };
    loadData();
  }, [props.itemNumber]);

  return (
    <Card className="itemCard" onClick={handleClick} raised>
      <Label corner size="medium" content={props.itemNumber} circular />
      <ItemImage
        lazy={props.lazy}
        itemNumber={props.itemNumber}
        showShiny={props.showShiny}
      />

      <Card.Content>
        <Card.Header>{getName(props.name)}</Card.Header>
      </Card.Content>

      <Card.Content extra>{isLoading ? <Loader /> : ""}</Card.Content>
    </Card>
  );
}

export default ItemCard;
