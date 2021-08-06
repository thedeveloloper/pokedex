import React, { useEffect, useState } from "react";

import { getPokemonImage } from "../../services/GetPokemon";

import { Image, Message, Loader } from "semantic-ui-react";

import spinner from "../../res/spinner.gif";

export default function PokemonImage(props) {
  const [imageLoading, setImageLoading] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <Image
      src={
        imageLoading
          ? spinner
          : getPokemonImage(props.pokemonNumber, props.showShiny)
      }
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
