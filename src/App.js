import React, {useState, useEffect} from 'react';
import './App.css';
import TemplateCreator from './TemplateCreator';
import DisplayWorkout from './DisplayWorkout';
import { v4 as uuidv4 } from 'uuid';
import { BrowserRouter, Routes, Route } from "react-router-dom";



function App() {

  const [templates, setTemplates] = useState([])
  const [templateWorkout, setTemplateWorkout] = useState()
  const [templateExercises, setTemplateExercises] = useState([])
  const [templateNameInput, setTemplateNameInput] = useState("")
  const [templateExerciseInput, setTemplateExerciseInput] = useState("")

  // const [workoutSelected, setWorkoutSelected] = useState(false)
  // const [workout, setWorkout] = useState({})
  console.log(templates)

    //clear out exercise after save, make inputs have id
  useEffect(() => {
    setTemplates(templateWorkout)
  }, [templateWorkout])

  // useEffect(() => {
  //   if (templates !== undefined) {
  //     setTemplates(JSON.parse(localStorage.getItem('templates')))
  // }
  // }, [])

  useEffect(() => {
    const templateData = localStorage.getItem('templates')
    if (templateData) {
      setTemplates(JSON.parse(templateData))
    }
  }, [])

  useEffect(() => {
      localStorage.setItem('templates', JSON.stringify(templates))
  })

  function handleTemplateNameInput(e) {
    setTemplateNameInput(e.target.value)
  } 

  function handleExerciseInput(e) {
    setTemplateExerciseInput(e.target.value)
  }

  function handleAddExercise() {
    const exerObj = {
      id: uuidv4(),
      name: templateExerciseInput
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
      history: {}
    }

    if (templates) {
      setTemplateWorkout([...templates, savedTemplate])
      setTemplateExercises([])
      setTemplateExerciseInput("")
      setTemplateNameInput("")
    } else {
      setTemplateWorkout([savedTemplate])
      setTemplateExercises([])
      setTemplateExerciseInput("")
      setTemplateNameInput("")
    }
  }

  // function handleWorkoutSelected(temp) {
  //   setWorkoutSelected(true)
  //   setWorkout(temp)
  // }



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

//   <BrowserRouter>
//   <Routes>
//     <Route path="/" element={pokeData && <DisplayPokemon originalPokeData={originalPokeData} handleSearchBox={handleSearchBox} handleType={handleType} handleWeakness={handleWeakness} pokeData={pokeData}/>} />
//     <Route path="/:id" element={pokeData && <DetailsPage pokeData={pokeData} originalPokeData={originalPokeData} handleReturnPokedex={handleReturnPokedex}/>} />
//   </Routes>
// </BrowserRouter>

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<TemplateCreator handleExerciseInput={handleExerciseInput} handleAddExercise={handleAddExercise} templateExercises={templateExercises} handleTemplateNameInput={handleTemplateNameInput} handleSave={handleSave} templates={templates} templateNameInput={templateNameInput} templateExerciseInput={templateExerciseInput}/>}/>
     <Route path="/:id" element={<DisplayWorkout templates={templates}/>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
