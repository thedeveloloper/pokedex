import React, { useState } from "react";

import { Card, Image, Message } from "semantic-ui-react";
import { Link } from "react-router-dom";

import spinner from "../../res/spinner.gif";

import "./PokemonCard.css";

function PokemonCard(props) {
  const { name, url } = props;
  const pokemonIndex = url.split("/")[url.split("/").length - 2];
  const imageUrl = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${pokemonIndex}.png?raw=true`;
  let [imageLoading, setImageLoading] = useState(true);
  let [tooManyRequests, setTooManyRequests] = useState(false);

  return (
    <Link to={`pokemon/${pokemonIndex}`}>
      <Card className="pokemonCard" raised={true} onClick={Link.to}>
        <Image
          src={imageLoading ? spinner : imageUrl}
          size={"medium"}
          onLoad={() => {
            setImageLoading(false);
          }}
          onError={() => {
            setTooManyRequests(true);
          }}
        />
        {tooManyRequests ? (
          <Message>
            <Message.Header>Too Many Requests!</Message.Header>
            <p>
              Slow your role, son! You're making too many requests too fast!
            </p>
          </Message>
        ) : null}
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
          <Card.Description>{pokemonIndex}</Card.Description>
        </Card.Content>
      </Card>
    </Link>
  );
}

export default PokemonCard;
