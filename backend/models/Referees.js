// backend/models/Referee.js
const mongoose = require('mongoose');

const refereeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    experience: {
        type: String,
        required: true, // Años de experiencia como árbitro
        min: 0
    },
    certifications: {
        type: [String], // Array de certificaciones obtenidas
        default: []
    },
    city: {
        type: String,
        required: true
    },
    province: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    }
});

// Especifica explícitamente que el modelo debe usar la colección 'referees'
module.exports = mongoose.model('arbitros', refereeSchema);
