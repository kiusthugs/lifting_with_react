import React from 'react'

export default function CompletedLifts({completed, handleEditSet, exercises, template}) {

  return (
    completed.map((logged) => {
        return (<li key={logged.id}>Set {logged.set}: {logged.reps} Reps @ {logged.weight} lbs <button onClick={() => handleEditSet(logged.id, exercises, template)}>Edit</button> </li>)
    })
  )
}
