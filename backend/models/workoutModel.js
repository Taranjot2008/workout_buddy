const mongoose = require('mongoose')

//intialize schema
const Schema = mongoose.Schema

//create workout schema
const workoutSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    load: {
        type: Number,
        required: true
    }
}, { timestamps: true })

//export schema
module.exports = mongoose.model('Workout', workoutSchema)