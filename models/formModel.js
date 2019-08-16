const mongoose = require('mongoose');

const Form = mongoose.model('Form', { name: String, a1: String, a2: String, a3: String, a4: String, a5: String });

module.exports = Form;