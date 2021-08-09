import React, { useState, useEffect } from "react";

import {
  Grid,
  Divider,
  Loader,
  Container,
  Checkbox,
  Pagination,
  Search,
} from "semantic-ui-react";

import PokemonCard from "./PokemonCard";

import { getPokemonList } from "../../services/HTTPGet";

export default function PokemonList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemon, setPokemon] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showShiny, setShowShiny] = useState(false);

  function shinyCheckboxHandler(key, value) {
    setShowShiny(!showShiny);
  }

  function onChange(e, pageInfo) {
    setCurrentPage(pageInfo.activePage);
  }

  useEffect(() => {
    const changePage = async () => {
      setIsLoading(true);
      setPokemon(await getPokemonList(currentPage));
      setIsLoading(false);
    };
    changePage();
  }, [currentPage]);

  return (
    <div>
      <Divider />

      <Grid>
        <Search />
        <Checkbox
          label="Show shiny sprites?"
          defaultChecked={false}
          onChange={shinyCheckboxHandler}
        />
      </Grid>

      <Divider />

      <div align="center">
        <Pagination
          activePage={currentPage}
          onPageChange={onChange}
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
        <Container>
          <Grid align="left" columns={5}>
            {pokemon.map((p) => (
              <Grid.Column key={p.name}>
                <PokemonCard name={p.name} url={p.url} showShiny={showShiny} />
              </Grid.Column>
            ))}
          </Grid>
        </Container>
      )}
      <Divider />
      <div align="center">
        <Pagination
          activePage={currentPage}
          onPageChange={onChange}
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
