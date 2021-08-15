import React, { useState, useEffect } from "react";

import { Divider, Card, Form, Input } from "semantic-ui-react";

import BerryInfo from "./BerryInfo";
import BerryCard from "./BerryCard";

import { getBerryList } from "../../services/HTTPGet";

export default function BerryList() {
  const [berry, setBerry] = useState([]);
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
      setBerry(await getBerryList(1, 151));
    };
    loadPage();
  }, []);

  return (
    <div>
      <Divider />

      <Form as="div">
        <Form.Group inline>
          <Input label="Search" results={berry} onChange={handleSearchChange} />
        </Form.Group>
      </Form>

      <Divider />
      <Card.Group centered>
        {berry &&
          berry
            .filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))
            .map((i, n) => {
              return (
                <BerryCard
                  key={i.name}
                  handleInfoOpen={handleInfoOpen}
                  handleInfoNumber={handleInfoNumber}
                  lazy={n >= 20 ? true : false}
                  berryNumber={i.url.split("/")[i.url.split("/").length - 2]}
                  berryName={`${i.name}-berry`}
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
      <BerryInfo
        berryNumber={infoNumber}
        open={infoOpen}
        handleInfoOpen={handleInfoOpen}
      />
    </div>
  );
}
