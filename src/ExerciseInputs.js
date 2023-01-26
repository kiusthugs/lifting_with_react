import React, {useState} from 'react'
import CompletedLifts from './CompletedLifts'

export default function ExerciseInputs({template, index, addSet, exercises}) {
    console.log(exercises)
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
        console.log(ex)
        return <div key={ex.id}>
            <h3>{ex.name}</h3>
            <input type="text" id="reps" name="reps" onChange={(e) => handleReps(e)}/>
            <span> Reps @ </span>
            <input type="text" id="weight" name="weight" onChange={(e) => handleWeight(e)}/><span> lbs </span>
            <button onClick={() => addSet(ex, reps, weight, index)}>Add Set</button>
            <h4>Completed:</h4>
            <CompletedLifts completed={ex.completed}/>
        </div>
    })
  )
}
