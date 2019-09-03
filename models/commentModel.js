const mongoose = require('mongoose');

const Comment = mongoose.model('Comment', { 
    username: String, 
    date: String,
    comment: String,
    likes: Number,
    topic: String
});

module.exports = Comment;