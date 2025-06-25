import knex from 'knex';
import config from '../knexfile.js';

const db = knex(config.development);

class VenueClass {

  async getAllVenues() {
    const query = db('venues').select('venues.*');

    const results = await query;

    return results;
  }
}
export default VenueClass;