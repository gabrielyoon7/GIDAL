const mongoose = require('mongoose');

const testTodoSchema = mongoose.Schema({
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

const TestTodo = mongoose.model('TestTodo', testTodoSchema)

module.exports = { TestTodo }