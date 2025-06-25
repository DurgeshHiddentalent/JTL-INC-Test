import EventClass from '../services/EventClass.js';
import response from '../utils/response.js';

const eventClass = new EventClass();


const getAllEvents = async (req, res) => {
    try {
        const events = await eventClass.getAllEvents(req.query);
        response.success(res, events);
    } catch (error) {
        response.error(res, error);
    }
};

const getEventById = async (req, res) => {
    try {
        const event = await eventClass.getEventById(req.params.id);
        if (!event) return response.notFound(res, 'Event not found');
        response.success(res, event);
    } catch (error) {
        response.error(res, error);
    }
};

const createEvent = async (req, res) => {
    try {
        const newEvent = await eventClass.createEvent(req.body);
        response.success(res, newEvent);
    } catch (error) {

        response.error(res, error);
    }
};

const editEvent = async (req, res) => {
    try {
        const updated = await eventClass.editEvent(req.params.id, req.body);
        response.success(res, updated);
    } catch (error) {
        response.error(res, error);
    }
};

export default {
    getAllEvents,
    getEventById,
    createEvent,
    editEvent,
};