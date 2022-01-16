import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Button, Icon, Confirm } from "semantic-ui-react";
import {
  FETCH_MANAGERS_QUERY,
  DELETE_MANAGER_MUTATION,
} from "../../queries/managers_query";
import MyPopup from "../../utils/MyPopup";

function DeleteManagerButton({ managerId, callback }) {
  const [confirmOpen, setConfrimOpen] = useState(false);

  const mutation = DELETE_MANAGER_MUTATION;

  const [deleteManager] = useMutation(mutation, {
    update(proxy) {
      setConfrimOpen(false);

      if (managerId) {
        const data = proxy.readQuery({
          query: FETCH_MANAGERS_QUERY,
        });
        proxy.writeQuery({
          query: FETCH_MANAGERS_QUERY,
          data: {
            getManagers: data.getManagers.filter((c) => c.id !== managerId),
          },
        });
      }

      if (callback) callback();
    },
    variables: { managerId },
  });

  return (
    <>
      <MyPopup content="delete manager">
        <Button
          as="div"
          color="red"
          floated="right"
          onClick={() => setConfrimOpen(true)}
        >
          <Icon name="trash" style={{ margin: 0 }} />
        </Button>
      </MyPopup>

      <Confirm
        open={confirmOpen}
        onCancel={() => setConfrimOpen(false)}
        onConfirm={deleteManager}
      />
    </>
  );
}

export default DeleteManagerButton;
