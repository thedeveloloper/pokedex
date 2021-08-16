import React from "react";

import { Image } from "semantic-ui-react";

export default function Home() {
  return (
    <div style={{ height: "50%", width: "50%" }}>
      <p>Welcome to my PokeDex!</p>
      <Image src="https://articles.pokebattler.com/wp-content/uploads/2018/08/pokedex-kanto-1.jpg" />
    </div>
  );
}
