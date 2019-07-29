const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//CREATE SCHEMA
const GroupSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    amount: {
        type: String,
        required: true,
    },
    frequency: {
        type: String,
        required: true,
    },
    accountNumber: {
        type: String,
        required: true,
    },
    bankName: {
        type: String,
        required: true,
    },
    rules: {
        type: String,
    },
    groupAdmin: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('groups', GroupSchema);