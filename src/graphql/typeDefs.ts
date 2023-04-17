import { gql } from "@apollo/client";

const typeDefs = gql`
  type Todos {
    id: ID
    text: String
  }
  type Query {
    todos: [Todos]
  }
`;

export default typeDefs;
