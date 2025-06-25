import { faker } from '@faker-js/faker';

/**
 * @param {import("knex").Knex} knex
 */
export async function seed(knex) {

  const organizers = Array.from({ length: 10 }).map((_, i) => ({
    id: i + 1,
    name: faker.person.fullName(),
  }));

  await knex('organizers').insert(organizers);
}
