import React, { useState, useContext } from "react";
import gql from "graphql-tag";
import { Button, Container, Form, FormField } from "semantic-ui-react";
import { useMutation, useQuery } from "@apollo/client";
import { useForm } from "../../utils/hooks";
import { AuthContext } from "../../context/auth";
import MenuBar from "../../components/MenuBar";
import { FETCH_PROJECTS_QUERY } from "../../queries/projects_query";
import { FETCH_WORKERS_QUERY } from "../../queries/workers_query";
import { FETCH_CUSTOMERS_QUERY } from "../../queries/customers_query";

function AddProject(props) {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(addProjectCallback, {
    nama: "",
    alamat: "",
    namaCustomer: "",
    startAt: "",
    endAt: "",
    namaWorkers: [""],
  });

  const [addProject, { loading }] = useMutation(CREATE_PROJECT_MUTATION, {
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_PROJECTS_QUERY,
      });
      proxy.writeQuery({
        query: FETCH_PROJECTS_QUERY,
        data: {
          getProjects: [result.data.createProject, ...data.getProjects],
        },
      });
      props.history.push("/projects");
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

  function addProjectCallback() {
    addProject();
  }

  let workers = [{}];
  const workersData = useQuery(FETCH_WORKERS_QUERY).data;
  if (workersData) {
    workers = workersData.getWorkers;
  }
  const workerOptions = workers.map((w) => ({
    key: w.nama,
    text: w.nama,
    value: w.nama,
  }));

  let customers = [{}];
  const customersData = useQuery(FETCH_CUSTOMERS_QUERY).data;
  if (customersData) {
    customers = customersData.getCustomers;
  }
  const customerOptions = customers.map((c) => ({
    key: c.nama,
    text: c.nama,
    value: c.nama,
  }));

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
            <h1>Tambah Proyek</h1>
            <FormField>
              <Form.Input
                label="Nama Proyek"
                placeholder="nama proyek"
                name="nama"
                type="text"
                value={values.nama}
                error={errors.nama ? true : false}
                onChange={onChange}
              />
              <Form.Input
                label="Alamat Proyek"
                placeholder="alamat proyek"
                name="alamat"
                type="text"
                value={values.alamat}
                error={errors.alamat ? true : false}
                onChange={onChange}
              />
              <Form.Input
                label="Nama Customer"
                placeholder="nama customer"
                type="text"
                name="namaCustomer"
                value={values.namaCustomer}
                error={errors.namaCustomer ? true : false}
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
                name="endAt"
                type="text"
                value={values.endAt}
                error={errors.EndAt ? true : false}
                onChange={onChange}
              />
              <Form.Select
                label="Nama Pekerja"
                placeholder="nama pekerja"
                name="namaWorkers"
                multiple
                search
                selection
                options={workerOptions}
                value={values.namaWorkers}
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

const CREATE_PROJECT_MUTATION = gql`
  mutation createProject(
    $nama: String!
    $alamat: String!
    $namaCustomer: String!
    $startAt: String
    $endAt: String
    $namaWorkers: [String]
  ) {
    createProject(
      input: {
        nama: $nama
        alamat: $alamat
        namaCustomer: $namaCustomer
        startAt: $startAt
        endAt: $endAt
        namaWorkers: $namaWorkers
      }
    ) {
      id
      nama
      namaCustomer
      customer {
        id
        nama
      }
      alamat
      startAt
      endAt
      namaWorkers
      workers {
        id
        nama
      }
      createdAt
      username
    }
  }
`;

export default AddProject;
