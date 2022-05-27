
const mongoose = require('mongoose')

const exampleSchema = mongoose.Schema({
    title: { type: String, required: true, index: true },
    description: { type: String, required: true }
})

const Example = mongoose.model('Example', exampleSchema);

module.exports = { Example }