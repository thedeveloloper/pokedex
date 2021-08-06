import React, { useState } from "react";

import { getPokemonImage } from "../../services/GetPokemon";

import { Image, Message } from "semantic-ui-react";

import spinner from "../../res/spinner.gif";

export default function PokemonImage(props) {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const imageUrl = imageLoading
    ? spinner
    : getPokemonImage(props.pokemonNumber, props.showShiny);

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
