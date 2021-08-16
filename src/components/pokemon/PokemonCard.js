import React, { useEffect, useState } from "react";

import PokemonImage from "./PokemonImage";

import { getPokemonInfo, getPokemonSpeciesInfo } from "../../services/HTTPGet";

import { Card, Grid, Loader, Icon, Label } from "semantic-ui-react";

import "./PokemonCard.css";

import types from "../../types.json";

function PokemonCard(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [pokemonInfo, setPokemonInfo] = useState([]);
  const [speciesInfo, setSpeciesInfo] = useState([]);

  function getSymbol(name) {
    if (!name) {
      return;
    }
    if (speciesInfo.gender_rate === -1) {
      return <Icon size="small" color="black" name="genderless" />;
    }
    if (speciesInfo.gender_rate === 0) {
      return <Icon size="small" color="red" name="man" />;
    }
    if (speciesInfo.gender_rate === 8) {
      return <Icon size="small" color="blue" name="woman" />;
    }
    return (
      <div>
        <Icon size="small" color="blue" name="woman" />
        <Icon size="small" color="red" name="man" />
      </div>
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

  function handleClick() {
    props.handleInfoNumber(props.pokemonNumber);
    props.handleInfoOpen(true);
  }

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setPokemonInfo(await getPokemonInfo(props.pokemonNumber));
      setSpeciesInfo(await getPokemonSpeciesInfo(props.pokemonNumber));
      setIsLoading(false);
    };
    loadData();
  }, [props.pokemonNumber]);

  return (
    <Card className="pokemonCard" onClick={handleClick} raised>
      <Label corner size="massive">
        <div
          style={{
            position: "relative",
            left: "22px",
            top: "15px",
            fontSize: props.pokemonNumber.length > 3 ? "15px" : "25px",
          }}
        >
          {parseInt(props.pokemonNumber)}
        </div>
      </Label>
      <div>
        <PokemonImage
          lazy={props.lazy}
          pokemonNumber={props.pokemonNumber}
          showShiny={props.showShiny}
          size="small"
        />
      </div>

      <Card.Content>
        <Card.Header>
          <Grid columns={2}>
            <Grid.Row>
              <Grid.Column>{getName(props.name)}</Grid.Column>
              <Grid.Column textAlign="right">
                {getSymbol(props.name)}
              </Grid.Column>
            </Grid.Row>
          </Grid>
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
                      backgroundColor: `${types.TYPE_COLORS[t.type.name]}`,
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
