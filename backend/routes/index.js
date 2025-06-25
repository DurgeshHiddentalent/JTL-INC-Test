import express from 'express';
const router = express.Router();
import EventController from '../Controller/EventController.js';
import OrganizerController from '../Controller/OrganizerController.js';
import VenueController from '../Controller/VenueController.js';

router.get('/events', EventController.getAllEvents);
router.get('/events/:id', EventController.getEventById);
router.post('/events', EventController.createEvent);
router.put('/events/:id', EventController.editEvent);

router.get('/venues', VenueController.getAllVenues);
router.get('/organizers', OrganizerController.getAllOrganizers);


export default router;

