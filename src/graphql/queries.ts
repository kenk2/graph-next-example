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

const ADD_TODO = gql`
  mutation AddTodo($text: String!) {
    addTodo(text: $text) {
      text
    }
  }
`;

const queries = {
  GET_TODOS,
  ADD_TODO,
};

export default queries;
