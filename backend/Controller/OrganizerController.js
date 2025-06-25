import OrganizerClass from '../services/OrganizerClass.js';
import response from '../utils/response.js';

const organizerClass = new OrganizerClass();


const getAllOrganizers = async (req, res) => {
    try {
        const organizers = await organizerClass.getAllOrganizers(req.query);
        response.success(res, organizers);
    } catch (error) {
        response.error(res, error);
    }
};

export default {
    getAllOrganizers
};