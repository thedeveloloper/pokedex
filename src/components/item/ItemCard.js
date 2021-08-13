import React, { useEffect, useState } from "react";

import ItemImage from "../item/ItemImage";
import ItemInfo from "../item/ItemInfo";

import { getItemInfo } from "../../services/HTTPGet";

import { Card, Grid, Divider, Loader } from "semantic-ui-react";

import "./ItemCard.css";

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

function ItemCard(props) {
  const { name, url } = props;
  const ItemNumber = url.split("/")[url.split("/").length - 2];
  const [isLoading, setIsLoading] = useState(true);
  const [ItemInfo, setItemInfo] = useState();

  useEffect(() => {
    const loadData = async () => {
      setItemInfo(await getItemInfo(ItemNumber));
      setIsLoading(false);
    };
    loadData();
  }, []);

  return (
    // <Link to={`Item/${ItemNumber}`}>
    // <Card className="ItemCard" raised={true} onClick={Link.to}>

    <Card className="ItemCard" raised>
      <ItemImage ItemNumber={ItemNumber} showShiny={props.showShiny} />
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
              <Grid.Column textAlign={"right"}>{ItemNumber}</Grid.Column>
            </Grid.Row>

            <Grid.Row>
              {isLoading ? (
                <Loader />
              ) : (
                ItemInfo.types.map((t) => {
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
        <ItemInfo ItemNumber={ItemNumber} />
      </Card.Content>
    </Card>
    // </Link>
  );
}

export default ItemCard;
