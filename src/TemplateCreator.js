import React from 'react'
import TemplateLibrary from './TemplateLibrary'
import {Link} from 'react-router-dom'

export default function TemplateCreator(props) {

    const {
        handleExerciseInput, 
        handleAddExercise, 
        templateExercises,
        handleTemplateNameInput,
        handleDeleteTemplate,
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
        {(templates !== undefined && templates.length > 0) && <TemplateLibrary templates={templates} handleDeleteTemplate={handleDeleteTemplate}/>}<br />
        <Link to="/">Home</Link>
        <Link to="/history">Dashboard</Link>
    </div>
  )
}
