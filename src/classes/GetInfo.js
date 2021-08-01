import axios from "axios";

class GetInfo {
  constructor() {
    url = props.url;
    query = props.query ? props.query : null;
  }

  async getPokemon() {
    res = await axios
      .get(url, {
        params: query,
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
    sole.error(error);
  }
}

export default GetInfo;
