import React, { useEffect } from "react";
import axios from "axios";

function PokemonGet() {
  const apiUrl = "https://pokeapi.co/api/v2/pokemon";

  useEffect(() => {
    setLoading(true);
    let cancel;

    axios
      .get(apiUrl, {
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
      .then((res) => {
        setLoading(false);
        setNextPageUrl(res.data.next);
        setPrevPageUrl(res.data.previous);
        setPokemon(res.data.results.map((p) => p.name));
      });

    return () => cancel();
  }, [currentPageUrl]);

  if (loading) return "Loading...";
  return [pokemon, nextPageUrl, prevPageUrl];
}

export default PokemonGet;
