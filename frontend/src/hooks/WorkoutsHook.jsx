import { useContext } from 'react'

import { WorkoutsContext } from '../context/WorkoutsContext'

export const useWorkoutsContext = () => {
    const context = useContext(WorkoutsContext)

    if (!context) {
        throw Error ('useContext must be used inside the provider')
    }

    return context
}
