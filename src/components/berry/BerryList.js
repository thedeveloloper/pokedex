import React, { useState, useEffect } from "react";

import { Grid, Divider, Loader, Form, Input } from "semantic-ui-react";

import PokemonInfo from "./BerryInfo";
import PokemonCard from "./BerryCard";

import { getPokemonList } from "../../services/HTTPGet";

export default function PokemonList() {
  const [pokemon, setPokemon] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showShiny, setShowShiny] = useState(false);
  const [query, setQuery] = useState("");
  const [infoOpen, setInfoOpen] = useState(false);
  const [pokemonInfoNumber, setPokemonInfoNumber] = useState(0);

  function shinyCheckboxHandler() {
    setShowShiny(!showShiny);
  }

  function handleSearchChange(k, v) {
    setQuery(v.value);
  }

  function openInfo(n) {
    setPokemonInfoNumber(n);
    setInfoOpen(true);
  }

  useEffect(() => {
    const loadPage = async () => {
      setIsLoading(true);
      setPokemon(await getPokemonList(1, 151));
      setIsLoading(false);
    };
    loadPage();
  }, []);

  return (
    <div>
      <Divider />

      <Form as="div">
        <Form.Group inline>
          <Input results={pokemon} onChange={handleSearchChange} />
          <Form.Checkbox
            label="Show shiny sprites?"
            defaultChecked={false}
            onChange={shinyCheckboxHandler}
          />
        </Form.Group>
      </Form>

      <Divider />

      {isLoading ? (
        <Loader />
      ) : (
        <Grid container align="left" columns={5} stackable>
          {pokemon
            .filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))
            .map((p, i) => {
              return (
                <Grid.Column key={p.name}>
                  <PokemonCard
                    openTrigger={openInfo}
                    lazy={i >= 20 ? true : false}
                    pokemonNumber={
                      p.url.split("/")[p.url.split("/").length - 2]
                    }
                    name={p.name
                      .split(" ")
                      .map(
                        (letter) =>
                          letter.charAt(0).toUpperCase() + letter.substring(1)
                      )
                      .join(" ")}
                    url={p.url}
                    showShiny={showShiny}
                  />
                </Grid.Column>
              );
            })}
        </Grid>
      )}
      <Divider />
      <PokemonInfo pokemonNumber={pokemonInfoNumber} open={infoOpen} />
    </div>
  );
}
