const mongoose = require('mongoose');

const catogorySchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add a category']
        },
    },
    {
        timestamps: true
   }
)

module.exports = mongoose.model('Category', catogorySchema);