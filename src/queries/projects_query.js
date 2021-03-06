import gql from "graphql-tag";

export const FETCH_PROJECTS_QUERY = gql`
  {
    getProjects {
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
        notlp
      }
      createdAt
      username
    }
  }
`;

export const FETCH_PROJECT_QUERY = gql`
  query ($projectId: ID!) {
    getProject(projectId: $projectId) {
      id
      nama
      startAt
      endAt
      alamat
      progres
      namaCustomer
      customer {
        id
        nama
        notlp
        email
      }
      workers {
        id
        nama
        presences {
          tanggal
          kehadiran
        }
      }
      tasks {
        id
        nama
        startAt
        endAt
        status
      }
      createdAt
      username
    }
  }
`;

export const CREATE_PROJECT_MUTATION = gql`
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
