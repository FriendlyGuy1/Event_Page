const express = require('express');
const router = express.Router();

const {
    getCategories,
    setCategory
} = require('../controllers/categoryController');

const { protectAdmin } = require('../middleware/adminAuthMiddleware');

router.route('/').get(getCategories).post(protectAdmin, setCategory);

module.exports = router;