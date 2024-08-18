import React from 'react'
import { Draggable } from 'react-beautiful-dnd'


export const Task = ({ task, index }) => {
    return (

        <div className="task">
            {task.content}
        </div>
    )


}
