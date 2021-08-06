import React, { useState, useEffect } from "react";

import PokemonImage from "../pokemon/PokemonImage";

import { Modal, Button } from "semantic-ui-react";

export default function PokemonInfo(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(props.isOpen);

  useEffect(() => {
    setIsOpen(props.isOpen);
  }, [props]);

  return (
    <Modal
      closeIcon
      open={isOpen}
      onClose={() => setIsOpen(false)}
      onOpen={() => setIsOpen(true)}
    >
      <PokemonImage pokemonNumber={props.pokemonNumber} />
      <PokemonImage pokemonNumber={props.pokemonNumber} showShiny={true} />
      <Button
        onClick={() => {
          setIsOpen(false);
        }}
      >
        Close
      </Button>
    </Modal>
  );
}
