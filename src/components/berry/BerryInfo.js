import React, { useState, useEffect } from "react";

import BerryImage from "./BerryImage";
import { getBerryInfo } from "../../services/HTTPGet";

import { Modal, Grid, Message, Loader } from "semantic-ui-react";

export default function BerryInfo(props) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [BerryInfo, setBerryInfo] = useState(null);

  useEffect(() => {
    setOpen(props.open);
  }, [props.open]);

  useEffect(() => {
    if (props.open) {
      const loadInfo = async () => {
        setBerryInfo(await getBerryInfo(props.BerryNumber));
        setIsLoading(false);
      };
      loadInfo();
    }
  }, [props]);

  return (
    <Modal
      closeIcon
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={null}
    >
      <Modal.Header>
        {BerryInfo &&
          BerryInfo.name
            .split(" ")
            .map(
              (letter) => letter.charAt(0).toUpperCase() + letter.substring(1)
            )
            .join(" ")}
      </Modal.Header>
      {isLoading ? (
        <Loader />
      ) : (
        <Modal.Content>
          <Grid textAlign="center">
            <BerryImage BerryNumber={props.BerryNumber} />
            <BerryImage BerryNumber={props.BerryNumber} showShiny={true} />
          </Grid>
          <Message>
            <Message.Header>Abilities</Message.Header>
            {BerryInfo.abilities
              .map((a) => {
                return a.ability.name
                  .toLowerCase()
                  .split("-")
                  .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                  .join(" ");
              })
              .join(", ")}
          </Message>
        </Modal.Content>
      )}
    </Modal>
  );
}
