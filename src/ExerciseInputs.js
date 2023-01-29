import React, {useState} from 'react'
import CompletedLifts from './CompletedLifts'

export default function ExerciseInputs({template, index, addSet, handleEditSet, handleDeleteSet}) {
    const [reps, setReps] = useState("")
    const [weight, setWeight] = useState("")

    function handleReps(e) {
        setReps(e.target.value)
    }

    function handleWeight(e) {
        setWeight(e.target.value)
    }

  return (
    template.exercises.map((ex) => {
        return (<div key={ex.id}><div className="exercise">
            <h3>{ex.name}</h3>
            <div className="exercise-input">
            <input type="text" id="reps" name="reps" onChange={(e) => handleReps(e)}/>
            <span> Reps @ </span>
            <input type="text" id="weight" name="weight" onChange={(e) => handleWeight(e)}/><span> lbs </span>
            <button onClick={() => addSet(ex, reps, weight, index)}>Add Set</button>
            </div>
            <h4>Completed:</h4>
        </div>
        <ul className="completed-lifts">
        <CompletedLifts completed={ex.completed} handleEditSet={handleEditSet} handleDeleteSet={handleDeleteSet} exercises={ex} template={template}/>
        </ul>
        </div>)
    })
  )
}
