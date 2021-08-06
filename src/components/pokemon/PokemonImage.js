import React, { useState } from "react";

import { getPokemonImage } from "../../services/GetPokemon";

import { Image, Container, Message, Loader } from "semantic-ui-react";

export default function PokemonImage(props) {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  return imageLoading ? (
    Loader
  ) : (
    <Image
      src={getPokemonImage(props.pokemonNumber)}
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
