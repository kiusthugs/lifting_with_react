import React from 'react'
import ExerciseInputs from './ExerciseInputs'
import {useParams} from 'react-router-dom'

export default function DisplayWorkout({templates, addSet}) {
    console.log(templates)
    const {id} = useParams()

    const index = templates.findIndex(el => el.id === id)

    //work on display workout inputs
    //edit button?
  return (
    <div>
        <h2>{templates[index].name}</h2>
        <ExerciseInputs template={templates[index]} index={index} addSet={addSet}/>
    </div>
  )
}
