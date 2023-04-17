import { GraphQLScalarType, Kind } from "graphql";
import knex from "knex";

const pg = knex({
  client: "pg",
  connection: process.env.DATABASE_URL,
});

const Queries = {
  Query: {
    todos: async () => {
      const rows = await pg("todos").select("*");
      return rows;
    },
  },
  Date: new GraphQLScalarType({
    name: "Date",
    description: "Date custom scalar type",
    serialize(value) {
      if (value instanceof Date) {
        return value.getTime();
      }
      throw Error("GraphQL Date Scalar serializer expected a `Date` object");
    },
    parseValue(value) {
      if (typeof value === "number") {
        return new Date(value);
      }
      throw new Error("GraphQL Date Scalar parser expected a `number`");
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(parseInt(ast.value, 10));
      }
      return null;
    },
  }),
};

export default Queries;
