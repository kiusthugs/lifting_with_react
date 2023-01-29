import React from 'react'
import {Link} from 'react-router-dom'

export default function DisplayMasterData({templates}) {
  return (<>
    <div className="overview-header">
        <h1>Workout Overview</h1>
        <div class="overview-link"><Link to="/">Home</Link></div>
    </div>
    <div className="workout-overview">
    {templates.map((workout) => {
        return(<>{workout.history.length > 0 && <div key={workout.id} className="workout-overview-list">
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
        </div>}</>)
    })}
    </div>
    <div className="overview-footer">
    <Link to="/">Home</Link>
    </div>
    </>
  )
}
