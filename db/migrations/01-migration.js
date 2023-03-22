// ==================================================

exports.up = async (knex) => {
  
  // -Drop here if already exists!
  // await knex.schema.dropTableIfExists('cars');
  
  await knex.schema
    .createTable('cars', (tbl) => {
      tbl.increments('id');
      tbl.string('name', 200);
      tbl.timestamps(false, true);
    })
};

// ==================================================

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('cars');
};

// ==================================================