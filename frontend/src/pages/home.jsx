import { useEffect } from 'react'

import Navbar from "../components/Navbar"

import WorkoutDetails from '../components/workoutDetails'
import WorkoutForm from '../components/WorkoutForm'

import { useWorkoutsContext } from '../hooks/WorkoutsHook'

const Home = () => {

    //local workout state
    const {workouts, dispatch} = useWorkoutsContext()

    //fetching data from API
    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch('/api/workouts')

            const json = await response.json()

            if (response.ok) {
                dispatch({type: 'SET_WORKOUTS', payload:json})
            }

            if (!response.ok) {
                console.log(`${response.status}: ${json.error}`)
            }
        }

        fetchWorkouts()
    }, [dispatch])

    return (
        <main className="home-page">
            <Navbar />
            <section className="workouts w-full flex px-20 justify-between gap-8">
                <section className="workouts-list w-3/5 flex flex-col">
                    {workouts && workouts.map((w) => {
                        return (
                            <WorkoutDetails workout={w} key={w._id}/>
                        )
                    })}
                </section>

                <WorkoutForm /> 
            </section>
        </main>
    )
}

export default Home