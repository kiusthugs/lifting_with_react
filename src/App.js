import React, {useState, useEffect} from 'react';
import './App.css';
import TemplateCreator from './TemplateCreator';
import DisplayWorkout from './DisplayWorkout';
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
  }

  //Save to template library
  function handleSave() {
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

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<TemplateCreator handleExerciseInput={handleExerciseInput} handleAddExercise={handleAddExercise} templateExercises={templateExercises} handleTemplateNameInput={handleTemplateNameInput} handleSave={handleSave} templates={templates} templateNameInput={templateNameInput} templateExerciseInput={templateExerciseInput}/>}/>
     <Route path="/:id" element={<DisplayWorkout templates={templates} addSet={addSet} handleSaveWorkout={handleSaveWorkout}/>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
