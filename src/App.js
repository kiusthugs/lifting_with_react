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
  console.log(templates)

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

  function handleSave() {
    const savedTemplate = {
      id: uuidv4(),
      name: templateNameInput,
      exercises: templateExercises,
      history: {},
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

  function addSet(exercise, reps, weight, index) {
    console.log(exercise)
    console.log(templates)

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


  // const template = {
  //   id: 0,
  //   templateName: "Leg Day",
  //   exercises: ["Curls", "Calf Raises"],
  //   history: {

  //   }
  // }

  // const completedWorkout = [
  //   {
  //     id: 0,
  //     exercise: "Curls",
  //     sets: [
  //       {
  //         id: 0,
  //         set: 1,
  //         reps: 10,
  //         weight: "135lbs"
  //       },
  //       {
  //         id: 1,
  //         set: 2,
  //         reps: 12,
  //         weight: "120lbs"
  //       }
  //     ]
  //   },

  //   {
  //     id: 1,
  //     exercise: "Calf Raises",
  //     sets: [
  //       {
  //         id: 0,
  //         set: 1,
  //         reps: 12,
  //         weight: "80lbs"
  //       },
  //       {
  //         id: 1,
  //         set: 2,
  //         reps: 15,
  //         weight: "60lbs"
  //       }
  //     ]
  //   }

  // ]

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<TemplateCreator handleExerciseInput={handleExerciseInput} handleAddExercise={handleAddExercise} templateExercises={templateExercises} handleTemplateNameInput={handleTemplateNameInput} handleSave={handleSave} templates={templates} templateNameInput={templateNameInput} templateExerciseInput={templateExerciseInput}/>}/>
     <Route path="/:id" element={<DisplayWorkout templates={templates} addSet={addSet}/>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
