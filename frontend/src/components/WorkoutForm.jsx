import { useState } from 'react'

import { useWorkoutsContext } from '../hooks/WorkoutsHook'

const WorkoutForm = () => {
    //local state for form inputs
    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    //constant for api url
    const API_url = import.meta.env.VITE_API_URL

    const {dispatch} = useWorkoutsContext()

    //handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault()

        const workout = { title, load, reps }

        const response = await fetch(`${API_url}/api/workouts`, {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json()

        if (!response.ok) {
            setError (json.error)
            setEmptyFields(json.emptyFields)
        }

        if (response.ok) {
            setTitle('')
            setLoad('')
            setReps('')
            setError(null)
            setEmptyFields([])

            console.log('New Workout Added')

            dispatch({type: 'CREATE_WORKOUT', payload: json})
        }
    }


    return (
        <form onSubmit={handleSubmit} className="workout-form w-sm h-[55vh] p-5 flex flex-col gap-2 mr-8 rounded-lg bg-gray-100">
            <h3 className="form-heading text-2xl font-bold text-sky-500 mb-4 text-center
            font-(family-name:--heading-font)">Add a New Workout</h3>
            <label className={`form-label font-medium font-(family-name:--form-font) 
                ${emptyFields.includes('title') ? 'text-red-500' : ''}`}>Exercise Title:</label>
            <input type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            />

            <label className="form-label font-medium font-(family-name:--form-font)">Load:</label>
            <input type="number"
            onChange={(e) => setLoad(e.target.value)}
            value={load}
            />

            <label className="form-label font-medium font-(family-name:--form-font)">Reps:</label>
            <input type="number"
            onChange={(e) => setReps(e.target.value)}
            value={reps}
            />

            <button type='submit' className='submit-button gradient-bg p-2 text-gray-700 text-lg flex items-center justify-center
            rounded-lg mt-3 font-bold hover:cursor-pointer'>Add Workout</button>

            {error && <div className="error-message text-red-500 font-medium">{error}</div> }
        </form>
    )
}


export default WorkoutForm