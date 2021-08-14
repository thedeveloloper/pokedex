import axios from "axios";

import config from "../config.json";

export const httpGet = (url, query) => {
  return axios
    .get(url, {
      params: query,
    })
    .then(function (res) {
      return res.data;
    })
    .catch(function (error) {
      console.log(error);
      return error;
    })
    .then(function () {
      console.log("Axios Call Complete");
    });
};

export const getPokemonList = async (pageNumber, entriesPerPage = 20) => {
  const { data } = await axios.get(`${config.apiEndpointPokemon}`, {
    params: {
      offset: (pageNumber - 1) * 20,
      limit: entriesPerPage,
    },
  });
  return data["results"];
};

export const getPokemonInfo = async (pokemonNumber) => {
  const data = await axios.get(`${config.apiEndpointPokemon}/${pokemonNumber}`);
  return data.data;
};

export const getPokemonSpeciesInfo = async (pokemonNumber) => {
  const data = await axios.get(`${config.apiEndpointSpecies}/${pokemonNumber}`);
  return data.data;
};

export const getPokemonImage = (pokemonNumber, shiny = false) => {
  return `${config.imageEndpoint}${
    shiny ? "/shiny" : ""
  }/${pokemonNumber}.png?raw=true`;
};
export const getItemList = async (pageNumber, entriesPerPage = 20) => {
  const { data } = await axios.get(`${config.apiEndpointPokemon}`, {
    params: {
      offset: (pageNumber - 1) * 20,
      limit: entriesPerPage,
    },
  });
  return data["results"];
};

export const getItemInfo = async (pokemonNumber) => {
  const data = await axios.get(`${config.apiEndpointPokemon}/${pokemonNumber}`);
  return data.data;
};

export const getItemImage = (pokemonNumber, shiny = false) => {
  return `${config.imageEndpoint}${
    shiny ? "/shiny" : ""
  }/${pokemonNumber}.png?raw=true`;
};
export const getBerryList = async (pageNumber, entriesPerPage = 20) => {
  const { data } = await axios.get(`${config.apiEndpointPokemon}`, {
    params: {
      offset: (pageNumber - 1) * 20,
      limit: entriesPerPage,
    },
  });
  return data["results"];
};

export const getBerryInfo = async (pokemonNumber) => {
  const data = await axios.get(`${config.apiEndpointPokemon}/${pokemonNumber}`);
  return data.data;
};

export const getBerryImage = (pokemonNumber, shiny = false) => {
  return `${config.imageEndpoint}${
    shiny ? "/shiny" : ""
  }/${pokemonNumber}.png?raw=true`;
};
