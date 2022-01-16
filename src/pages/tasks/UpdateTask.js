import React, { useState, useContext } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Container, Form, FormField, Button } from "semantic-ui-react";
import { useForm } from "../../utils/hooks";
import { AuthContext } from "../../context/auth";
import {
  FETCH_TASK_QUERY,
  UPDATE_TASK_MUTATION,
} from "../../queries/tasks_queries";
import MenuBar from "../../components/MenuBar";

function UpdateTask(props) {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const taskId = props.match.params.taskId;
  const projectId = props.match.params.projectId;

  const { values, onChange, onSubmit } = useForm(updateTaskCallback, {
    taskId: taskId,
    nama: "",
    startAt: "",
    endAt: "",
    status: false,
  });

  const [updateTask, { loading }] = useMutation(UPDATE_TASK_MUTATION, {
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_TASK_QUERY,
      });
      proxy.writeQuery({
        query: FETCH_TASK_QUERY,
        data: {
          getTask: [result.data.updateTask, ...data.getTask],
        },
      });
      props.history.push(`/projects/${projectId}/${taskId}`);
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

  function updateTaskCallback() {
    updateTask();
  }

  let getTask = "";
  const { data } = useQuery(FETCH_TASK_QUERY, {
    variables: { taskId },
  });
  if (data) {
    getTask = data.getTask;
  }
  const { nama, startAt, endAt, status } = getTask;

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
            <h2> Update Task </h2>
            <Form.Field>
              <Form.Input
                label="Nama Pekerjaan"
                placeholder="nama pekerjaan"
                name="nama"
                type="text"
                defaultValue={nama}
                onChange={onChange}
                error={errors.nama ? true : false}
              />
              <Form.Input
                label="Tanggal Mulai"
                placeholder="yyyy-mm-dd"
                name="startAt"
                defaultValue={startAt}
                onChange={onChange}
                error={errors.startAt ? true : false}
              />
              <Form.Input
                label="Tanggal Selesai"
                placeholder="yyyy-mm-dd"
                name="endAt"
                defaultValue={endAt}
                onChange={onChange}
                error={errors.endAt ? true : false}
              />
            </Form.Field>
            <Button type="submit" color="teal">
              Submit
            </Button>
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

export default UpdateTask;
