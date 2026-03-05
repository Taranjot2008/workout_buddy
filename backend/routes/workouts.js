const express = require('express')
 
//create a router
const router = express.Router()

//import schema
const Workout = require('../models/workoutModel')

//controllers
const { getAllWorkouts, getSingleWorkout, createWorkout, deleteWorkout } = require('../controllers/workoutControllers')

//get all workouts
router.get('/', (req, res) => {
    getAllWorkouts(req, res)
})

//get single workout
router.get('/:id', (req, res) => {
    getSingleWorkout(req, res)

})

//create a workout
router.post('/', async (req, res) => {
    createWorkout(req, res)
})

//delete a workout
router.delete('/:id', (req, res) => {
    deleteWorkout(req, res)
})

//update a workout
router.patch('/:id', (req, res) => {
    res.json({message: "Update a Workout"})
})

//export workouts
module.exports = router