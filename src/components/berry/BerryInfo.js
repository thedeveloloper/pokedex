import React, { useState, useEffect } from "react";

import BerryImage from "./BerryImage";
import { getBerryInfo } from "../../services/HTTPGet";

import { Modal, Grid, Message, Loader } from "semantic-ui-react";

export default function BerryInfo(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [berryInfo, setBerryInfo] = useState(null);

  useEffect(() => {
    const loadInfo = async () => {
      if (props.berryNumber === 0) {
        return;
      }
      setIsLoading(true);
      setBerryInfo(await getBerryInfo(props.berryNumber));
      setIsLoading(false);
    };
    loadInfo();
  }, [props.berryNumber]);

  function handleInfoOpen(isOpen) {
    props.handleInfoOpen(isOpen);
  }

  return (
    <Modal
      closeIcon
      onClose={() => handleInfoOpen(false)}
      onOpen={() => handleInfoOpen(true)}
      open={props.open}
    >
      <Modal.Header>
        {berryInfo &&
          props.berryNumber !== 0 &&
          berryInfo.name
            .split("-")
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
            <BerryImage berryName={berryInfo.name} size="tiny" />
          </Grid>
          <Message>
            {berryInfo &&
              berryInfo.effect_entries.map((i) =>
                i.language.name === "en" ? (
                  <div key={berryInfo.name} style={{ padding: "10px" }}>
                    <div
                      style={{
                        borderRadius: "5px",
                        padding: "10px",
                      }}
                    >
                      {i.short_effect}
                    </div>
                  </div>
                ) : (
                  ""
                )
              )}
          </Message>
        </Modal.Content>
      )}
    </Modal>
  );
}
