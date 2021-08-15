import React from "react";

import { getBerryImage } from "../../services/HTTPGet";
import LazyImage from "../../services/LazyImage";

import { Image } from "semantic-ui-react";

export default function BerryImage(props) {
  const imageUrl = getBerryImage(props.berryName);
  if (props.lazy) {
    return (
      <LazyImage src={imageUrl} size={props.size ? props.size : "medium"} />
    );
  }

  return <Image src={imageUrl} size={props.size ? props.size : "medium"} />;
}
