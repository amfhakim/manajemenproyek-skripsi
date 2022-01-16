import gql from "graphql-tag";

export const FETCH_WORKERS_QUERY = gql`
  {
    getWorkers {
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

export const FETCH_WORKER_QUERY = gql`
  query ($workerId: ID!) {
    getWorker(workerId: $workerId) {
      id
      nama
      alamat
      notlp
      email
      projects {
        id
        nama
        startAt
        endAt
        progres
      }
      createdAt
    }
  }
`;

export const UPDATE_WORKER_MUTATION = gql`
  mutation updateWorker(
    $workerId: ID!
    $nama: String!
    $alamat: String!
    $notlp: String!
    $email: String!
  ) {
    updateWorker(
      workerId: $workerId
      input: { nama: $nama, alamat: $alamat, notlp: $notlp, email: $email }
    ) {
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
