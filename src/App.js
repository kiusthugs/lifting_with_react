import React, {useState, useEffect} from 'react';
import './styles/App.css';
import TemplateCreator from './TemplateCreator';
import DisplayWorkout from './DisplayWorkout';
import DisplayMasterData from './DisplayMasterData';
import { v4 as uuidv4 } from 'uuid';
import { BrowserRouter, Routes, Route } from "react-router-dom";



function App() {

  const [templates, setTemplates] = useState([])
  const [templateExercises, setTemplateExercises] = useState([])
  const [templateNameInput, setTemplateNameInput] = useState("")
  const [templateExerciseInput, setTemplateExerciseInput] = useState("")

  useEffect(() => {
    const templateData = localStorage.getItem('templates')
    if (templateData) {
      setTemplates(JSON.parse(templateData))
    }
  }, [])

  useEffect(() => {
      localStorage.setItem('templates', JSON.stringify(templates))
  }, [templates])

  function handleTemplateNameInput(e) {
    setTemplateNameInput(e.target.value)
  } 

  function handleExerciseInput(e) {
    setTemplateExerciseInput(e.target.value)
  }

  //Add exercise to template
  function handleAddExercise() {
    if (templateExerciseInput.length > 0) {
      const exerObj = {
        id: uuidv4(),
        name: templateExerciseInput,
        completed: []
      }
      console.log(templateExercises)
      if (templateExercises.length > 0) {
        setTemplateExercises([...templateExercises, exerObj])
        setTemplateExerciseInput("")
      } else {
        setTemplateExercises([exerObj])
        setTemplateExerciseInput("")
      }
    } else {
      alert("Input an exercise name")
    }
  }

  //Save to template library
  function handleSave() {

    if (templateNameInput.length > 0) {
      const savedTemplate = {
        id: uuidv4(),
        name: templateNameInput,
        exercises: templateExercises,
        history: [],
      }
  
      if(templates) {
        setTemplates([...templates, savedTemplate])
        setTemplateExercises([])
        setTemplateExerciseInput("")
        setTemplateNameInput("")
      } else {
        setTemplates([savedTemplate])
        setTemplateExercises([])
        setTemplateExerciseInput("")
        setTemplateNameInput("")
      }
    } else {
      alert("Save your templates with a name")
    }
  }

  function handleSaveWorkout(index) {
    //Put deep copy of exercises in history, clear shallow copy completed property
    const copyWorkoutDeep = JSON.parse(JSON.stringify([...templates]))
    const copyWorkout = [...templates]
    const foundWorkoutDeep = copyWorkoutDeep[index]
    const foundWorkout = copyWorkout[index]

    foundWorkout.history = [...foundWorkoutDeep.exercises]
    foundWorkout.exercises.forEach((el) => el.completed = [])
    console.log(foundWorkout)

    setTemplates(copyWorkout)
    setTemplateExerciseInput("")
    setTemplateNameInput("")
  }

  //Add exercise sets to workout
  function addSet(exercise, reps, weight, index) {

    const copyTemplates = [...templates]

    const found = copyTemplates[index].exercises.find(el => el.id === exercise.id)
    found.completed = [...found.completed, {
      id: uuidv4(),
      set: exercise.completed.length + 1,
      reps: reps,
      weight: weight
  }]

    setTemplates(copyTemplates)

}


  //Delete a template from template library
  function handleDeleteTemplate(id) {
    const copyTemp = [...templates]
    const index = copyTemp.findIndex(el => el.id === id)
    copyTemp.splice(index, 1)

    setTemplates(copyTemp)
  }

  //Edit button, edit a set in a ongoing workout
  function handleEditSet(id, exercises, template) {
    let editReps = Number(prompt("Enter reps"))
    while(!/^[0-9]+$/.test(editReps)) {
      alert("You did not enter a number.");
      editReps = prompt("Enter a number for reps: ");
    }
    let editWeight = prompt("Enter weight")
    while(!/^[0-9]+$/.test(editWeight)) {
      alert("You did not enter a number.");
      editWeight = prompt("Enter a number for weight: ");
    }
    const copyTemplates = [...templates]

    const templateIndex = copyTemplates.findIndex(el => el.id === template.id)
    const exerciseIndex = copyTemplates[templateIndex].exercises.findIndex(el => el.id === exercises.id)
    const completedIndex = copyTemplates[templateIndex].exercises[exerciseIndex].completed.findIndex(el => el.id === id)

    copyTemplates[templateIndex].exercises[exerciseIndex].completed[completedIndex].reps = editReps
    copyTemplates[templateIndex].exercises[exerciseIndex].completed[completedIndex].weight = editWeight

    setTemplates(copyTemplates)

  }

  //Delete set button on ongoing workout
  function handleDeleteSet(id, exercises, template) {
    console.log(id)
    console.log(exercises)
    console.log(template)

    const copyTemplates = [...templates]

    const templateIndex = copyTemplates.findIndex(el => el.id === template.id)
    const exerciseIndex = copyTemplates[templateIndex].exercises.findIndex(el => el.id === exercises.id)
    const completedIndex = copyTemplates[templateIndex].exercises[exerciseIndex].completed.findIndex(el => el.id === id)

    copyTemplates[templateIndex].exercises[exerciseIndex].completed.splice(completedIndex, 1)

    for (let i = 0; i < copyTemplates[templateIndex].exercises[exerciseIndex].completed.length; i++) {
      console.log("here")
      copyTemplates[templateIndex].exercises[exerciseIndex].completed[i].set = i + 1
    }

    setTemplates(copyTemplates)

  }

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<TemplateCreator handleExerciseInput={handleExerciseInput} handleAddExercise={handleAddExercise} templateExercises={templateExercises} handleTemplateNameInput={handleTemplateNameInput} handleSave={handleSave} templates={templates} templateNameInput={templateNameInput} templateExerciseInput={templateExerciseInput} handleDeleteTemplate={handleDeleteTemplate}/>}/>
     <Route path="/:id" element={<DisplayWorkout templates={templates} addSet={addSet} handleSaveWorkout={handleSaveWorkout} handleEditSet={handleEditSet} handleDeleteSet={handleDeleteSet}/>} />
     <Route path="/history" element={<DisplayMasterData templates={templates}/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
