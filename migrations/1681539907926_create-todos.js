/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable(
    "todos",
    {
      id: "id",
      text: "text",
      created_at: {
        type: "timestamp",
        default: pgm.func("current_timestamp"),
        notNull: true,
      },
    },
    {
      ifNotExists: true,
    }
  );
};

exports.down = (pgm) => {
  pgm.dropTable("todos", {
    ifExists: true,
  });
};
