
exports.up = function(knex, Promise) {
  // Make a new table called "accounts"
  return knex.schema.createTable('accounts', (table) => {
    // Auto incrementing "id" integer field
    table.increments('id');

    table.string('first_name');
    table.string('last_name');
    table.float('balance');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('accounts');
};
