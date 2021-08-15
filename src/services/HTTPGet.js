import axios from "axios";

import config from "../config.json";

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
  return `${config.apiEnpointPokemonImage}${
    shiny ? "/shiny" : ""
  }/${pokemonNumber}.png?raw=true`;
};

export const getItemList = async (pageNumber, entriesPerPage = 20) => {
  const { data } = await axios.get(`${config.apiEndpointItem}`, {
    params: {
      offset: (pageNumber - 1) * 20,
      limit: entriesPerPage,
    },
  });
  return data["results"];
};

export const getItemInfo = async (itemNumber) => {
  const data = await axios.get(`${config.apiEndpointItem}/${itemNumber}`);
  return data.data;
};

export const getItemImage = (itemName) => {
  return `${config.apiEnpointItemImage}/${itemName}.png?raw=true`;
};

export const getBerryList = async (pageNumber, entriesPerPage = 20) => {
  const { data } = await axios.get(`${config.apiEndpointBerry}`, {
    params: {
      offset: (pageNumber - 1) * 20,
      limit: entriesPerPage,
    },
  });
  return data["results"];
};

export const getBerryInfo = async (berryNumber) => {
  const predata = await axios.get(`${config.apiEndpointBerry}/${berryNumber}`);
  const data = await axios.get(predata.data.item.url);
  return data.data;
};

export const getBerryImage = (berryName) => {
  return `${config.apiEnpointBerryImage}/${berryName}.png?raw=true`;
};
