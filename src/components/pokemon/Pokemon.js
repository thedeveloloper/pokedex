import React, { useState, useEffect } from "react";
import axios from "axios";

import { Loader, Container, Message, Image } from "semantic-ui-react";

import TYPE_COLORS from "../../services/TypeColors";

function Pokemon(props) {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [pokemonIndex, setPokemonIndex] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [types, setTypes] = useState([]);
  const [description, setDescription] = useState("");
  const [hp, setHp] = useState("");
  const [attack, setAttack] = useState("");
  const [defense, setDefense] = useState("");
  const [speed, setSpeed] = useState("");
  const [specialAttack, setSpecialAttack] = useState("");
  const [specialDefense, setSpecialDefense] = useState("");
  const [stats, setStats] = useState({});
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [eggGroups, setEggGroups] = useState("");
  const [catchRate, setCatchRate] = useState("");
  const [abilities, setAbilities] = useState("");
  const [genderRatioMale, setGenderRatioMale] = useState("");
  const [genderRatioFemale, setGenderRatioFemale] = useState("");
  const [evs, setEvs] = useState("");
  const [hatchSteps, setHatchSteps] = useState("");
  const [themeColor, setThemeColor] = useState("#EF5350");
  const [isLoading, setIsLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState(true);
  const [tooManyRequests, setTooManyRequests] = useState(false);

  const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`;
  const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonIndex}/`;
  setPokemonIndex(props.match.params);

  const pokemonRes = axios.get(pokemonUrl).then(setIsLoading(false));

  if (isLoading === false) {
    setName(pokemonRes.data.name);
    setImageUrl(pokemonRes.data.sprites.front_default);

    pokemonRes.data.stats.map((stat) => {
      switch (stat.stat.name) {
        case "hp":
          setHp(stat["base_stat"]);
          break;
        case "attack":
          setAttack(stat["base_stat"]);
          break;
        case "defense":
          setDefense(stat["base_stat"]);
          break;
        case "speed":
          setSpeed(stat["base_stat"]);
          break;
        case "special-attack":
          setSpecialAttack(stat["base_stat"]);
          break;
        case "special-defense":
          setSpecialDefense(stat["base_stat"]);
          break;
        default:
          break;
      }
    });

    setStats({
      hp: hp,
      attack: attack,
      defense: defense,
      speed: speed,
      specialAttack: specialAttack,
      specialDefense: specialDefense,
    });

    setHeight(
      Math.round((pokemonRes.data.height * 0.328084 + 0.00001) * 100) / 100
    );

    setWeight(
      Math.round((pokemonRes.data.weight * 0.220462 + 0.00001) * 100) / 100
    );

    setTypes(pokemonRes.data.types.map((type) => type.type.name));

    setThemeColor(`${TYPE_COLORS[types[types.length - 1]]}`);

    setAbilities(
      pokemonRes.data.abilities
        .map((ability) => {
          return ability.ability.name
            .toLowerCase()
            .split("-")
            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(" ");
        })
        .join(", ")
    );

    setEvs(
      pokemonRes.data.stats
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
        .join(", ")
    );

    axios.get(pokemonSpeciesUrl).then((res) => {
      res.data.flavor_text_entries.some((flavor) => {
        if (flavor.language.name === "en") {
          setDescription(flavor.flavor_text);
        }
      });
      const femaleRate = res.data["gender_rate"];
      setGenderRatioFemale(12.5 * femaleRate);
      setGenderRatioMale(12.5 * (8 - femaleRate));

      setCatchRate(Math.round((100 / 255) * res.data["capture_rate"]));

      setEggGroups(
        res.data["egg_groups"]
          .map((group) => {
            return group.name
              .toLowerCase()
              .split(" ")
              .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
              .join(" ");
          })
          .join(", ")
      );

      setHatchSteps(255 * (res.data["hatch_counter"] + 1));
    });
  }

  // const url = "";

  // this.setState({
  //   imageUrl,
  //   pokemonIndex,
  //   name,
  //   url,
  //   types,
  //   stats: {
  //     hp,
  //     attack,
  //     defense,
  //     speed,
  //     specialAttack,
  //     specialDefense,
  //   },
  //   themeColor,
  //   height,
  //   weight,
  //   abilities,
  //   evs,
  // });

  return (
    <Container>
      <Container color="#ccc" align="center">
        <Image
          src={imageLoading ? Loader : imageUrl}
          size={"medium"}
          onLoad={() => {
            setImageLoading(false);
          }}
          onError={() => {
            setTooManyRequests(true);
          }}
        />
      </Container>
      <Container>
        <Message>Name: {name}</Message>
        <Message>HP: {hp}</Message>
        <Message>Attack: {attack}</Message>
        <Message>Defense: {defense}</Message>
        <Message>Speed: {speed}</Message>
        <Message>Special Attack: {specialAttack}</Message>
        <Message>Special Defense: {specialDefense}</Message>
      </Container>
    </Container>
  );
}

export default Pokemon;
