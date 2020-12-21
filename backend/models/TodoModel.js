const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    completed: {
        type: Boolean,
        require: true
    },
    id: {
        type: String,
        require: true
    },
    text: {
        type: String,
        require: true
    },
    toggleEdit: {
        type: Boolean,
        require: true
    },
});


module.exports = mongoose.model('Todo', TodoSchema);