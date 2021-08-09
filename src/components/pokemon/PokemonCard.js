import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import PokemonImage from "../pokemon/PokemonImage";
import PokemonInfo from "../pokemon/PokemonInfo";

import { getPokemonInfo } from "../../services/HTTPGet";

import { Card, Grid, Divider, Loader } from "semantic-ui-react";

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
    const loadData = async () => {
      setPokemonInfo(await getPokemonInfo(pokemonNumber));
      setIsLoading(false);
    };
    loadData();
  }, [pokemonNumber]);

  return (
    // <Link to={`pokemon/${pokemonNumber}`}>
    // <Card className="pokemonCard" raised={true} onClick={Link.to}>

    <Card className="pokemonCard" raised>
      <PokemonImage pokemonNumber={pokemonNumber} showShiny={props.showShiny} />
      <Card.Content>
        <Card.Header>
          <Grid columns={2}>
            <Grid.Row>
              <Grid.Column>
                {name
                  .split(" ")
                  .map(
                    (letter) =>
                      letter.charAt(0).toUpperCase() + letter.substring(1)
                  )
                  .join(" ")}
              </Grid.Column>
              <Grid.Column textAlign={"right"}>{pokemonNumber}</Grid.Column>
            </Grid.Row>

            <Grid.Row>
              {isLoading ? (
                <Loader />
              ) : (
                pokemonInfo.types.map((t) => {
                  return (
                    <Grid.Column key={t.type.name}>
                      <div
                        style={{
                          padding: "0px",
                          width: "100%",
                          height: "15px",
                          borderRadius: "5px",
                          backgroundColor: `${TYPE_COLORS[t.type.name]}`,
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            fontSize: "10px",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "85%",
                          }}
                        >
                          {t.type.name}
                        </div>
                      </div>
                    </Grid.Column>
                  );
                })
              )}
            </Grid.Row>
          </Grid>
        </Card.Header>
        <Card.Description></Card.Description>
        <Divider />
        <PokemonInfo pokemonNumber={pokemonNumber} />
      </Card.Content>
    </Card>
    // </Link>
  );
}

export default PokemonCard;
