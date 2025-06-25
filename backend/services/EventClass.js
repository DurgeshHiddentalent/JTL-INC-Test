import knex from 'knex';
import config from '../knexfile.js';

const db = knex(config.development);

class EventClass {

  async getAllEvents(queryParams) {
    const {
      search,
      sortBy = 'date',
      sortOrder = 'asc',
      page = 1,
      limit = 10,
    } = queryParams;

    const offset = (page - 1) * limit;

    const query = db('events')
      .join('organizers', 'events.organizer_id', 'organizers.id')
      .join('venues', 'events.venue_id', 'venues.id')
      .select('events.*', 'organizers.name as organizer', 'venues.name as venue');

    if (search) {
      query.andWhere(function () {
        this.where('events.title', 'like', `%${search}%`)
          .orWhere('organizers.name', 'like', `%${search}%`)
          .orWhere('venues.name', 'like', `%${search}%`);
      });
    }

    const results = await query
      .orderBy(sortBy, sortOrder)
      .limit(limit)
      .offset(offset);

    return results;
  }

  async getEventById(id) {
    if (!id) {
      return null;
    }

    return db('events')
      .where('events.id', id)
      .join('organizers', 'events.organizer_id', 'organizers.id')
      .join('venues', 'events.venue_id', 'venues.id')
      .select('events.*', 'organizers.name as organizer', 'venues.name as venue')
      .first();
  };

  async createEvent(data) {
    const event = await db('events').insert(data);
    return event;
  };

  async editEvent(id, data) {
    if (!id) {
      return null;
    }

    await db('events').where({ id }).update(data);
    return this.getEventById(id);
  };

}
export default EventClass;