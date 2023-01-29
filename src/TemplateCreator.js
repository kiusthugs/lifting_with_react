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
    <div className="template-creator">
      <div className="template-border">
        <div className="nav-header">
        <Link to="/">Home</Link>
        <Link to="/history">Overview</Link>
        </div>
        <h1>Create a Workout</h1>
        <label htmlFor="wname">Workout Name: </label>
        <input type="text" id="wname" name="wname" onChange={(e) => handleTemplateNameInput(e)} value={templateNameInput}></input><br /><br />
        <label htmlFor="addExercises">Add Exercises: </label>
        <input type="text" id="addExercises" name="addExercises" onChange={(e) => handleExerciseInput(e)} value={templateExerciseInput}></input>
        <button onClick={handleAddExercise} className="template-add">Add Exercise</button>
        <ol>
        {templateExercises && templateExercises.map((exercise) => <li key={exercise.id}>{exercise.name}</li>)}
        </ol>
        <button onClick={handleSave} className="template-save">Save Workout</button>
      </div>
        {(templates !== undefined && templates.length > 0) && <TemplateLibrary templates={templates} handleDeleteTemplate={handleDeleteTemplate}/>}<br />
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/history" className="nav-link">Overview</Link>
    </div>
  )
}
