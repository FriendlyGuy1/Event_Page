const express = require('express');
const router = express.Router();

const {
    setEvent,
    getAllEvents,
    updateEvent, 
    deleteEvent
} = require('../controllers/eventController');

const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getAllEvents).post(protect, setEvent);
router.route('/:id').put(protect, updateEvent).delete(protect, deleteEvent);

module.exports = router;