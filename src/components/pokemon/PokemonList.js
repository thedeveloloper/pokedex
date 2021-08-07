import React, { useState, useEffect } from "react";

import {
  Grid,
  Divider,
  Header,
  Container,
  Checkbox,
  Pagination,
  Search,
} from "semantic-ui-react";

import PokemonCard from "./PokemonCard";

import { getPokemonList } from "../../services/GetPokemon";

export default function PokemonList() {
  let [currentPage, setCurrentPage] = useState(1);
  let [pokemon, setPokemon] = useState(null);
  let [isLoading, setIsLoading] = useState(true);
  let [showShiny, setShowShiny] = useState(false);

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

      <Grid padded={20}>
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
        <Container>
          <Header align="center" size="huge">
            Loading Pokemon...
          </Header>
        </Container>
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
