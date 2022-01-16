import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { Container, Grid, Transition, Button } from "semantic-ui-react";
import { AuthContext } from "../../context/auth";
import ManagerCard from "../../components/managers/ManagerCard";
import { FETCH_MANAGERS_QUERY } from "../../queries/managers_query";
import MenuBar from "../../components/MenuBar";

function Managers() {
  const { user } = useContext(AuthContext);
  let managers = "";
  const { loading, data } = useQuery(FETCH_MANAGERS_QUERY);

  if (data) {
    managers = data.getManagers;
  }
  return (
    <Container>
      <MenuBar />
      <Container style={{ marginTop: "5em" }}>
        <Grid stackable columns={3}>
          <Grid.Row className="page-title">
            <h1>Daftar Manager</h1>
          </Grid.Row>
          <Grid.Row centered>
            <Button color="teal" as={Link} to={"/managers/addmanager"}>
              Tambah Manager
            </Button>
          </Grid.Row>
          <Grid.Row>
            {user && loading ? (
              <h1>Loading managers...</h1>
            ) : (
              <Transition.Group>
                {managers &&
                  managers
                    .map((manager) => (
                      <Grid.Column
                        key={manager.id}
                        style={{ marginBottom: 20 }}
                      >
                        <ManagerCard manager={manager} />
                      </Grid.Column>
                    ))
                    .sort(managers.nama)}
              </Transition.Group>
            )}
          </Grid.Row>
        </Grid>
      </Container>
    </Container>
  );
}

export default Managers;
