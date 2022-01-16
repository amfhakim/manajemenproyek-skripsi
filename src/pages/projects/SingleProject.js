import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import moment from "moment";
import {
  Button,
  Card,
  CardContent,
  Grid,
  Image,
  Container,
  Progress,
  Table,
} from "semantic-ui-react";
import { AuthContext } from "../../context/auth";
import DeleteButton from "../../components/DeleteButton";
import MenuBar from "../../components/MenuBar";
import { FETCH_PROJECT_QUERY } from "../../queries/projects_query";

function SingleProject(props) {
  const projectId = props.match.params.projectId;
  const { user } = useContext(AuthContext);

  let getProject = "";
  const { data } = useQuery(FETCH_PROJECT_QUERY, {
    variables: { projectId },
  });
  if (data) {
    getProject = data.getProject;
  }
  const {
    nama,
    customer,
    alamat,
    startAt,
    endAt,
    progres,
    tasks,
    workers,
    username,
    createdAt,
  } = getProject;

  function deleteProjectCallback() {
    props.history.push("/projects");
  }

  const current = new Date();
  const currentDate = `${current.getDate()} / ${
    current.getMonth() + 1
  } / ${current.getFullYear()}`;

  let workersTable;
  if (!workers || workers.length == 0) {
    workersTable = (
      <Card.Content textAlign="center">
        <Button>Tambah Pekerja</Button>
      </Card.Content>
    );
  } else {
    workersTable = (
      <Card.Content textAlign="center">
        <Table>
          <Table.Header>
            <Table.HeaderCell>Nama</Table.HeaderCell>
            <Table.HeaderCell>
              Kehadiran hari ini:&emsp;&emsp;{currentDate}
            </Table.HeaderCell>
          </Table.Header>
          <Table.Body>
            {workers.map((w) => (
              <Table.Row>
                <Table.Cell>{w.nama}</Table.Cell>
                <Table.Cell>tidak masuk</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        <a href="">edit daftar pekerja</a>
      </Card.Content>
    );
  }

  let tasksCards;
  if (!tasks || tasks.length == 0) {
    tasksCards = (
      <Card fluid>
        <Card.Content>
          <Card.Header textAlign="center">Daftar Pekerjaan</Card.Header>
        </Card.Content>
        <Card.Content textAlign="center">
          <Button as={Link} to={`/projects/${projectId}/addtask`}>
            Tambah Pekerjaan
          </Button>
        </Card.Content>
      </Card>
    );
  } else {
    tasksCards = (
      <Card fluid>
        <Card.Content>
          <Card.Header textAlign="center">Daftar Pekerjaan</Card.Header>
        </Card.Content>
        <Card.Content>
          <Table>
            <Table.Header>
              <Table.HeaderCell>Nama Pekerjaan</Table.HeaderCell>
              <Table.HeaderCell>Tanggal Mulai</Table.HeaderCell>
              <Table.HeaderCell>Tanggal Selesai</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
            </Table.Header>
            <Table.Body>
              {tasks.map((t) => (
                <Table.Row>
                  <Table.Cell>
                    <a href={`/projects/${projectId}/${t.id}`}>{t.nama}</a>
                  </Table.Cell>
                  <Table.Cell>{t.startAt}</Table.Cell>
                  <Table.Cell>{t.endAt}</Table.Cell>
                  <Table.Cell>
                    {t.status ? (
                      <p style={{ color: "#008000" }}>sudah</p>
                    ) : (
                      <p style={{ color: "#ff0000" }}>belum</p>
                    )}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Card.Content>
        <Card.Content textAlign="center">
          <Button as={Link} to={`/projects/${projectId}/addtask`}>
            Tambah Pekerjaan
          </Button>
        </Card.Content>
      </Card>
    );
  }

  let projectMarkup;
  if (!getProject) {
    projectMarkup = <p>loading project ...</p>;
  } else {
    projectMarkup = (
      <Container>
        <MenuBar />
        <Container style={{ marginTop: "5em" }}>
          <Grid>
            <Grid.Row className="page-title" style={{ marginTop: "1em" }}>
              <h1>{nama}</h1>
            </Grid.Row>

            <Grid.Row columns="2">
              <Grid.Column>
                <Card fluid>
                  <Card.Content textAlign="center">
                    <Card.Header>Informasi Umum</Card.Header>
                  </Card.Content>
                  <CardContent textAlign="center">
                    <Table basic="very" celled collapsing>
                      <Table.Body>
                        <Table.Row>
                          <Table.Cell>
                            <b>Nama Customer</b>
                          </Table.Cell>
                          <Table.Cell>{customer.nama}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.Cell>
                            <b>Alamat Proyek</b>
                          </Table.Cell>
                          <Table.Cell>{alamat}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.Cell>
                            <b>Tanggal Mulai</b>
                          </Table.Cell>
                          <Table.Cell>{startAt}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.Cell>
                            <b>Tanggal Selesai</b>
                          </Table.Cell>
                          <Table.Cell>{endAt}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.Cell>
                            <b>Tanggal Terdaftar </b>
                          </Table.Cell>
                          <Table.Cell>{createdAt.slice(0, 10)}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.Cell>
                            <b>Pendaftar</b>
                          </Table.Cell>
                          <Table.Cell>{username}</Table.Cell>
                        </Table.Row>
                      </Table.Body>
                    </Table>
                    <a href="">edit informasi umum</a>
                  </CardContent>
                </Card>
              </Grid.Column>

              <Grid.Column>
                <Card fluid>
                  <Card.Content textAlign="center">
                    <Card.Header>Daftar Pekerja</Card.Header>
                  </Card.Content>
                  {workersTable}
                </Card>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Card fluid>
                <Card.Content textAlign="center">
                  <Card.Header>Total Progress</Card.Header>
                </Card.Content>
                <Card.Content>
                  <Progress percent={progres * 100} indicating>
                    <h5>{(progres * 100).toFixed(2)}%</h5>
                  </Progress>
                </Card.Content>
              </Card>
            </Grid.Row>

            <Grid.Row>{tasksCards}</Grid.Row>

            <Grid.Row>
              <Card fluid>
                <Card.Content textAlign="center">
                  <Card.Header>Galeri</Card.Header>
                </Card.Content>
                <Card.Content>
                  <Image
                    floated="center"
                    size="medium"
                    src="https://react.semantic-ui.com/images/avatar/large/elliot.jpg"
                  />
                  <Image
                    floated="center"
                    size="medium"
                    src="https://react.semantic-ui.com/images/avatar/large/elliot.jpg"
                  />
                </Card.Content>
              </Card>
            </Grid.Row>
          </Grid>
        </Container>
      </Container>
    );
  }
  return projectMarkup;
}

export default SingleProject;
