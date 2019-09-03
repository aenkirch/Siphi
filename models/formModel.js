const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    a1: { 
        type: String,
        required: true,
    },
    a2: { 
        type: String,
        required: true,
    },
    a3: { 
        type: String,
        required: true,
    },
    a4: { 
        type: String,
    },
    a5: { 
        type: String,
    },
    relatedGroup: { 
        type: String,
        required: true,
    },
    completedBy: { 
        type: Array,
        required: true,
    }
});

const Form = mongoose.model('Form', formSchema);

module.exports = Form;