const mongoose = require('mongoose');

const tagSchema = mongoose.Schema({
    type: {
        type: String,
        maxlength: 30,
        required: true
    },
    question: {
        type : String,
        required: true
    },
    tags: {
        type: Array,
        tags : [{tag : String}]
    },
})

const Tag = mongoose.model('Tag', tagSchema)

module.exports = { Tag }