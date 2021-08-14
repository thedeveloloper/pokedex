import React, { useState, useEffect } from "react";

import PokemonImage from "./PokemonImage";
import { getPokemonInfo } from "../../services/HTTPGet";

import { Modal, Grid, Message, Loader } from "semantic-ui-react";

export default function PokemonInfo(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [pokemonInfo, setPokemonInfo] = useState(null);

  useEffect(() => {
    const loadInfo = async () => {
      if (props.pokemonNumber === 0) {
        return;
      }
      setPokemonInfo(await getPokemonInfo(props.pokemonNumber));
      setIsLoading(false);
    };
    loadInfo();
  }, [props.pokemonNumber]);

  function handleInfoOpen(isOpen) {
    props.handleInfoOpen(isOpen);
  }

  return (
    <Modal
      closeIcon
      onClose={() => handleInfoOpen(false)}
      onOpen={() => handleInfoOpen(true)}
      open={props.open}
      trigger={null}
    >
      <Modal.Header>
        {pokemonInfo &&
          pokemonInfo.name
            .split(" ")
            .map(
              (letter) => letter.charAt(0).toUpperCase() + letter.substring(1)
            )
            .join(" ")}
      </Modal.Header>
      {isLoading ? (
        <Loader />
      ) : (
        <Modal.Content>
          <Grid textAlign="center">
            <PokemonImage pokemonNumber={props.pokemonNumber} />
            <PokemonImage
              pokemonNumber={props.pokemonNumber}
              showShiny={true}
            />
          </Grid>
          <Message>
            <Message.Header>Abilities</Message.Header>
            {pokemonInfo &&
              pokemonInfo.abilities
                .map((a) => {
                  return a.ability.name
                    .toLowerCase()
                    .split("-")
                    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                    .join(" ");
                })
                .join(", ")}
          </Message>
        </Modal.Content>
      )}
    </Modal>
  );
}
