const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    user_id: {
        type: String,
        maxlength: 30,
        unique: 1,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        maxlength: 30,
        required: true
    },
    bday: {
        type : Date,
        required: true
    },
    gender: {
        type: String,
        maxlength: 10,
        required: true
    },
    location: {
        type: String,
        maxlength: 100,
        required: true
    },
    following: [{
        user_id: String,
        name: String,
        img: String,
    }],
    follower: [{
        user_id: String,
        name: String,
        img: String,
    }],
    profile_image : {
        type: String
    },
    point: {
        type: Number,
        default: 0
    },
    count_diary_total: {
        type: Number,
        default: 0
    },
    count_diary_everyday: {
        type: Number,
        default: 0
    },
    items: [{
        id: String
    }],
    sentDm: [{
        opponent_id: String,
        title: String,
        content: String,
        date: Date,
        time: String,
    }],
    receivedDm: [{
        opponent_id: String,
        title: String,
        content: String,
        date: Date,
        time: String,
    }],
})

const User = mongoose.model('User', userSchema)

module.exports = { User }