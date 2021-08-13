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
    if (
      !name ||
      (name.split("-").pop() !== "f" && name.split("-").pop() !== "m")
    ) {
      return (
        <div>
          <Icon color="blue" name="woman" />
          <Icon color="red" name="man" />
        </div>
      );
    }
    return name.split("-")[1] === "f" ? (
      <Icon color="blue" name="woman" />
    ) : (
      <Icon color="red" name="man" />
    );
  }

  function getName(name) {
    if (!name) {
      return "";
    }
    let splitName = name.split("-");

    if (
      splitName[splitName.length - 1] === "f" ||
      splitName[splitName.length - 1] === "m"
    ) {
      splitName.pop();
    }

    return splitName
      .map((letter) => letter.charAt(0).toUpperCase() + letter.substring(1))
      .join(" ");
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
          {getName(props.name)}
          <sup>{getSymbol(props.name)}</sup>
          <Label size="medium" content={props.pokemonNumber} circular />
        </Card.Header>
      </Card.Content>

      <Card.Content extra>
        {isLoading ? (
          <Loader />
        ) : (
          <Grid columns={2}>
            {pokemonInfo &&
              pokemonInfo.types.map((t) => (
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
