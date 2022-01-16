import React, { useState, useContext } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Container, Form, FormField, Button } from "semantic-ui-react";
import { useForm } from "../../utils/hooks";
import { AuthContext } from "../../context/auth";
import {
  FETCH_CUSTOMER_QUERY,
  UPDATE_CUSTOMER_MUTATION,
} from "../../queries/customers_query";
import MenuBar from "../../components/MenuBar";

function UpdateCustomer(props) {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const customerId = props.match.params.customerId;

  const { values, onChange, onSubmit } = useForm(updateCustomerCallback, {
    customerId: customerId,
    nama: "",
    alamat: "",
    notlp: "",
    email: "",
  });

  const [updateCustomer, { loading }] = useMutation(UPDATE_CUSTOMER_MUTATION, {
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_CUSTOMER_QUERY,
      });
      proxy.writeQuery({
        query: FETCH_CUSTOMER_QUERY,
        data: {
          getCustomer: [result.data.updateCustomer, ...data.getCustomer],
        },
      });
      props.history.push(`/customers/${customerId}`);
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

  function updateCustomerCallback() {
    updateCustomer();
  }

  let getCustomer = "";
  const { data } = useQuery(FETCH_CUSTOMER_QUERY, {
    variables: { customerId },
  });
  if (data) {
    getCustomer = data.getCustomer;
  }
  const { nama, email, notlp, alamat, createdAt } = getCustomer;

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
            <h2> Update Customer </h2>
            <FormField>
              <Form.Input
                label="Nama"
                placeholder="nama"
                name="nama"
                type="text"
                defaultValue={nama}
                onChange={onChange}
                error={errors.nama ? true : false}
              />
              <Form.Input
                label="Alamat"
                placeholder="alamat"
                name="alamat"
                defaultValue={alamat}
                onChange={onChange}
                error={errors.alamat ? true : false}
              />
              <Form.Input
                label="No Telepon"
                placeholder="no tlp"
                name="notlp"
                defaultValue={notlp}
                onChange={onChange}
                error={errors.notlp ? true : false}
              />
              <Form.Input
                label="Email"
                placeholder="email"
                name="email"
                defaultValue={email}
                onChange={onChange}
                error={errors.email ? true : false}
              />
              <Button type="submit" color="teal">
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

export default UpdateCustomer;
