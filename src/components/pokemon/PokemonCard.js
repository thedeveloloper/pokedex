import React, { useEffect, useState } from "react";

import { Button, Card, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

import spinner from "../../res/spinner.gif";

function PokemonCard(props) {
  let [name, setName] = useState("");
  let [imageUrl, setImageUrl] = useState("");
  let [pokemonIndex, setPokemonIndex] = useState("");
  let [imageLoading, setImageLoading] = useState(true);
  let [tooManyRequests, setTooManyRequests] = useState(false);

  useEffect(() => {
    const { name, url } = props;
    const pokemonIndex = url.split("/")[url.split("/").length - 2];
    const imageUrl = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${pokemonIndex}.png?raw=true`;

    setName(name);
    setImageUrl(imageUrl);
    setPokemonIndex(pokemonIndex);
  }, props);

  return (
    <Link to={`pokemon/${pokemonIndex}`}>
      <Button onClick={Link.to}>
        <Card raised={true}>
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
            <h6 className="mx-auto">
              <span className="badge badge-danger mt-2">Too Many Requests</span>
            </h6>
          ) : null}
          <Card.Content>
            <Card.Header>
              {name
                .split(" ")
                .map(
                  (letter) =>
                    letter.charAt(0).toUpperCase() + letter.substring(1)
                )
                .join(" ")}
            </Card.Header>
            <Card.Meta>Type</Card.Meta>
            <Card.Description>{pokemonIndex}</Card.Description>
          </Card.Content>
        </Card>
      </Button>
    </Link>
  );
}

export default PokemonCard;
