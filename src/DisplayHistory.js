import React from 'react'

export default function DisplayHistory({template}) {
    console.log(template)
  return (
    <div className="history">
    <h3>History</h3>
    {template.history.map((hist) => {
        return (<div key={hist.id}>
            <h5>{hist.name}</h5>
            <ol>
            {hist.completed.map((el) => {
                return <li key={el.id}>{el.reps} x {el.weight}lbs</li>
            })}
            </ol>
        </div>)
    })}
    </div>
  )
}
