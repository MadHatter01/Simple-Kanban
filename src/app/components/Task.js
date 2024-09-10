import React from 'react'


export const Task = ({ task, index }) => {
   
    return (
      
        <div className="task" key={index} >
            {task.content}
        </div>
    )


}
