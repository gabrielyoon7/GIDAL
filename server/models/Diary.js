const mongoose = require('mongoose');

const diarySchema = mongoose.Schema({
    user_id: {
        type: String,
        maxlength: 30,
        required: true
    },
    date: {
        type : Date,
        required: true
    },
    title: {
        type: String,
        maxlength: 50,
    },
    content: {
        type : String,
        required: true
    },
    disclosure: {
        type: String,
        maxlength: 10,
        required: true
    },
    accessible_user: {
        type: Array,
        users : [{user : String}]
    },
    tags: {
        type: Array,
        tags : [{tag : String}]
    },
    stickers: { // 유저, 관리자 구분
        type: Array,
        stickers : [{sticker : String}]
    },
    comments: {
        type: Array,
        comments : [{comment : String}]
    },
    likes: {
        type: Number,
        default: 0
    },
    time_wakeup: {
        type : String,
        // required: true
    },
    time_sleep: {
        type : String,
        // required: true
    },
    likers: {
        type: Array,
        likers: [{user_id: String}]
    }
})

const Diary = mongoose.model('Diary', diarySchema)

module.exports = { Diary }