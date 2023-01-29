import React from 'react'
import ExerciseInputs from './ExerciseInputs'
import DisplayHistory from './DisplayHistory'
import {useParams, Link} from 'react-router-dom'

export default function DisplayWorkout({templates, addSet, handleSaveWorkout, handleEditSet, handleDeleteSet}) {
    console.log(templates)
    const {id} = useParams()

    const index = templates.findIndex(el => el.id === id)

  return (
    <div className="display-workout">
        <h2>{templates[index].name}</h2>
        <ExerciseInputs template={templates[index]} index={index} addSet={addSet} handleEditSet={handleEditSet} handleDeleteSet={handleDeleteSet}/>
        <div className="workout-button-container">
          <button onClick={() => handleSaveWorkout(index)} id="save">Save</button>
        </div>
        {templates[index].history.length > 0 && <DisplayHistory template={templates[index]}/>}
        <div className="workout-footer">
        <Link to="/" className="nav-link-workout">Home</Link>
        <Link to="/history" className="nav-link-workout">Overview</Link>
        </div>
    </div>
  )
}
