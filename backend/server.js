require('dotenv').config()

//initialize express
const express = require('express')

//create app
const app = express()

//database
const mongoose = require('mongoose')

//import routes
const workoutRoutes = require('./routes/workouts')


//middleware
app.use(express.json())

//routes
app.use('/api/workouts', workoutRoutes)

//connect to database
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`server is running on port ${process.env.PORT}`)
        })
    })
    .catch(err =>  console.log(err))

//listening to port 4000
