import React from 'react'

import { useWorkoutsContext } from '../hooks/WorkoutsHook'

import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const WorkoutDetails = ({ workout }) => {

    //constant for API url
    const API_url = import.meta.env.VITE_API_URL

    const { dispatch } = useWorkoutsContext()

    const timeOfCreation = new Date(workout.createdAt)
    const now = new Date()
    const ageInHours = (now - timeOfCreation) / (1000 * 60 * 60);
    const isOld = ageInHours > 24;
    
    const handleDelete = async () => {
        const response = await fetch(`${API_url}/api/workouts/${workout._id}`, {
            method: 'DELETE'
        })

        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'DELETE_WORKOUT', payload: json})
        }

        console.log('Workout Deleted')
    }

    return (
        <div className="workouts-list w-full flex flex-col pl-8">
            <div className={`single_workout text-slate-800 bg-gray-100 p-5 rounded-lg flex flex-col relative mb-5
            font-(family-name:--workout-font) gap-1 ${isOld ? 'border border-red-500' : ''}`} key={workout._id}>
                <p className="workout_title text-xl font-bold text-sky-500" key={workout._id}>{workout.title}</p>
                <p className="workout_reps">Reps: <strong>{workout.reps}</strong></p>
                <p className="workout_load">Workout Load: <strong>{workout.load} kgs</strong></p>
                <p className="workout_time_created text-gray-400">
                    {formatDistanceToNow(new Date(workout.createdAt), {addSuffix: true})}
                </p>

                <span 
                    onClick = {handleDelete}
                    className="delete_button absolute top-2 right-2 p-3 text-lg hover:cursor-pointer rounded-lg">
                    <i className="fa-solid fa-trash text-red-500"></i>
                </span>
            </div>
        </div>
    )
}

export default WorkoutDetails