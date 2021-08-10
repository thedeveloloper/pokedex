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

import { getPokemonList } from "../../services/HTTPGet";

export default function PokemonList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemon, setPokemon] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showShiny, setShowShiny] = useState(false);
  const [query, setQuery] = useState("");

  function shinyCheckboxHandler() {
    setShowShiny(!showShiny);
  }

  function onPageChangeHandler(e, pageInfo) {
    setCurrentPage(pageInfo.activePage);
  }

  function handleSearchChange(k, v) {
    setQuery(v.value);
  }

  useEffect(() => {
    const changePage = async () => {
      setIsLoading(true);
      // setPokemon(await getPokemonList(currentPage, 20));
      setPokemon(await getPokemonList(1, 2000));
      setIsLoading(false);
      // pokemon.map((k, v) => {
      //   console.log(k.name, v + 1);
      // });
    };
    changePage();
  }, [currentPage]);

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

      <div align="center">
        <Pagination
          activePage={currentPage}
          onPageChange={onPageChangeHandler}
          firstItem={null}
          lastItem={null}
          pointing
          secondary
          totalPages={56}
        />
      </div>
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
                <PokemonInfo
                  pokemonNumber={n + 1}
                  name={p.name
                    .split(" ")
                    .map(
                      (letter) =>
                        letter.charAt(0).toUpperCase() + letter.substring(1)
                    )
                    .join(" ")}
                  url={p.url}
                  imageUrl={p.url.split("/")[p.url.split("/").length - 2]}
                  showShiny={showShiny}
                />
              </Grid.Column>
            ))}
        </Grid>
      )}
      <Divider />
      <div align="center">
        <Pagination
          activePage={currentPage}
          onPageChange={onPageChangeHandler}
          firstItem={null}
          lastItem={null}
          pointing
          secondary
          totalPages={56}
        />
      </div>
      <Divider />
    </div>
  );
}
