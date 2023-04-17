import { gql } from "@apollo/client";

const GET_TODOS = gql`
  query GetTodos {
    todos {
      id
      text
    }
  }
`;

const queries = {
  GET_TODOS,
};

export default queries;
