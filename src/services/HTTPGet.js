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
  const { data } = await axios.get(`${config.API_ENDPOINT}`, {
    params: {
      offset: (pageNumber - 1) * 20,
      limit: entriesPerPage,
    },
  });
  return data["results"];
};

export const getPokemonInfo = async (pokemonNumber) => {
  const data = await axios.get(`${config.API_ENDPOINT}/${pokemonNumber}`);
  return data.data;
};

export const getPokemonImage = (pokemonNumber, shiny = false) => {
  return `${config.IMAGE_ENDPOINT}${
    shiny ? "/shiny" : ""
  }/${pokemonNumber}.png?raw=true`;
};
