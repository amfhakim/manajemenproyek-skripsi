import React from "react";
import { useQuery } from "@apollo/client";
import {
  Card,
  CardContent,
  Grid,
  Container,
  Button,
  Table,
  CardDescription,
} from "semantic-ui-react";
import MenuBar from "../../components/MenuBar";
//import DeleteTaskButton from "../../components/tasks/DeleteTask";
import { FETCH_TASK_QUERY } from "../../queries/tasks_queries";
import { FETCH_PROJECT_QUERY } from "../../queries/projects_query";
import { Link } from "react-router-dom";

function SingleTask(props) {
  const taskId = props.match.params.taskId;
  const projectId = props.match.params.projectId;

  let getTask = "";
  const { data } = useQuery(FETCH_TASK_QUERY, {
    variables: { taskId },
  });
  if (data) {
    getTask = data.getTask;
  }
  const { nama, startAt, endAt, status, tools, materials } = getTask;

  let getProject = "";
  const projectData = useQuery(FETCH_PROJECT_QUERY, {
    variables: { projectId },
  }).data;
  if (projectData) {
    getProject = projectData.getProject;
  }
  const namaProyek = getProject.nama;
  const customerProyek = getProject.namaCustomer;

  function deleteTaskCallback() {
    props.history.push(`/projects/${projectId}`);
  }

  let toolsTable;
  if (!tools || tools.length === 0) {
    toolsTable = <CardDescription>Belum ada Peralatan</CardDescription>;
  } else {
    toolsTable = (
      <Table>
        <Table.Header>
          <Table.HeaderCell>Nama Alat</Table.HeaderCell>
          <Table.HeaderCell>Jumlah</Table.HeaderCell>
          <Table.HeaderCell>Status</Table.HeaderCell>
        </Table.Header>
        <Table.Body>
          {tools.map((t) => (
            <Table.Row>
              <Table.Cell>
                <a href={`/projects/${projectId}/${taskId}/${t.id}`}>
                  {t.nama}
                </a>
              </Table.Cell>
              <Table.Cell>{t.jumlah}</Table.Cell>
              <Table.Cell>
                {t.status ? (
                  <p style={{ color: "#008000" }}>tersedia</p>
                ) : (
                  <p style={{ color: "#ff0000" }}>belum tersedia</p>
                )}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  }

  let materialsTable;
  if (!materials || materials.length === 0) {
    materialsTable = <CardDescription>Belum ada Material</CardDescription>;
  } else {
    materialsTable = (
      <Table>
        <Table.Header>
          <Table.HeaderCell>Nama Material</Table.HeaderCell>
          <Table.HeaderCell>Jumlah</Table.HeaderCell>
          <Table.HeaderCell>Status</Table.HeaderCell>
        </Table.Header>
        <Table.Body>
          {materials.map((m) => (
            <Table.Row>
              <Table.Cell>
                <a href={`/projects/${projectId}/${taskId}/${m.id}`}>
                  {m.nama}
                </a>
              </Table.Cell>
              <Table.Cell>{m.jumlah}</Table.Cell>
              <Table.Cell>
                {m.status ? (
                  <p style={{ color: "#008000" }}>tersedia</p>
                ) : (
                  <p style={{ color: "#ff0000" }}>belum tersedia</p>
                )}
                {m.status}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  }

  let taskMarkup;
  if (!getTask) {
    taskMarkup = <p>loading task...</p>;
  } else {
    taskMarkup = (
      <Container>
        <MenuBar />
        <Container style={{ marginTop: "7em" }}>
          <Grid>
            <Grid.Row className="page-title">
              <h1>Detail Pekerjaan</h1>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Card fluid>
                  <Card.Content>
                    <Table basic="very" celled>
                      <Table.Body>
                        <Table.Row>
                          <Table.Cell>
                            <b>Nama Pekerjaan</b>
                          </Table.Cell>
                          <Table.Cell>{nama}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.Cell>
                            <b>Nama Proyek</b>
                          </Table.Cell>
                          <Table.Cell>
                            <a href={`/projects/${projectId}`}>{namaProyek}</a>
                          </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.Cell>
                            <b>Nama Customer</b>
                          </Table.Cell>
                          <Table.Cell>{customerProyek}</Table.Cell>
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
                            <b>Status</b>
                          </Table.Cell>
                          <Table.Cell>
                            {status ? (
                              <p style={{ color: "#008000" }}>selesai</p>
                            ) : (
                              <p style={{ color: "#ff0000" }}>belum selesai</p>
                            )}
                          </Table.Cell>
                        </Table.Row>
                      </Table.Body>
                    </Table>
                  </Card.Content>
                  <hr />
                  <Card.Content>
                    <Grid>
                      <Grid.Row columns="2" divided>
                        <Grid.Column textAlign="center">
                          <h3>Daftar Peralatan</h3>
                          {toolsTable}
                          <Button
                            as={Link}
                            to={`/projects/${projectId}/${taskId}/addtool`}
                          >
                            Tambah Peralatan
                          </Button>
                        </Grid.Column>
                        <Grid.Column textAlign="center">
                          <h3>Daftar Material</h3>
                          {materialsTable}
                          <Button
                            as={Link}
                            to={`/projects/${projectId}/${taskId}/addmaterial`}
                          >
                            Tambah Material
                          </Button>
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </Card.Content>
                  <hr />
                  <CardContent extra>
                    <Button
                      as={Link}
                      to={`/projects/${projectId}/${taskId}/update`}
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
  return taskMarkup;
}

export default SingleTask;
