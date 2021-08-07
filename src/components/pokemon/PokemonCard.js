import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import PokemonImage from "../pokemon/PokemonImage";
import PokemonInfo from "../pokemon/PokemonInfo";

import { getPokemonInfo } from "../../services/GetPokemon";

import { Card, Grid } from "semantic-ui-react";

import "./PokemonCard.css";

const TYPE_COLORS = {
  bug: "#B1C12E",
  dark: "#4F3A2D",
  dragon: "#755EDF",
  electric: "#FCBC17",
  fairy: "#F4B1F4",
  fighting: "#823551D",
  fire: "#E73B0C",
  flying: "#A3B3F7",
  ghost: "#6060B2",
  grass: "#74C236",
  ground: "#D3B357",
  ice: "#A3E7FD",
  normal: "#C8C4BC",
  poison: "#934594",
  psychic: "#ED4882",
  rock: "#B9A156",
  steel: "#B5B5C3",
  water: "#3295F6",
};

function PokemonCard(props) {
  const { name, url } = props;
  const pokemonNumber = url.split("/")[url.split("/").length - 2];
  const [isLoading, setIsLoading] = useState(true);
  const [pokemonInfo, setPokemonInfo] = useState();

  useEffect(() => {
    const getInfo = async () => {
      setIsLoading(true);
      await setPokemonInfo(await getPokemonInfo(pokemonNumber));
      // console.log(pokemonInfo.types.map((t) => t.type.name).map());
      setIsLoading(false);
    };
    getInfo();
  }, []);

  return (
    // <Link to={`pokemon/${pokemonNumber}`}>
    // <Card className="pokemonCard" raised={true} onClick={Link.to}>
    <div>
      <Card className="pokemonCard" raised={true}>
        <PokemonImage
          pokemonNumber={pokemonNumber}
          showShiny={props.showShiny}
        />
        <Card.Content>
          <Card.Header>
            {name
              .split(" ")
              .map(
                (letter) => letter.charAt(0).toUpperCase() + letter.substring(1)
              )
              .join(" ")}
            <Grid textAlign="center" padded="vertically">
              {isLoading
                ? null
                : pokemonInfo.types.map((t) => {
                    return (
                      <div
                        align="center"
                        padding="5px"
                        style={{
                          width: "40%",
                          padding: "5px 10px",
                          backgroundColor: `${TYPE_COLORS[t.type.name]}`,
                        }}
                      >
                        {t.type.name}
                      </div>
                    );
                  })}
            </Grid>
          </Card.Header>
          <Card.Description></Card.Description>
          <div floated="left">{pokemonNumber}</div>
          <PokemonInfo pokemonNumber={pokemonNumber} />
        </Card.Content>
      </Card>
    </div>
    // </Link>
  );
}

export default PokemonCard;
