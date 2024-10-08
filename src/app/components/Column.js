'use client';

import React from 'react';

import dynamic from 'next/dynamic';
import {motion} from "framer-motion";


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
  <h2 className='column-title'>{column.title}</h2>

      <Droppable droppableId={column.id}>
        {(provided) => (
          <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{scale:1, opacity:1}}
          transition={{ duration: 1 }}
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
                    className={`task ${task.columnId === 'column-3'? 'done': ''} ${task.columnId==='column-4'? 'blocked': ''}`}
                  
                  >
                         
                    {task.content}
                    <button className='delete-btn' onClick={()=>handleDelete(task.id)}>x</button>
                  </div>
                )}
              </Draggable>)
            ))}
             {provided.placeholder}
          </motion.div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
