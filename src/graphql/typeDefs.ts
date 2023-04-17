import { gql } from "@apollo/client";

const typeDefs = gql`
  scalar Date

  type Todos {
    id: ID!
    text: String!
    created_at: Date!
  }
  type Query {
    todos: [Todos]
  }
`;

export default typeDefs;
