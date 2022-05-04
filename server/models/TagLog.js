const mongoose = require('mongoose');

const tagSchema = mongoose.Schema({
    question_id: {
        type : String,
        required: true
    },
    user_id: {
        type: String,
        maxlength: 30,
        required: true
    },
    diary_id:{
        type : String,
        required: true
    }
    date: {
        type : Date,
        required: true
    },
    tag: {
        type : String,
        required: true
    },
})

const TagLog = mongoose.model('TagLog', tagSchema)

module.exports = { TagLog }