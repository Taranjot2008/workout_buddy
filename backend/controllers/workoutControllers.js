const Workout = require('../models/workoutModel')

const mongoose = require('mongoose')

//get all workouts
const getAllWorkouts = async (req, res) => {
    const allWorkouts = await Workout.find({}).sort({ createdAt: -1 })
    res.status(200).json(allWorkouts)
}

//get single workout
const getSingleWorkout = async (req, res) => {
    const { id } = req.params
    const singleWorkout = await Workout.findById(id)
    if (!singleWorkout) {
        return res.status(404).json({error: "No such workout found"})
    }

    res.status(200).json(singleWorkout)
}

//post a workout
const createWorkout = async (req, res) => {

    const { title, reps, load } = req.body
    let emptyFields = []

    if (!title) emptyFields.push('title');
    if (!reps) emptyFields.push('reps');
    if (!load) emptyFields.push('load');

    if (emptyFields.length > 0) {
        console.log(emptyFields)
        return res.status(400).json({error: 'Please fill in all the fields', emptyFields})
    }


    try {
        const workout = await Workout.create({ title, reps, load })
        res.status(200).json(workout)
    }
    catch (err) {
        res.status(400).json({error: err.message})
    }
    
}

//delete a workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such workout found"})
    }

    const workout = await Workout.findOneAndDelete({ _id: id })
    if (!workout) {
        return res.status(404).json({ error: "No such workout found" })
    }

    res.status(200).json(workout)
}

//update a workout
const updateWorkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such workout found"})
    }

    const workout = await Workout.findOneAndUpdate({_id: id}, {...req.body})

    if (!workout) {
        return res.status(404).json({ error: "No such workout found" })
    }

    res.status(200).json(workout)
}

//export requests
module.exports = {
    getAllWorkouts,
    getSingleWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
}