import React, { useState, useEffect } from "react";

import PokemonImage from "../pokemon/PokemonImage";
import { getPokemonInfo } from "../../services/HTTPGet";

import { Modal, Button, Grid, Message } from "semantic-ui-react";

export default function PokemonInfo(props) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [pokemonInfo, setPokemonInfo] = useState(null);

  useEffect(() => {
    const loadInfo = async () => {
      setPokemonInfo(await getPokemonInfo(props.pokemonNumber));
      setIsLoading(false);
    };
    loadInfo();
  }, [props]);

  return (
    <Modal
      closeIcon
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button icon="info" fluid size="huge" />}
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
      {isLoading ? null : (
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
            {pokemonInfo.abilities
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
