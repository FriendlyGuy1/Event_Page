const express = require('express');
const router = express.Router();

const {
    getAllEvents,
    getEventsAnon,
    ApproveEvent,
    UnapproveEvent,
    setEvent,
    updateEvent,
    deleteEvent
} = require('../controllers/eventController');

const { protectAdmin } = require('../middleware/adminAuthMiddleware');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getAllEvents).post(protect, setEvent);
router.route('/anon').get(getEventsAnon);
router.route("/approval/:id").put(protectAdmin, ApproveEvent)
router.route("/unapproval/:id").put(protectAdmin, UnapproveEvent)
router.route('/:id').put(protect, updateEvent).delete(protect, deleteEvent);

module.exports = router;