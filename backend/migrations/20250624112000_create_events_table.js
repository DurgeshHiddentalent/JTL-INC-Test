/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function (knex) {
    return knex.schema.createTable('events', table => {
        table.increments('id').primary();
        table.string('title').notNullable();
        table.text('description');
        table.dateTime('date').notNullable();
        
        table.integer('venue_id').unsigned()
            .references('id')
            .inTable('venues')
            .onDelete('SET NULL');
            
        table.integer('organizer_id').unsigned()
            .references('id')
            .inTable('organizers')
            .onDelete('SET NULL');
        table.timestamp('created_at')
            .defaultTo(knex.fn.now());
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('events');
};
