import React from "react";

import { getItemImage } from "../../services/HTTPGet";
import LazyImage from "../../services/LazyImage";

import { Image } from "semantic-ui-react";

export default function ItemImage(props) {
  const imageUrl = getItemImage(props.itemNumber);
  if (props.lazy) {
    return <LazyImage src={imageUrl} size={props.size ? props.size : "huge"} />;
  }

  return <Image src={imageUrl} size={props.size ? props.size : "huge"} />;
}
