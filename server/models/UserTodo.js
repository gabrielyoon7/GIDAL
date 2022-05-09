const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    user_id: {
        type: String,
        maxlength: 30,
        unique: 1,
        required: true
    },
    to_do_list: [{
        date: String,
        value: String,
        isDone: Boolean,
        key: String
    }]
})

const UserTodo = mongoose.model('UserTodo', todoSchema)

module.exports = { UserTodo }