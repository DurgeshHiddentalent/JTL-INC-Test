/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('event_tags', table => {
        table.integer('event_id').unsigned().notNullable()
            .references('id').inTable('events')
            .onDelete('CASCADE');
        table.string('tag').notNullable();

        table.primary(['event_id', 'tag']);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('event_tags');
};

