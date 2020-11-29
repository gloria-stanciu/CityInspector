
exports.up = function(knex) {
    return knex.schema.createTableIfNotExists('users', function (table){
        table.increments('id').unsigned().primary();
        table.string('first_name').notNullable();
        table.string('last_name').notNullable();
        table.string('phone_number').notNullable();
        table.string('password').notNullable();
        table.integer('points').defaultTo(0);
        table.boolean('is_admin').defaultTo(false);
    }).createTableIfNotExists('facilities', function(table){
        table.increments('id').unsigned().primary();
        table.string('name').notNullable();
        table.integer('value').notNullable();
    }).createTableIfNotExists('transactions', function (table){
        table.increments('id').unsigned().primary();
        table.integer('user_id')
            .notNullable()
            .references('id')
            .inTable('users')
            .onDelete('CASCADE')
            .index();
        table.integer('used_facility')
            .notNullable()
            .references('id')
            .inTable('facilities')
            .onDelete('CASCADE')
            .index();;
    }).createTableIfNotExists('problem_types', function(table){
        table.increments('id').unsigned().primary();
        table.string('name').notNullable();
        table.integer('points').notNullable();
    }).createTableIfNotExists('problems', function(table){
        table.increments('id').unsigned().primary();
        table.integer('type_id')
            .notNullable()
            .references('id')
            .inTable('problem_types')
            .onDelete('CASCADE')
            .index();;
        table.integer('user_id')
            .notNullable()
            .references('id')
            .inTable('users')
            .onDelete('CASCADE')
            .index();;
        table.string('description').notNullable();
        table.decimal('lat', 10, 6).notNullable();
        table.decimal('long', 10, 6).notNullable();
    })
};

exports.down = function(knex) {
  return knex.schema.dropTable('users')
                    .dropTable('transactions')
                    .dropTable('facilities')
                    .dropTable('problem_type')
                    .dropTable('problem')
};
 