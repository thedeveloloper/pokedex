import React, { useState, useEffect } from "react";

import {
  Grid,
  Divider,
  Loader,
  Form,
  Pagination,
  Search,
} from "semantic-ui-react";

import PokemonInfo from "./PokemonInfo";
import PokemonCard from "./PokemonCard";

import { getPokemonList } from "../../services/HTTPGet";

export default function PokemonList() {
  const [currentPage, setCurrentPage] = useState(1);
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
      // pokemon.map((k, v) => {
      //   console.log(k.name, v + 1);
      // });
    };
    loadPage();
  }, []);

  return (
    <div>
      <Divider />

      <Form as="div">
        <Form.Group inline>
          <Search onSearchChange={handleSearchChange} />
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
            .filter((p) => {
              if (query === "") {
                return p;
              } else if (p.name.toLowerCase().includes(query.toLowerCase())) {
                return p;
              } else {
                return;
              }
            })
            .map((p, n) => (
              <Grid.Column key={p.name}>
                <PokemonCard
                  openTrigger={openInfo}
                  pokemonNumber={p.url.split("/")[p.url.split("/").length - 2]}
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
            ))}
        </Grid>
      )}
      <Divider />
      <PokemonInfo pokemonNumber={pokemonInfoNumber} open={infoOpen} />
    </div>
  );
}
