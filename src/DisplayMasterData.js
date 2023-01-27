import React from 'react'
import {Link} from 'react-router-dom'

export default function DisplayMasterData({templates}) {
  return (
    <>
    {templates.map((workout) => {
        return(
        <div key={workout.id}>
            <h2>{workout.name}</h2>
        <ol>
            {workout.history.map((data) => {
                return(
                <div key={data.id}>
                    <h4>{data.name}</h4>
                    {data.completed.map((el) => {
                        return(<li key={el.id}>{el.reps} Reps @ {el.weight}</li>)
                    })}
                </div>
                )
            })}
        </ol>
        </div>)
    })}
    <Link to="/">Home</Link>
    </>
  )
}
