import React, { useContext, useState } from "react";
import { Button, Container, Form, Grid } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { useForm } from "../utils/hooks";
import { AuthContext } from "../context/auth";

function Login(props) {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    username: "",
    password: "",
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData } }) {
      context.login(userData);
      props.history.push("/home");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  function loginUserCallback() {
    loginUser();
  }

  return (
    <Container>
      <Grid>
        <Grid.Row className="page-title" style={{ marginTop: "5em" }}>
          <h1>APLIKASI MANAJEMEN PROYEK</h1>
          <h2>AMF-HAQ Engineering and Consultant</h2>
        </Grid.Row>
        <Grid.Row>
          <Container text style={{ marginTop: "3em" }}>
            <div className="form-container">
              <Form
                onSubmit={onSubmit}
                noValidate
                className={loading ? "loading" : ""}
              >
                <h1>Login</h1>
                <Form.Input
                  label="Username"
                  placeholder="Username.."
                  name="username"
                  type="text"
                  value={values.username}
                  error={errors.username ? true : false}
                  onChange={onChange}
                />
                <Form.Input
                  label="Password"
                  placeholder="Password.."
                  name="password"
                  type="password"
                  value={values.password}
                  error={errors.password ? true : false}
                  onChange={onChange}
                />
                <Button type="submit" primary>
                  Login
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
        </Grid.Row>
      </Grid>
    </Container>
  );
}

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Login;
