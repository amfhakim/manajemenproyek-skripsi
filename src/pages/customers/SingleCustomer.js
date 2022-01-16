import React from "react";
import { useQuery } from "@apollo/client";
import {
  Card,
  CardContent,
  Grid,
  Image,
  Container,
  Button,
  Table,
  CardDescription,
} from "semantic-ui-react";
import moment from "moment";
import MenuBar from "../../components/MenuBar";
import DeleteCustomerButton from "../../components/customers/DeleteCustomer";
import { FETCH_CUSTOMER_QUERY } from "../../queries/customers_query";
import { Link } from "react-router-dom";

function SingleCustomer(props) {
  const customerId = props.match.params.customerId;
  let getCustomer = "";

  const { data } = useQuery(FETCH_CUSTOMER_QUERY, {
    variables: { customerId },
  });
  if (data) {
    getCustomer = data.getCustomer;
  }
  const { nama, email, notlp, alamat, createdAt, projects } = getCustomer;

  function deleteCustomerCallback() {
    props.history.push("/customers");
  }

  let projectsTable;
  if (!projects || projects.length == 0) {
    projectsTable = <CardDescription>Belum ada Proyek</CardDescription>;
  } else {
    projectsTable = (
      <Table>
        <Table.Header>
          <Table.HeaderCell>Nama Proyek</Table.HeaderCell>
          <Table.HeaderCell>Tanggal Mulai</Table.HeaderCell>
          <Table.HeaderCell>Tanggal Selesai</Table.HeaderCell>
          <Table.HeaderCell>Progress</Table.HeaderCell>
        </Table.Header>
        <Table.Body>
          {projects.map((p) => (
            <Table.Row>
              <Table.Cell>
                <a href={`/projects/${p.id}`}>{p.nama}</a>
              </Table.Cell>
              <Table.Cell>{p.startAt}</Table.Cell>
              <Table.Cell>{p.endAt}</Table.Cell>
              <Table.Cell>{p.progres * 100}%</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  }

  let customerMarkup;
  if (!getCustomer) {
    customerMarkup = <p>loading customer...</p>;
  } else {
    customerMarkup = (
      <Container>
        <MenuBar />
        <Container style={{ marginTop: "7em" }}>
          <Grid>
            <Grid.Row className="page-title">
              <h1>Profil Customer</h1>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={2}>
                <Image
                  floated="right"
                  size="small"
                  src="https://react.semantic-ui.com/images/avatar/large/elliot.jpg"
                />
              </Grid.Column>
              <Grid.Column width={10}>
                <Card fluid>
                  <Card.Content>
                    <Card.Header>{nama}</Card.Header>
                    <Card.Meta>
                      registered since : {moment(createdAt).fromNow()}
                    </Card.Meta>
                  </Card.Content>
                  <Card.Content>
                    <Table basic="very" celled>
                      <Table.Body>
                        <Table.Row>
                          <Table.Cell>
                            <b>Email</b>
                          </Table.Cell>
                          <Table.Cell>{email}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.Cell>
                            <b>No. Tlp</b>
                          </Table.Cell>
                          <Table.Cell>{notlp}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.Cell>
                            <b>Alamat</b>
                          </Table.Cell>
                          <Table.Cell>{alamat}</Table.Cell>
                        </Table.Row>
                      </Table.Body>
                    </Table>
                  </Card.Content>
                  <hr />
                  <Card.Content>
                    <h3>Daftar Proyek</h3>
                    {projectsTable}
                  </Card.Content>
                  <hr />
                  <CardContent extra>
                    <DeleteCustomerButton
                      customerId={customerId}
                      callback={deleteCustomerCallback}
                    />
                    <Button
                      as={Link}
                      to={`/customers/${customerId}/update`}
                      floated="right"
                    >
                      Edit
                    </Button>
                  </CardContent>
                </Card>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </Container>
    );
  }
  return customerMarkup;
}

export default SingleCustomer;
