import React, { useState, useEffect } from "react";

import {
  Grid,
  Divider,
  Loader,
  Form,
  Pagination,
  Search,
  Placeholder,
} from "semantic-ui-react";

import PokemonCard from "./PokemonCard";

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
      setPokemon(await getPokemonList(currentPage, 2000));
      setIsLoading(false);
      // pokemon.map((k, v) => {
      //   console.log(k.name, v + 1);
      // });
    };
    changePage();
  }, [currentPage]);

  // useEffect(() => {
  //   const changePage = async () => {
  //     setPokemon(await getPokemonList(currentPage, 20));
  //     setIsLoading(false);
  //   };
  //   changePage();
  // }, []);

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
                return;
              } else if (p.name.toLowerCase().includes(query.toLowerCase())) {
                return p;
              } else {
                return;
              }
            })
            .map((p) => (
              <Grid.Column key={p.name}>
                <PokemonCard name={p.name} url={p.url} showShiny={showShiny} />
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
