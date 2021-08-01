import React from "react";

import axios from "axios";

class GetInfo extends React.Component {
  constructor(state) {
    super();
    this.state = {
      url: "https://pokeapi.co/api/v2/pokemon/",
      pokemon: null,
    };
  }

  async getPokemon() {
    axios
      .get(this.state[0], {
        params: null,
      })
      .then(function (response) {
        console.log(response);
        return response;
      })
      .catch(function (error) {
        console.log(error);
        return error;
      })
      .then(function () {
        // always executed
      });
  }
}

export default GetInfo;
