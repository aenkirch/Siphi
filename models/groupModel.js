const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        dropDups: true,
        required: true,
    },
    label: { 
        type: String,
        required: true,
    },
    courseLabel: { 
        type: String,
        required: true,
    }
});

const Group = mongoose.model('Group', groupSchema);

// in order to avoid duplicate entries
Group.collection.createIndex({name: 1, courseLabel: 1}, {unique: true});

module.exports = Group;