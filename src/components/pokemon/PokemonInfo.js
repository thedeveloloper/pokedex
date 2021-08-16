import React, { useState, useEffect } from "react";

import PokemonImage from "./PokemonImage";
import { getPokemonInfo, getPokemonSpeciesInfo } from "../../services/HTTPGet";

import { Modal, Grid, Message, Loader } from "semantic-ui-react";

export default function PokemonInfo(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [pokemonInfo, setPokemonInfo] = useState(null);
  const [pokemonSpeciesInfo, setPokemonSpeciesInfo] = useState(null);

  useEffect(() => {
    const loadInfo = async () => {
      if (props.pokemonNumber === 0) {
        return null;
      }
      setIsLoading(true);
      setPokemonInfo(await getPokemonInfo(props.pokemonNumber));
      setPokemonSpeciesInfo(await getPokemonSpeciesInfo(props.pokemonNumber));
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
            <PokemonImage pokemonNumber={props.pokemonNumber} size="small" />
            <PokemonImage
              pokemonNumber={props.pokemonNumber}
              size="small"
              showShiny={true}
            />
          </Grid>
          <Message>
            <Message.Header>Description</Message.Header>
            {pokemonSpeciesInfo &&
              pokemonSpeciesInfo.flavor_text_entries.map((f, i) =>
                f.language.name === "en" &&
                (f.version.name === "sword" || f.version.name === "shield") ? (
                  <div
                    key={`${f.language.name}${i}`}
                    style={{ padding: "10px" }}
                  >
                    <div
                      style={{
                        backgroundColor:
                          f.version.name === "sword" ? "blue" : "red",
                        borderRadius: "5px",
                        padding: "10px",
                      }}
                    >
                      <div style={{ color: "white" }}>{`${f.version.name
                        .split(" ")
                        .map(
                          (letter) =>
                            letter.charAt(0).toUpperCase() + letter.substring(1)
                        )
                        .join(" ")}: ${f.flavor_text}`}</div>
                    </div>
                  </div>
                ) : (
                  ""
                )
              )}
          </Message>
          <Message>
            <Message.Header>Stats</Message.Header>
            {pokemonInfo &&
              pokemonInfo.stats.map((stat) => {
                return (
                  <div key={stat.stat.name}>{`${stat.stat.name
                    .toLowerCase()
                    .split("-")
                    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                    .join(" ")}: ${stat["base_stat"]}`}</div>
                );
              })}
          </Message>
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
          <Message>
            <Message.Header>Height</Message.Header>
            {pokemonInfo &&
              `${
                Math.round((pokemonInfo.height * 0.328084 + 0.00001) * 100) /
                100
              }'`}
          </Message>
          <Message>
            <Message.Header>Height</Message.Header>
            {pokemonInfo &&
              `${
                Math.round((pokemonInfo.weight * 0.220462 + 0.00001) * 100) /
                100
              }lbs`}
          </Message>
          <Message>
            <Message.Header>EVs</Message.Header>
            {pokemonInfo &&
              pokemonInfo.stats
                .filter((stat) => {
                  if (stat.effort > 0) {
                    return true;
                  }
                  return false;
                })
                .map((stat) => {
                  return `${stat.effort} ${stat.stat.name
                    .toLowerCase()
                    .split("-")
                    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                    .join(" ")}`;
                })
                .join(", ")}
          </Message>
          <Message>
            <Message.Header>Gender Ratios</Message.Header>
            Female: {12.5 * pokemonSpeciesInfo["gender_rate"]}% Male:{" "}
            {12.5 * (8 - pokemonSpeciesInfo["gender_rate"])}%
          </Message>
          <Message>
            <Message.Header>Egg Groups</Message.Header>
            {pokemonSpeciesInfo &&
              pokemonSpeciesInfo["egg_groups"]
                .map((group) => {
                  return group.name
                    .toLowerCase()
                    .split(" ")
                    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                    .join(" ");
                })
                .join(", ")}
          </Message>
          <Message>
            <Message.Header>Hatch Steps</Message.Header>
            {pokemonSpeciesInfo &&
              255 * (pokemonSpeciesInfo["hatch_counter"] + 1)}
          </Message>
        </Modal.Content>
      )}
    </Modal>
  );
}
