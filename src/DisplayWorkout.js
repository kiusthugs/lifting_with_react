import React from 'react'
import ExerciseInputs from './ExerciseInputs'
import DisplayHistory from './DisplayHistory'
import {useParams} from 'react-router-dom'

export default function DisplayWorkout({templates, addSet, handleSaveWorkout}) {
    console.log(templates)
    const {id} = useParams()

    const index = templates.findIndex(el => el.id === id)

  return (
    <div>
        <h2>{templates[index].name}</h2>
        <ExerciseInputs template={templates[index]} index={index} addSet={addSet}/>
        <button onClick={() => handleSaveWorkout(index)}>Save</button>
        {templates[index].history.length > 0 && <DisplayHistory template={templates[index]}/>}
    </div>
  )
}
