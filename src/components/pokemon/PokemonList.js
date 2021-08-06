import React, { useState, useEffect } from "react";

import { Grid, Divider, Header, Container } from "semantic-ui-react";

import PokemonCard from "./PokemonCard";
import PageSelector from "../layout/PageSelector";

import { getPokemonList } from "../../services/GetPokemon";

export default function PokemonList() {
  let [currentPage, setCurrentPage] = useState(1);
  let [pokemon, setPokemon] = useState(null);
  let [isLoading, setIsLoading] = useState(true);

  function onNextClickHandler() {
    if (currentPage < 56) {
      setCurrentPage(currentPage + 1);
    } else {
      setCurrentPage(1);
    }
  }

  function onPrevClickHandler() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else {
      setCurrentPage(56);
    }
  }

  useEffect(() => {
    setIsLoading(true);
    const changePage = async () => {
      setPokemon(await getPokemonList(currentPage));
      setIsLoading(false);
    };
    changePage();
  }, [currentPage]);

  return (
    <Container>
      <Divider />
      <div align="center">
        <PageSelector
          onNextClick={onNextClickHandler}
          onPrevClick={onPrevClickHandler}
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
          <Grid align="center" columns={5}>
            {pokemon.map((p) => (
              <Grid.Column>
                <PokemonCard key={p.name} name={p.name} url={p.url} />
              </Grid.Column>
            ))}
          </Grid>
        </Container>
      )}
      <Divider />
      <div align="center">
        <PageSelector
          onNextClick={onNextClickHandler}
          onPrevClick={onPrevClickHandler}
        />
      </div>
      <Divider />
    </Container>
  );
}
