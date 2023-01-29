import React from 'react'

export default function CompletedLifts({completed, handleEditSet, exercises, template, handleDeleteSet}) {

  return (
    completed.map((logged) => {
        return (<li key={logged.id}>Set {logged.set}: {logged.reps} Reps @ {logged.weight} lbs <button onClick={() => handleEditSet(logged.id, exercises, template)}>Edit</button> <button onClick={() => handleDeleteSet(logged.id, exercises, template)} className="delete-set">X</button> </li>)
    })
  )
}
