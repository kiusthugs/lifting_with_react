import React from 'react'

export default function CompletedLifts({completed}) {
  return (
    completed.map((logged) => {
        return <li key={logged.id}>Set {logged.set}: {logged.reps} Reps @ {logged.weight} lbs</li>
    })
  )
}
