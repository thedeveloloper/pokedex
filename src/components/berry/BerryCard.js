import React, { useEffect, useState } from "react";

import BerryImage from "../berry/BerryImage";

import { getBerryInfo } from "../../services/HTTPGet";

import { Card, Grid, Loader, Icon, Label } from "semantic-ui-react";

import "./BerryCard.css";

import data from "../../data.json";

function BerryCard(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [BerryInfo, setBerryInfo] = useState([]);

  function getSymbol(name) {
    if (!name) {
      return "";
    }

    return name.split("-")[1] == "f" ? (
      <Icon name="woman" />
    ) : (
      <Icon name="man" />
    );
  }

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setBerryInfo(await getBerryInfo(props.BerryNumber));
      setIsLoading(false);
    };
    loadData();
  }, [props.BerryNumber]);

  return (
    <Card className="BerryCard" onClick={props.openTrigger} raised>
      <BerryImage
        lazy={props.lazy}
        BerryNumber={props.BerryNumber}
        showShiny={props.showShiny}
      />

      <Card.Content>
        <Card.Header>
          {props.name.split("-")[0]}
          <sup>{getSymbol(props.name)}</sup>
          <Label size="medium" content={props.BerryNumber} circular />
        </Card.Header>
      </Card.Content>

      <Card.Content extra>
        {isLoading ? (
          <Loader />
        ) : (
          <Grid columns={2}>
            {BerryInfo.types.map((t) => (
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

export default BerryCard;
