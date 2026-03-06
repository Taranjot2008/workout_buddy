require('dotenv').config()

//initialize express
const express = require('express')

//create app
const app = express()

//database
const mongoose = require('mongoose')

//import routes
const workoutRoutes = require('./routes/workouts')

//import CORS
const cors = require("cors");


//middleware
app.use(express.json())

//cors middleware to allow requests from frontend
app.use(cors({
  origin: "https://trainmate-client.onrender.com",
  methods: ["GET", "POST", "PATCH", "DELETE"],
  credentials: true
}));

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
