'use client'

import styles from "./page.module.css";
// import { sampleData } from "./data";
import Column from "./components/Column";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import db from "./db";


const DragDropContext = dynamic(
  () =>
    import('react-beautiful-dnd').then((mod) => mod.DragDropContext),
  { ssr: false }
);

export default function Home() {
  const [dropped, setDropped] = useState(false);

  // const [data, setData] = useState(sampleData);
  const [data, setData] = useState({
    tasks: {},
    columns: {
      'column-1': {
        id: 'column-1',
        title: 'To Do',
        taskIds: []
      },
      'column-2': {
        id: 'column-2',
        title: 'In Progress',
        taskIds: []
      },
      'column-3': {
        id: 'column-3',
        title: 'Done',
        taskIds: []
      },
      'column-4': {
        id: 'column-4',
        title: 'Blocked',
        taskIds: []
      }
    },
    columnOrder: ['column-1', 'column-2', 'column-3', 'column-4'],
  });
  const [newTaskContent, setNewTaskContent] = useState("")


  useEffect(() => {

    const fetchTasksFromDB = async () => {
      try {
        const allTasks = await db.tasks.toArray();
        const tasksMap = {};
        const taskColumns = { ...data.columns };
        Object.keys(taskColumns).forEach(columnId => {
          if (!taskColumns[columnId].taskIds) {
          taskColumns[columnId].taskIds = [];
          }
        });

        allTasks.forEach((task) => {
          tasksMap[task.id] = task;
          if (taskColumns[task.columnId] && !taskColumns[task.columnId].taskIds.includes(task.id)) {
            taskColumns[task.columnId].taskIds.push(task.id);
          }
        });

        setData(prevData => ({
          ...prevData,
          tasks: tasksMap,
          columns: taskColumns,
        }))
      } catch (error) {
        console.error(error);
      }

    }
    fetchTasksFromDB();
  }, []);


  const handleOnKey = async (event) => {

    if (event.key === 'Enter' || event.keyCode === 13) {

      const newTaskId = `task-${Object.keys(data.tasks).length + 1}`;
      const newTask = { id: newTaskId, content: newTaskContent, columnId: 'column-1' }

      const newCol = {
        ...data.columns['column-1'],
        taskIds: [...data.columns['column-1'].taskIds, newTaskId]
      }

      await db.tasks.add(newTask);
      setData((prevData) => ({
        ...prevData,
        tasks: {
          ...prevData.tasks,
          [newTaskId]: newTask  
        },
        columns: {
          ...prevData.columns,
          ['column-1']: newCol 
        }
      }));

      setNewTaskContent('')
    }
  }

  const onDragEnd = async (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;

    setDropped(true);

    const cols = data['columns']
    const startCol = cols[source.droppableId];
    const endCol = cols[destination.droppableId];
    if (!startCol || !endCol) return;
    const _t = data.tasks[draggableId];

    if (startCol === endCol) {
      const _newtasks = Array.from(startCol.taskIds);
      _newtasks.splice(source.index, 1); //remove it
      _newtasks.splice(destination.index, 0, draggableId); //add it 

      const newCol = {
        ...startCol,
        taskIds: _newtasks,
      }

      setData((prevData) => ({
        ...prevData,
        columns: {
          ...prevData.columns,
          [newCol.id]: newCol,
        },
      }));
    }
    else {
      const _startTasks = Array.from(startCol.taskIds);
      const _endTasks = Array.from(endCol.taskIds);
      _startTasks.splice(source.index, 1)
      _endTasks.splice(destination.index, 0, draggableId);


      const _newStartCol = {
        ...startCol,
        taskIds: _startTasks
      }

      const _newEndCol = {
        ...endCol,
        taskIds: _endTasks
      }

      const updatedTask = {
        ...data.tasks[draggableId],
        columnId: endCol.id, 
      };
      setData((prevData) => ({
        ...prevData,
        tasks: {
          ...prevData.tasks,
          [draggableId]: updatedTask, // Update the task with the new columnId
        },
        columns: {
          ...prevData.columns,
          [_newStartCol.id]: _newStartCol,
          [_newEndCol.id]: _newEndCol,
        },
      }));

      try {
        await db.tasks.put(updatedTask); 
      } catch (error) {
        console.error("Error updating task:", error);
      }
    }

    setTimeout(() => {
      setDropped(false);
    }, 500);
  }

  const handleDelete = async (id) => {

    const newTasks = { ...data.tasks };
    delete newTasks[id];

    const newColumns = {
      ...data.columns
    }

    Object.keys(newColumns).forEach(cid => {
      newColumns[cid].taskIds = newColumns[cid].taskIds.filter(tid => tid != id)
    })
    await db.tasks.delete(id);

    setData({
      ...data,
      tasks: newTasks,
      columns: newColumns,
    })
  }

  return (
    <main className={styles.main}>
      <div>
        <label htmlFor="taskName">Task</label>
        <input type="text" className='taskName' name="taskName" id="taskName" placeholder="Write a report.." value={newTaskContent} onChange={(e) => setNewTaskContent(e.target.value)} onKeyUp={handleOnKey} /></div>
      <DragDropContext onDragEnd={onDragEnd}>


        <div className="board" >

          {data.columns && data.columnOrder.length > 0 && (<>
            {data.columnOrder.map((columnId) => {
              const column = data.columns[columnId];
              const _tasks = data.columns[columnId]['taskIds']

              const tasks = _tasks.map((id) => data.tasks[id])



              return <Column key={column.id} column={column} dropped={dropped} tasks={tasks} handleDelete={handleDelete} />
            })}
          </>)}


        </div>
      </DragDropContext>

    </main>

  )
}