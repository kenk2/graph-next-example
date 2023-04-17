import { gql } from "@apollo/client";

const typeDefs = gql`
  scalar Date

  type Todo {
    id: ID!
    text: String!
    created_at: Date!
  }

  type Query {
    todos: [Todo]
  }

  type Mutation {
    addTodo(text: String!): Todo
    deleteTodo(id: ID!): Todo
    editTodo(id: ID!, text: String!): Todo
  }
`;

export default typeDefs;
