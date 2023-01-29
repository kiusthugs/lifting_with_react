import React from 'react'
import {Link} from 'react-router-dom'
// import { v4 as uuidv4 } from 'uuid';

export default function TemplateLibrary({templates, handleDeleteTemplate}) {
    
    return(<>
    <h2>Workout Library</h2>
    <div className="template-library">
        {templates.map((temp) => {
            return (
            <div key={temp.id} className="template">
            <button onClick={() => handleDeleteTemplate(temp.id)} className="template-delete">x</button>
            <Link to={`${temp.id}`}>
            <div>
                <h2>{temp.name}</h2>
                <ul>
                    {temp.exercises.map((exer) => <li key={exer.id}>{exer.name}</li>)}
                </ul>
            </div>
            </Link>
            </div>
            )
        })}
    </div>
    </>
    )
}
