const asyncHandler = require('express-async-handler');

const Event = require('../models/eventModel');

// @desc Get All events
// @route GET /api/events
// @access PRIVATE

const getAllEvents = asyncHandler(async (req, res) => {
  const events = await Event.find({ user: req.user.id})
  res.status(200).json(events)
})

// @desc Get All events
// @route GET /api/events
// @access Public

const getEventsAnon = asyncHandler(async (req, res) => {
  const events = await Event.find()
  res.status(200).json(events)
})

// @desc Set event
// @route POST /api/events
// @access PRIVATE
const setEvent = asyncHandler(async (req, res) => {
    if (!req.body.title || !req.body.category || !req.body.price || !req.body.time) {
      res.status(400)
      throw new Error('fill all the fields!')
    }
    const event = await Event.create({
      title: req.body.title,
      category: req.body.category,
      time: req.body.time,
      price: req.body.price,
      user: req.user.id
    })
    res.status(200).json(event)
  })

// @desc Update event
// @route PUT /api/events/:id
// @access PRIVATE

const updateEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id)

  if (!event) {
    res.status(400)
    throw new Error('Event not found')
  }

  // check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

 //make sure the logged in user matches the goal user
 if (event.user.toString() !== req.user.id && req.user.role !== "admin"){
    res.status(401);
    throw new Error("Not authorized");
 }

 // if admin or event creator can edit
 if (req.user.role === "admin" || event.user.toString() === req.user.id){
    const updateEvent = await Event.findByIdAndUpdate(req.params.id, req.body ,{
        new: true
    })
    res.status(200).json(updateEvent)
 }
})

// @desc Delete event
// @route DELETE /api/events/:id
// @access PRIVATE

const deleteEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id)

  if (!event) {
    res.status(400)
    throw new Error('Event not found')
  }

  // check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // make sure the logged in user matches the goal user
  if (event.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  await event.deleteOne();

  res.status(200).json({ id: req.params.id })
})

  module.exports = {
    getAllEvents,
    getEventsAnon,
    setEvent,
    updateEvent,
    deleteEvent
  }