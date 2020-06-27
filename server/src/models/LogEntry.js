const mongoose = require('mongoose');

const { Schema } = mongoose;

const requiredString = {
    type: String,
    required: true,
}

const requiredNumber = {
    type: Number,
    required: true
}

const defaultRequiredDate = { 
    type: Date, 
    default: Date.now, 
    required: true,
}

const logEntrySchema = new Schema({
    title: requiredString,
    description: String,
    comments: String,
    image: String,
    rating: {
        type: Number,
        min: 0,
        max: 10,
        default: 0,
    },
    latitude: requiredNumber,
    longitude: requiredNumber,
    create_at: defaultRequiredDate,
    updated_at: defaultRequiredDate,
})