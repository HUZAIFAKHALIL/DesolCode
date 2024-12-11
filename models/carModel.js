const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    carModel: {
        type: String,
        required: true,
        minlength: 3
    },
    price: {
        type: Number,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,
        minlength: 11,
        maxlength: 12,
        match: [/^\+?[1-9]\d{1,14}$/, 'Please fill a valid phone number']
    },
    images: [{
        type: String,
        required: true
    }]
}, { timestamps: true });

const Car = mongoose.model('Car', carSchema);

module.exports = Car;
