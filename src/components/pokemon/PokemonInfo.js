import React, { useState, useEffect } from "react";

import PokemonImage from "../pokemon/PokemonImage";
import { getPokemonInfo } from "../../services/GetPokemon";

import { Modal, Button, Grid, Message, Header } from "semantic-ui-react";

export default function PokemonInfo(props) {
  const [isOpen, setIsOpen] = useState(props.isOpen);
  const [pokemonInfo, setPokemonInfo] = useState(null);

  useEffect(() => {
    setIsOpen(props.isOpen);
    const loadInfo = async () => {
      setPokemonInfo(await getPokemonInfo(props.pokemonNumber));
    };
    loadInfo();
  }, [props]);

  return (
    <Modal
      closeIcon
      open={isOpen}
      onClose={() => setIsOpen(false)}
      onOpen={() => setIsOpen(true)}
    >
      <Header textAlign="center">
        {pokemonInfo.name
          .split(" ")
          .map((letter) => letter.charAt(0).toUpperCase() + letter.substring(1))
          .join(" ")}
      </Header>
      <Grid textAlign="center">
        <PokemonImage pokemonNumber={props.pokemonNumber} />
        <PokemonImage pokemonNumber={props.pokemonNumber} showShiny={true} />
      </Grid>
      <Message></Message>
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
