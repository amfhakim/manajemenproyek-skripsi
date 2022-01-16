import gql from "graphql-tag";

export const FETCH_MANAGERS_QUERY = gql`
  {
    getManagers {
      id
      nama
      alamat
      notlp
      email
      createdAt
      username
    }
  }
`;

export const FETCH_MANAGER_QUERY = gql`
  query ($managerId: ID!) {
    getManager(managerId: $managerId) {
      nama
      email
      notlp
      alamat
      createdAt
      username
      projects {
        id
        nama
        startAt
        endAt
        progres
      }
    }
  }
`;

export const DELETE_MANAGER_MUTATION = gql`
  mutation deleteManager($managerId: ID!) {
    deleteManager(managerId: $managerId)
  }
`;
