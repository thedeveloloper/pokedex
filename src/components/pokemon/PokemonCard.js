import React, { useEffect, useState } from "react";

import PokemonImage from "../pokemon/PokemonImage";
import LazyLoad from "../../services/LazyLoad";

import { getPokemonInfo } from "../../services/HTTPGet";

import { Card, Grid, Loader, Icon, Label } from "semantic-ui-react";

import "./PokemonCard.css";

import data from "../../data.json";

function PokemonCard(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [pokemonInfo, setPokemonInfo] = useState([]);

  function getSymbol(name) {
    if (!name) {
      return "";
    }

    return name.split("-")[1] === "f" ? (
      <Icon name="woman" />
    ) : (
      <Icon name="man" />
    );
  }

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
        lazy={props.lazy}
        pokemonNumber={props.pokemonNumber}
        showShiny={props.showShiny}
      />

      <Card.Content>
        <Card.Header>
          {props.name.split("-")[0]}
          <sup>{getSymbol(props.name)}</sup>
          <Label size="medium" content={props.pokemonNumber} circular />
        </Card.Header>
      </Card.Content>

      <Card.Content extra>
        {isLoading ? (
          <Loader />
        ) : (
          <Grid columns={2}>
            {pokemonInfo.types.map((t) => (
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
                      color: "white",
                    }}
                  >
                    {t.type.name.toUpperCase()}
                  </div>
                </div>
              </Grid.Column>
            ))}
          </Grid>
        )}
      </Card.Content>
    </Card>
  );
}

export default PokemonCard;
