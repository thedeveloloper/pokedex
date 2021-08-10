import React, { useState } from "react";

import { getPokemonImage } from "../../services/HTTPGet";

import { Image, Message, Loader } from "semantic-ui-react";

export default function PokemonImage(props) {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const imageUrl = imageLoading ? (
    <Loader />
  ) : (
    getPokemonImage(props.pokemonNumber, props.showShiny)
  );

  return imageError ? (
    <Message>Error Loading Image</Message>
  ) : (
    <Image
      src={imageUrl}
      size={"medium"}
      onLoad={() => {
        setImageLoading(false);
      }}
      onError={() => {
        setImageError(true);
      }}
    />
  );
}
