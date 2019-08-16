const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        index: true,
        unique: true,
        dropDups: true,
        required: true,
    },
    passwordHash: { //salted and hashed using bcrypt
        type: String,
        required: true,
    },
    isTeacher: {
        type: Boolean,
        required: true
    },
    classesIds: {
        type: Array,
        required: true
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;