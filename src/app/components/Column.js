'use client'

import React from 'react'
import { Task } from './Task'

const Column = ({ tasks }) => {

  return (
    <div>
      {tasks.map((task, index) => (
        <Task key={task.id} task={task} index={index} />
      ))}
    </div>
  )
}

export default Column
