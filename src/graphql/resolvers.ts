import knex from "knex";

const pg = knex({
  client: "pg",
  connection: process.env.DATABASE_URL,
});

const Queries = {
  Query: {
    async todos() {
      const rows = await pg("todos").select("*");
      return rows;
    },
  },
};

export default Queries;
