const asyncHandler = require('express-async-handler')

const Categories = require('../models/categoryModel')

// @desc Get All categories
// @route GET /api/category
// @access Public

const getCategories = asyncHandler(async (req, res) => {
    const categories = await Categories.find()
    res.status(200).json(categories)
});

// @desc Create a category
// @route GET /api/category
// @access Private

const setCategory = asyncHandler(async (req, res) => {
    
    if (!req.body.name) {
        res.status(400)
        throw new Error('fill in fields!')
    }

    const category = await Categories.create({
        name: req.body.name
    })

    res.status(200).json(category)
});

module.exports = {
    getCategories,
    setCategory
}