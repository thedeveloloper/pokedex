import React, { useState, useEffect } from "react";

import ItemImage from "./ItemImage";
import { getItemInfo } from "../../services/HTTPGet";

import { Modal, Grid, Message, Loader } from "semantic-ui-react";

export default function ItemInfo(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [itemInfo, setItemInfo] = useState(null);

  useEffect(() => {
    const loadInfo = async () => {
      if (props.itemNumber === 0) {
        return;
      }
      setIsLoading(true);
      setItemInfo(await getItemInfo(props.itemNumber));
      setIsLoading(false);
    };
    loadInfo();
  }, [props.itemNumber]);

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
        {itemInfo &&
          props.itemNumber !== 0 &&
          itemInfo.name
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
            <ItemImage itemName={itemInfo.name} size="tiny" />
          </Grid>
          <Message>
            {itemInfo &&
              itemInfo.effect_entries.map((f) =>
                f.language.name === "en" ? (
                  <div key={itemInfo.name} style={{ padding: "10px" }}>
                    <div
                      style={{
                        borderRadius: "5px",
                        padding: "10px",
                      }}
                    >
                      {f.short_effect}
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
