import React from "react";
import { Button } from "semantic-ui-react";

function PageSelector(props) {
  return (
    <div>
      <Button onClick={props.onPrevClick}>Prev</Button>
      <Button onClick={props.onNextClick}>Next</Button>
    </div>
  );
}

export default PageSelector;
