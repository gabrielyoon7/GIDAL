const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    user_id: {
        type: String,
        maxlength: 30,
        unique: 1,
        required: true
    },
    date: [{
        selected_date: [{
            name: String
        }]
    }]
})

const UserTodo = mongoose.model('UserTodo', todoSchema)

module.exports = { UserTodo }