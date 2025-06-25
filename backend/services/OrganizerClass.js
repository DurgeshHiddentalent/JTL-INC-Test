import knex from 'knex';
import config from '../knexfile.js';

const db = knex(config.development);

class OrganizerClass {

  async getAllOrganizers() {
    const query = db('organizers').select('organizers.*');

    const results = await query;

    return results;
  }
}
export default OrganizerClass;