import React from 'react'
import {useParams} from 'react-router-dom'

export default function DisplayWorkout({templates}) {
    console.log(templates)
    const {id} = useParams()

    const workout = templates.find(el => el.id === id)
    console.log(workout)

    //work on display workout inputs
    //edit button?
  return (
    <div>DisplayWorkout</div>
  )
}
