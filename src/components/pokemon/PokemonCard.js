import React from "react";

import { Button, Card, Image } from "semantic-ui-react";

export default function PokemonCard(props) {
  const pokemon = props.pokemon;
  return (
    <Button onClick={null}>
      <Card>
        <Image src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png" />
        <Card.Content>
          <Card.Header>{pokemon}</Card.Header>
          <Card.Meta>Type</Card.Meta>
          <Card.Description>Pokemon Description</Card.Description>
        </Card.Content>
      </Card>
    </Button>
  );
}
