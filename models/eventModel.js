const mongoose = require('mongoose');

const eventSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Please add a title']
        },
        category: {
            type: String,
            required: [true, 'Please add a category']
        },
        time: {
            type: String, 
            required: [true, 'Please add a time for the event']
        },
        price: {
            type: String, 
            required: [true, 'Please add a price Eur']
        },
        user: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        approved: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
   }
)

module.exports = mongoose.model('Event', eventSchema)