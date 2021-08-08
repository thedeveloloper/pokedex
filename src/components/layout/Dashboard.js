import React from "react";
import { Link } from "react-router-dom";

import { Grid, Button } from "semantic-ui-react";

function Dashboard() {
  return (
    <Grid columns={2}>
      <Grid.Row>
        <Grid.Column>
          <Button circular color="blue" as={Link} to="/pokemon">
            Pokemon List
          </Button>
        </Grid.Column>
        <Grid.Column>
          <Button circular color="blue" as={Link} to="">
            Item List
          </Button>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <Button circular color="blue" as={Link} to="">
            Other List
          </Button>
        </Grid.Column>
        <Grid.Column>
          <Button circular color="blue" as={Link} to="">
            Other List
          </Button>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default Dashboard;
