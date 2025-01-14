const mongoose = require('mongoose');

const notesschema = new mongoose.Schema({
    id: { type: String, unique: true, required: true },
    userid: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    dateadded: { type: Date, default: Date.now },
})
module.exports = mongoose.model('Note', notesschema)