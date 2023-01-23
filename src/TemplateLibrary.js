import React from 'react'
import {Link} from 'react-router-dom'
// import { v4 as uuidv4 } from 'uuid';

export default function TemplateLibrary({templates, handleWorkoutSelected}) {
    
    return(
        templates.map((temp) => {
            return (
            <Link key={temp.id} to={`${temp.id}`}>
            <div>
                <h2>{temp.name}</h2>
                <ul>
                    {temp.exercises.map((exer) => <li key={exer.id}>{exer.name}</li>)}
                </ul>
            </div>
            </Link>
            )
        })
    )
}
