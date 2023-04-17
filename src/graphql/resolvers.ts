import { utcToZonedTime } from "date-fns-tz";
import { GraphQLScalarType, Kind } from "graphql";
import knex from "knex";
import Todo from "@kenk2/types";
import { timeZone } from "@kenk2/constants";

const pg = knex({
  client: "pg",
  connection: process.env.DATABASE_URL,
  pool: { min: 0, max: 1 },
});

const Queries = {
  Query: {
    todos: async () => {
      const rows = await pg("todos").select("*");
      return rows.map((x: Todo) => ({
        ...x,
        created_at: utcToZonedTime(x.created_at, timeZone),
        editted_at: x.editted_at
          ? utcToZonedTime(x.editted_at, timeZone)
          : undefined,
      }));
    },
  },

  Mutation: {
    addTodo: async (_, args: any) => {
      const result = await pg("todos")
        .insert({
          text: args.text,
          editted_at: null,
        })
        .returning("*");
      return result[0];
    },
    deleteTodo: async (_, args: any) => {
      const result = await pg("todos")
        .where("id", args.id)
        .del()
        .returning("*");
      return result[0];
    },
    editTodo: async (_, args: any) => {
      const result = await pg("todos")
        .where("id", args.id)
        .update({ text: args.text, editted_at: pg.fn.now() })
        .returning("*");
      return result[0];
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
