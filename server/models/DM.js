const mongoose = require('mongoose');

const dmSchema = mongoose.Schema({
    // opponent_id: {
    //     type: String,
    //     maxlength: 50,
    //     unique: 1,
    //     required: true
    // },
    sender: {  //송신자
        type: String,
        required: true
    },
    opponent_id: { //수신자
        type: String,
        required: true
    },
    title: {
        type : String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: [{
        type: String,
        required: true
    }]
})

const DM = mongoose.model('DM', dmSchema)

module.exports = { DM }