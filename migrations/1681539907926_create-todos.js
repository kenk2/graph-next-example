/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable(
    "todos",
    {
      id: "id",
      text: "text",
      created_at: {
        type: "timestamptz",
        default: pgm.func("current_timestamp"),
        notNull: true,
      },
      editted_at: {
        type: "timestamptz",
        default: pgm.func("current_timestamp"),
        notNull: false,
      },
    },
    {
      ifNotExists: true,
    }
  );

  pgm.createIndex("todos", "id");
};

exports.down = (pgm) => {
  pgm.dropTable("todos", {
    ifExists: true,
  });
};
