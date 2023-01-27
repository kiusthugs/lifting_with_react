import React from 'react'
import ExerciseInputs from './ExerciseInputs'
import DisplayHistory from './DisplayHistory'
import {useParams, Link} from 'react-router-dom'

export default function DisplayWorkout({templates, addSet, handleSaveWorkout, handleEditSet}) {
    console.log(templates)
    const {id} = useParams()

    const index = templates.findIndex(el => el.id === id)

  return (
    <div>
        <h2>{templates[index].name}</h2>
        <ExerciseInputs template={templates[index]} index={index} addSet={addSet} handleEditSet={handleEditSet}/>
        <button onClick={() => handleSaveWorkout(index)}>Save</button>
        {templates[index].history.length > 0 && <DisplayHistory template={templates[index]}/>}
        <Link to="/">Home</Link>
        <Link to="/history">Dashboard</Link>
    </div>
  )
}
