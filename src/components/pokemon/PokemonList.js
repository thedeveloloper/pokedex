import React, { useState, useEffect } from "react";

import { Divider, Card, Form } from "semantic-ui-react";

import PokemonInfo from "./PokemonInfo";
import PokemonCard from "./PokemonCard";

import { getPokemonList } from "../../services/HTTPGet";

export default function PokemonList() {
  const [pokemon, setPokemon] = useState([]);
  const [showShiny, setShowShiny] = useState(false);
  const [query, setQuery] = useState("");
  const [infoOpen, setInfoOpen] = useState(false);
  const [infoNumber, setInfoNumber] = useState(0);

  function shinyCheckboxHandler() {
    setShowShiny(!showShiny);
  }

  function handleSearchChange(k, v) {
    setQuery(v.value);
  }

  function handleInfoOpen(isOpen) {
    setInfoOpen(isOpen);
  }

  function handleInfoNumber(n) {
    setInfoNumber(n);
  }

  useEffect(() => {
    const loadPage = async () => {
      setPokemon(await getPokemonList(1, 151));
    };
    loadPage();
  }, []);

  return (
    <div>
      <Form as="div">
        <Form.Group inline>
          <Form.Input
            label="Search"
            results={pokemon}
            onChange={handleSearchChange}
          />

          <Form.Checkbox
            label="Show shiny sprites?"
            defaultChecked={false}
            onChange={shinyCheckboxHandler}
          />
        </Form.Group>
      </Form>

      <Divider />

      <Card.Group centered>
        {pokemon &&
          pokemon
            .filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))
            .map((p, n) => {
              return (
                <PokemonCard
                  key={p.name}
                  handleInfoOpen={handleInfoOpen}
                  handleInfoNumber={handleInfoNumber}
                  lazy={n >= 20 ? true : false}
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
              );
            })}
      </Card.Group>

      <Divider />
      <PokemonInfo
        pokemonNumber={infoNumber}
        open={infoOpen}
        handleInfoOpen={handleInfoOpen}
      />
    </div>
  );
}
