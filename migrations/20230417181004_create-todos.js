/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  knex.schema.hasTable("todos").then(async (exists) => {
    if (!exists) {
      return await knex.schema.createTable("todos", (table) => {
        table.increments("id").primary();
        table.string("text");

        table
          .timestamp("created_at", {
            useTz: true,
          })
          .defaultTo(knex.fn.now());

        table.timestamp("editted_at", {
          useTz: true,
        });
      });
    }
    return knex;
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("todos");
};
