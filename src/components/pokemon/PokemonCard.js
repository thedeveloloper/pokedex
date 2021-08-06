import React, { useState } from "react";
import { Link } from "react-router-dom";

import PokemonImage from "../pokemon/PokemonImage";
import PokemonInfo from "../pokemon/PokemonInfo";

import { Card } from "semantic-ui-react";

import "./PokemonCard.css";

function PokemonCard(props) {
  let [openInfo, setOpenInfo] = useState(false);

  const { name, url } = props;
  const pokemonNumber = url.split("/")[url.split("/").length - 2];

  function cardClickHandler() {
    setOpenInfo(true);
  }

  return (
    // <Link to={`pokemon/${pokemonNumber}`}>
    // <Card className="pokemonCard" raised={true} onClick={Link.to}>
    <div>
      <Card className="pokemonCard" raised={true} onClick={cardClickHandler}>
        <PokemonImage
          pokemonNumber={pokemonNumber}
          showShiny={props.showShiny}
        />
        <Card.Content>
          <Card.Header>
            {name
              .split(" ")
              .map(
                (letter) => letter.charAt(0).toUpperCase() + letter.substring(1)
              )
              .join(" ")}
          </Card.Header>
          <Card.Meta>Type</Card.Meta>
          <Card.Description>{pokemonNumber}</Card.Description>
        </Card.Content>
      </Card>
      <PokemonInfo isOpen={openInfo} pokemonNumber={pokemonNumber} />
    </div>
    // </Link>
  );
}

export default PokemonCard;
