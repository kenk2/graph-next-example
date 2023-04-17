import { gql } from "@apollo/client";

const GET_TODOS = gql`
  query GetTodos {
    todos {
      id
      text
      created_at
    }
  }
`;

const queries = {
  GET_TODOS,
};

export default queries;
