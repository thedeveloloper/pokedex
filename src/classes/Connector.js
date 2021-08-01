import "axios";

function Connector(props) {
  const axios = require("axios");
  const url = props.url;
  const query = props.query;

  async function getInfo() {
    axios
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
  return getInfo();
}

export default GetInfo;
