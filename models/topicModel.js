const mongoose = require('mongoose');

const Topic = mongoose.model('Topic', { 
    author: String, 
    group: String,
    topic: String
});

module.exports = Topic;