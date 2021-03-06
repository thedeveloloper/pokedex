import React, { useState, useEffect } from "react";

import { Divider, Card, Form } from "semantic-ui-react";

import ItemInfo from "./ItemInfo";
import ItemCard from "./ItemCard";

import { getItemList } from "../../services/HTTPGet";

export default function ItemList() {
  const [item, setItem] = useState([]);
  const [query, setQuery] = useState("");
  const [infoOpen, setInfoOpen] = useState(false);
  const [infoNumber, setInfoNumber] = useState(0);

  function handleSearchChange(k, v) {
    setQuery(v.value);
  }

  function handleInfoOpen(isOpen) {
    setInfoOpen(isOpen);
  }

  function handleInfoNumber(n) {
    setInfoNumber(n);
  }

  useEffect(() => {
    const loadPage = async () => {
      setItem(await getItemList(1, 1000));
    };
    loadPage();
  }, []);

  return (
    <div>
      <Form as="div">
        <Form.Group inline>
          <Form.Input
            label="Search"
            results={item}
            onChange={handleSearchChange}
          />
        </Form.Group>
      </Form>

      <Divider />
      <Card.Group centered>
        {item &&
          item
            .filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))
            .map((i, n) => {
              return (
                <ItemCard
                  key={i.name}
                  handleInfoOpen={handleInfoOpen}
                  handleInfoNumber={handleInfoNumber}
                  lazy={n >= 20 ? true : false}
                  itemNumber={i.url.split("/")[i.url.split("/").length - 2]}
                  itemName={i.name}
                  name={i.name
                    .split(" ")
                    .map(
                      (letter) =>
                        letter.charAt(0).toUpperCase() + letter.substring(1)
                    )
                    .join(" ")}
                  url={i.url}
                />
              );
            })}
      </Card.Group>

      <Divider />
      <ItemInfo
        itemNumber={infoNumber}
        open={infoOpen}
        handleInfoOpen={handleInfoOpen}
      />
    </div>
  );
}
