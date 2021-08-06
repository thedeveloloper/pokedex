import axios from "axios";

import { Image } from "semantic-ui-react";

export const axiosGet = (url, query) => {
  return axios
    .get(url, {
      params: query,
    })
    .then(function (res) {
      console.log(res.data);
      return res.data;
    })
    .catch(function (error) {
      console.log(error);
      return error;
    })
    .then(function () {
      // always executed
    });
};

export const getPokemonList = (pageNumber, entriesPerPage = 20) => {
  // const apiEndpoint = `https://pokeapi.co/api/v2/pokemon?offset=${pageNumber}&limit=20`;
  const apiEndpoint = `https://pokeapi.co/api/v2/pokemon`;
  return axios
    .get(apiEndpoint, {
      params: {
        offset: (pageNumber - 1) * 20,
        limit: entriesPerPage,
      },
    })
    .then(function (res) {
      return res.data;
    })
    .catch(function (error) {
      console.log(error);
      return error;
    })
    .then(function () {
      console.log("Pokemon list aquired.");
    });
};

export const getPokemonInfo = (pokemonNumber) => {
  const apiEndpoint = `https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`;
  return axios
    .get(apiEndpoint)
    .then(function (res) {
      return res.data;
    })
    .catch(function (error) {
      console.log(error);
      return error;
    })
    .then(function () {
      console.log("Pokemon info aquired.");
    });
};

export const getPokemonImage = (pokemonNumber, shiny = false) => {
  const imageUrl = shiny
    ? `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/shiny/${pokemonNumber}.png?raw=true`
    : `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${pokemonNumber}.png?raw=true`;
  return <Image src={imageUrl} size={"medium"} />;
};
