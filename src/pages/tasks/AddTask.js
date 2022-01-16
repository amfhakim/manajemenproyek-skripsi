import React, { useState, useContext } from "react";
import { Button, Container, Form, FormField } from "semantic-ui-react";
import { useMutation, useQuery } from "@apollo/client";
import { useForm } from "../../utils/hooks";
import { AuthContext } from "../../context/auth";
import MenuBar from "../../components/MenuBar";
import { FETCH_PROJECT_QUERY } from "../../queries/projects_query";
import { CREATE_TASK_MUTATION } from "../../queries/tasks_queries";

function AddTask(props) {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const projectId = props.match.params.projectId;

  const { onChange, onSubmit, values } = useForm(addTaskCallback, {
    projectId: projectId,
    nama: "",
    startAt: "",
    endAt: "",
  });

  const [addTask, { loading }] = useMutation(CREATE_TASK_MUTATION, {
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_PROJECT_QUERY,
      });
      proxy.writeQuery({
        query: FETCH_PROJECT_QUERY,
        data: {
          getProjects: [result.data.createProject, ...data.getProjects],
        },
      });
      props.history.push(`/projects/${projectId}`);
    },
    onError(err) {
      setErrors(
        err && err.graphQLErrors[0]
          ? err.graphQLErrors[0].extensions.errors
          : {}
      );
    },
    variables: values,
  });

  function addTaskCallback() {
    addTask();
  }

  let getProject = "";
  const { data } = useQuery(FETCH_PROJECT_QUERY, {
    variables: { projectId },
  });
  if (data) {
    getProject = data.getProject;
  }
  const { nama } = getProject;

  return (
    <Container>
      <MenuBar />
      <Container text style={{ marginTop: "5em" }}>
        <div className="form-container">
          <Form
            onSubmit={onSubmit}
            noValidate
            className={loading ? "loading" : ""}
          >
            <h1>Tambah Pekerjaan</h1>
            <h4>untuk proyek: {nama}</h4>
            <FormField style={{ marginTop: "3em" }}>
              <Form.Input
                label="Nama Pekerjaan"
                placeholder="nama pekerjaan"
                name="nama"
                type="text"
                value={values.nama}
                error={errors.nama ? true : false}
                onChange={onChange}
              />
              <Form.Input
                label="Tanggal Mulai"
                placeholder="yyyy-mm-dd"
                name="startAt"
                type="text"
                value={values.startAt}
                error={errors.startAt ? true : false}
                onChange={onChange}
              />
              <Form.Input
                label="Tanggal Selesai"
                placeholder="yyyy-mm-dd"
                type="text"
                name="endAt"
                value={values.endAt}
                error={errors.endAt ? true : false}
                onChange={onChange}
              />
              <Button type="submit" primary>
                Submit
              </Button>
            </FormField>
          </Form>
          {Object.keys(errors).length > 0 && (
            <div className="ui error message">
              <ul className="list">
                {Object.values(errors).map((value) => (
                  <li key={value}>{value}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Container>
    </Container>
  );
}

export default AddTask;
