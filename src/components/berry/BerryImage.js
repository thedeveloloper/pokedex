import React from "react";

import { getPokemonImage } from "../../services/HTTPGet";
import LazyImage from "../../services/LazyImage";

import { Image } from "semantic-ui-react";

export default function PokemonImage(props) {
  const imageUrl = getPokemonImage(props.pokemonNumber, props.showShiny);

  if (props.lazy) {
    return (
      <LazyImage
        src={imageUrl}
        size={"huge"}
        // onLoad={() => {
        //   setImageLoading(false);
        // }}
        // onError={() => {
        //   setImageError(true);
        // }}
      />
    );
  }

  return (
    <Image
      src={imageUrl}
      size={"huge"}
      // onLoad={() => {
      //   setImageLoading(false);
      // }}
      // onError={() => {
      //   setImageError(true);
      // }}
    />
  );
}
