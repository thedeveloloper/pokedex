import React from "react";
import { NavLink } from "react-router-dom";

import { Button } from "semantic-ui-react";

function Home() {
  return (
    <Button circular color="blue" as={NavLink} to="/pokemon">
      Pokemon List
    </Button>
  );
}

export default Home;
