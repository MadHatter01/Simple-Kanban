import React from 'react'
import { Draggable } from 'react-beautiful-dnd'

export const Task = ({task}) => {
    console.log('first'+task)
  return (
    <div className="task">
      {task.content}
    </div>
  )
}
