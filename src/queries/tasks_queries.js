import gql from "graphql-tag";

export const CREATE_TASK_MUTATION = gql`
  mutation createTask(
    $projectId: ID!
    $nama: String!
    $startAt: String!
    $endAt: String!
  ) {
    createTask(
      projectId: $projectId
      input: { nama: $nama, startAt: $startAt, endAt: $endAt }
    ) {
      id
      nama
      startAt
      endAt
      project {
        id
        nama
      }
      createdAt
      username
    }
  }
`;

export const FETCH_TASK_QUERY = gql`
  query getTask($taskId: ID!) {
    getTask(taskId: $taskId) {
      id
      nama
      startAt
      endAt
      status
      materials {
        id
        nama
        jumlah
        status
      }
      tools {
        id
        nama
        jumlah
        status
      }
    }
  }
`;

export const UPDATE_TASK_MUTATION = gql`
  mutation updateTask(
    $taskId: ID!
    $nama: String!
    $startAt: String!
    $endAt: String!
    $status: Boolean
  ) {
    updateTask(
      taskId: $taskId
      input: { nama: $nama, startAt: $startAt, endAt: $endAt, status: $status }
    ) {
      id
      nama
      startAt
      endAt
      status
    }
  }
`;
