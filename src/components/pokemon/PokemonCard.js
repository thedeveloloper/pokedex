import React, { useEffect, useState } from "react";

import PokemonImage from "../pokemon/PokemonImage";

import { getPokemonInfo } from "../../services/HTTPGet";
import LazyLoad from "../../services/LazyLoad";

import { Card, Grid, Loader } from "semantic-ui-react";

import "./PokemonCard.css";

import data from "../../data.json";

function PokemonCard(props) {
  // const pokemonNumber = url.split("/")[url.split("/").length - 2];
  const [isLoading, setIsLoading] = useState(true);
  const [pokemonInfo, setPokemonInfo] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setPokemonInfo(await getPokemonInfo(props.pokemonNumber));
      setIsLoading(false);
    };
    loadData();
  }, [props.pokemonNumber]);

  return (
    <Card className="pokemonCard" onClick={props.openTrigger} raised>
      <PokemonImage
        pokemonNumber={props.pokemonNumber}
        showShiny={props.showShiny}
      />
      <Card.Content>
        <Card.Header>
          <Grid columns={2}>
            <Grid.Row>
              <Grid.Column>{props.name}</Grid.Column>
              <Grid.Column textAlign={"right"}>
                {props.pokemonNumber}
              </Grid.Column>
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
                          backgroundColor: `${data.TYPE_COLORS[t.type.name]}`,
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
                          {t.type.name.toUpperCase()}
                        </div>
                      </div>
                    </Grid.Column>
                  );
                })
              )}
            </Grid.Row>
          </Grid>
        </Card.Header>
        <Card.Description>Placeholder</Card.Description>
      </Card.Content>
    </Card>
  );
}

export default PokemonCard;
