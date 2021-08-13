import React, { useState } from "react";

import { getPokemonImage } from "../../services/HTTPGet";

import { Image, Header, Loader } from "semantic-ui-react";

export default function PokemonImage(props) {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const imageUrl = imageLoading ? (
    <Loader />
  ) : (
    getPokemonImage(props.pokemonNumber, props.showShiny)
  );

  return imageError ? (
    <Header>Error Loading Image</Header>
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
