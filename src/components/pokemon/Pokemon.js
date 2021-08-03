import React, { Component } from "react";
import Axios from "axios";

import { Loader, Container, Message, Image } from "semantic-ui-react";

import TYPE_COLORS from "../../services/TypeColors";

export default class Pokemon extends Component {
  state = {
    name: "",
    url: "",
    pokemonIndex: "",
    imageUrl: "",
    types: [],
    description: "",
    statTitleWidth: 3,
    statBarWidth: 9,
    stats: {
      hp: "",
      attack: "",
      defense: "",
      speed: "",
      specialAttack: "",
      specialDefense: "",
    },
    height: "",
    weight: "",
    eggGroups: "",
    catchRate: "",
    abilities: "",
    genderRatioMale: "",
    genderRatioFemale: "",
    evs: "",
    hatchSteps: "",
    themeColor: "#EF5350",
  };

  async componentDidMount() {
    const { pokemonIndex } = this.props.match.params;

    // Urls for pokemon information
    const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`;
    const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonIndex}/`;

    // Get Pokemon Information
    const pokemonRes = await Axios.get(pokemonUrl);

    const name = pokemonRes.data.name;
    const imageUrl = pokemonRes.data.sprites.front_default;

    let { hp, attack, defense, speed, specialAttack, specialDefense } = "";

    pokemonRes.data.stats.map((stat) => {
      switch (stat.stat.name) {
        case "hp":
          hp = stat["base_stat"];
          break;
        case "attack":
          attack = stat["base_stat"];
          break;
        case "defense":
          defense = stat["base_stat"];
          break;
        case "speed":
          speed = stat["base_stat"];
          break;
        case "special-attack":
          specialAttack = stat["base_stat"];
          break;
        case "special-defense":
          specialDefense = stat["base_stat"];
          break;
        default:
          break;
      }
    });

    // Convert Decimeters to Feet... The + 0.0001 * 100 ) / 100 is for rounding to two decimal places :)
    const height =
      Math.round((pokemonRes.data.height * 0.328084 + 0.00001) * 100) / 100;

    const weight =
      Math.round((pokemonRes.data.weight * 0.220462 + 0.00001) * 100) / 100;

    const types = pokemonRes.data.types.map((type) => type.type.name);

    const themeColor = `${TYPE_COLORS[types[types.length - 1]]}`;

    const abilities = pokemonRes.data.abilities
      .map((ability) => {
        return ability.ability.name
          .toLowerCase()
          .split("-")
          .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
          .join(" ");
      })
      .join(", ");

    const evs = pokemonRes.data.stats
      .filter((stat) => {
        if (stat.effort > 0) {
          return true;
        }
        return false;
      })
      .map((stat) => {
        return `${stat.effort} ${stat.stat.name
          .toLowerCase()
          .split("-")
          .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
          .join(" ")}`;
      })
      .join(", ");

    // Get Pokemon Description .... Is from a different end point uggh
    await Axios.get(pokemonSpeciesUrl).then((res) => {
      let description = "";
      res.data.flavor_text_entries.some((flavor) => {
        if (flavor.language.name === "en") {
          description = flavor.flavor_text;
        }
      });
      const femaleRate = res.data["gender_rate"];
      const genderRatioFemale = 12.5 * femaleRate;
      const genderRatioMale = 12.5 * (8 - femaleRate);

      const catchRate = Math.round((100 / 255) * res.data["capture_rate"]);

      const eggGroups = res.data["egg_groups"]
        .map((group) => {
          return group.name
            .toLowerCase()
            .split(" ")
            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(" ");
        })
        .join(", ");

      const hatchSteps = 255 * (res.data["hatch_counter"] + 1);

      this.setState({
        description,
        genderRatioFemale,
        genderRatioMale,
        catchRate,
        eggGroups,
        hatchSteps,
      });
    });

    const url = "";

    this.setState({
      imageUrl,
      pokemonIndex,
      name,
      url,
      types,
      stats: {
        hp,
        attack,
        defense,
        speed,
        specialAttack,
        specialDefense,
      },
      themeColor,
      height,
      weight,
      abilities,
      evs,
    });
  }

  render() {
    return (
      <Container>
        <Container color="#ccc" align="center">
          <Image
            src={this.state.imageLoading ? Loader : this.state.imageUrl}
            size={"medium"}
            onLoad={() => {
              this.setState({ imageLoading: false });
            }}
            onError={() => {
              this.setState({ tooManyRequests: true });
            }}
          />
        </Container>
        <Container>
          <Message>Name: {this.state.name}</Message>
          <Message>HP: {this.state.hp}</Message>
          <Message>Attack: {this.state.attack}</Message>
          <Message>Defense: {this.state.defense}</Message>
          <Message>Speed: {this.state.speed}</Message>
          <Message>Special Attack: {this.state.specialAttack}</Message>
          <Message>Special Defense: {this.state.specialDefense}</Message>
        </Container>
      </Container>
    );
  }
}
