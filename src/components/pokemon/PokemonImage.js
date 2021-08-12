import React, { useState } from "react";

import { getPokemonImage } from "../../services/HTTPGet";
import LazyImage from "../../services/LazyImage";

import { Image, Message, Loader } from "semantic-ui-react";

export default function PokemonImage(props) {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const imageUrl = getPokemonImage(props.pokemonNumber, props.showShiny);

  return imageError ? (
    <Message>Error Loading Image</Message>
  ) : (
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
