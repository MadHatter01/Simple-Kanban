'use client';

import React from 'react';
import { Task } from './Task';

import dynamic from 'next/dynamic';


const Droppable = dynamic(
    () =>
      import('react-beautiful-dnd').then((mod) => mod.Droppable),
    { ssr: false }
  );

  const Draggable = dynamic(
    () =>
      import('react-beautiful-dnd').then((mod) => mod.Draggable),
    { ssr: false }
  );


const Column = ({ column, tasks, handleDelete }) => {
    
  return (
    <div className="column">
  <h2>{column.title}</h2>

      <Droppable droppableId={column.id}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="task-list"
          >
            {tasks.map((task, index) => (
              task&&(
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided) => (
                  <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    className="task"
                  >
                    {task.content}
                    <button className='deleteBtn' onClick={()=>handleDelete(task.id)}>x</button>
                  </div>
                )}
              </Draggable>)
            ))}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
