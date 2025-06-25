import { faker } from '@faker-js/faker';

/**
 * @param {import("knex").Knex} knex
 */
export async function seed(knex) {

  const venues = Array.from({ length: 10 }).map((_, i) => ({
    id: i + 1,
    name: faker.company.name(),
    location: faker.location.city(),
  }));

  await knex('venues').insert(venues);
}
