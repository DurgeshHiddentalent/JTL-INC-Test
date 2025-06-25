import VenueClass from '../services/VenueClass.js';
import response from '../utils/response.js';

const venueClass = new VenueClass();


const getAllVenues = async (req, res) => {
    try {
        const venues = await venueClass.getAllVenues(req.query);
        response.success(res, venues);
    } catch (error) {
        response.error(res, error);
    }
};

export default {
    getAllVenues
};