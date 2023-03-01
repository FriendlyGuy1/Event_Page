const express = require('express');
const router = express.Router();

const {
    getAllEvents,
    getEventsAnon,
    setEvent,
    updateEvent,
    deleteEvent
} = require('../controllers/eventController');

const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getAllEvents).post(protect, setEvent);
router.route('/anon').get(getEventsAnon);
router.route('/:id').put(protect, updateEvent).delete(protect, deleteEvent);

module.exports = router;