import axios from "axios";

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

export const getPokemonList = async (pageNumber, entriesPerPage = 20) => {
  // https://pokeapi.co/api/v2/pokemon?offset=${pageNumber}&limit=${entriesPerPage}
  const apiEndpoint = `https://pokeapi.co/api/v2/pokemon`;
  const { data } = await axios.get(apiEndpoint, {
    params: {
      offset: (pageNumber - 1) * 20,
      limit: entriesPerPage,
    },
  });
  return data["results"];
};

export const getPokemonInfo = async (pokemonNumber) => {
  const apiEndpoint = `https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`;
  const data = await axios.get(apiEndpoint);
  return data.data;
};

export const getPokemonImage = (pokemonNumber, shiny = false) => {
  return shiny
    ? `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/shiny/${pokemonNumber}.png?raw=true`
    : `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${pokemonNumber}.png?raw=true`;
};
