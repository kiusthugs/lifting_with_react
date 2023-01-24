import React from 'react'
import TemplateLibrary from './TemplateLibrary'

export default function TemplateCreator(props) {

    const {
        handleExerciseInput, 
        handleAddExercise, 
        templateExercises,
        handleTemplateNameInput,
        templateExerciseInput,
        templateNameInput,
        handleSave,
        templates
    } = props


  return (
    <div>
        <h1>Create a Workout</h1>
        <label htmlFor="wname">Workout Name: </label>
        <input type="text" id="wname" name="wname" onChange={(e) => handleTemplateNameInput(e)} value={templateNameInput}></input><br /><br />
        <label htmlFor="addExercises">Add Exercises: </label>
        <input type="text" id="addExercises" name="addExercises" onChange={(e) => handleExerciseInput(e)} value={templateExerciseInput}></input>
        <button onClick={handleAddExercise}>Add Exercise</button>
        <ul>
        {templateExercises && templateExercises.map((exercise) => <li key={exercise.id}>{exercise.name}</li>)}
        </ul>
        <button onClick={handleSave}>Save Workout</button>
        {templates !== undefined && <TemplateLibrary templates={templates}/>}
    </div>
  )
}
