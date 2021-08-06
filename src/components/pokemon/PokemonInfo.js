import React, { useState, useEffect } from "react";

import PokemonImage from "../pokemon/PokemonImage";

import { Modal, Button, Image } from "semantic-ui-react";

export default function PokemonInfo(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    setIsOpen(true);
  }, [props.clicked]);

  return (
    <Modal
      open={props.isOpen}
      onClose={() => setIsOpen(false)}
      onOpen={() => setIsOpen(true)}
      trigger={<PokemonCard />}
    >
      <PokemonImage pokemonNumber={props.pokemonNumber} />
      <PokemonImage pokemonNumber={props.pokemonNumber} showShiny={true} />
      <Button
        onClick={() => {
          console.log("clicked!");
          setIsOpen(false);
        }}
      >
        Close
      </Button>
    </Modal>
  );
}
