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

export const getPokemonList = (url) => {
  return axios
    .get(url)
    .then(function (res) {
      console.log(res.data);
      return res.data;
    })
    .catch(function (error) {
      console.log(error);
      return error;
    })
    .then(function () {
      console.log("List aquired.");
    });
};
