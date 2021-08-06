import React, { useState } from "react";
import { Link } from "react-router-dom";

import PokemonImage from "../pokemon/PokemonImage";

import { Card } from "semantic-ui-react";

import "./PokemonCard.css";

function PokemonCard(props) {
  const { name, url } = props;
  const pokemonNumber = url.split("/")[url.split("/").length - 2];
  // let [imageLoading, setImageLoading] = useState(true);
  // let [imageError, setImageError] = useState(false);

  return (
    <Link to={`pokemon/${pokemonIndex}`}>
      <Card className="pokemonCard" raised={true} onClick={Link.to}>
        <PokemonImage pokemonNumber={pokemonNumber} />
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
    </Link>
  );
}

export default PokemonCard;
