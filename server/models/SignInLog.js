const mongoose = require('mongoose');

const signInLogSchema = mongoose.Schema({
    user_id: {
        type: String,
        maxlength: 30,
        unique: 1,
        required: true
    },
    date: {
        type : Date,
        required: true
    },
})

const SignInLog = mongoose.model('User', signInLogSchema)

module.exports = { SignInLog }