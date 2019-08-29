const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        index: true,
        unique: true,
        dropDups: true,
        required: true,
    },
    label: { 
        type: String,
        unique: true,
        required: true,
    }
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;