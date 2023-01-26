import React from 'react'
import ExerciseInputs from './ExerciseInputs'
import {useParams} from 'react-router-dom'

export default function DisplayWorkout({templates, addSet, handleSaveWorkout}) {
    console.log(templates)
    const {id} = useParams()

    const index = templates.findIndex(el => el.id === id)

    //work on display workout inputs
    //edit button?
    //Delete button

    //if history length is greater than 0, display history
    //pass history object in Display History
  return (
    <div>
        <h2>{templates[index].name}</h2>
        <ExerciseInputs template={templates[index]} index={index} addSet={addSet}/>
        <button onClick={() => handleSaveWorkout(index)}>Save</button>
        {templates[index].history.length > 0 && <DisplayHistory />}
    </div>
  )
}
