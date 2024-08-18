'use client'
import styles from "./page.module.css";
import { sampleData } from "./data";
import Column from "./components/Column";
import { useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import dynamic from "next/dynamic";


const DragDropContext = dynamic(
  () =>
    import('react-beautiful-dnd').then((mod) => mod.DragDropContext),
  { ssr: false }
);

export default function Home() {
  const [data, setData] = useState(sampleData);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    const cols = data['columns']
    const startCol = cols[source.droppableId];
    const endCol = cols[destination.droppableId];

    const _t = data.tasks[draggableId];
    console.log(startCol, endCol, _t) // test

    if (startCol === endCol) {
      const _newtasks = Array.from(startCol.taskIds);
      _newtasks.splice(source.index, 1); //remove it
      _newtasks.splice(destination.index, 0, draggableId); //add it 

      const _newCol = {
        ...startCol,
        taskIds: _newtasks,
      }

      const _newState = {
        ...data,
        columns: {
          ...data.columns,
          [_newCol.id]: _newCol,
        }
      };
      setData(_newState);
      return
    }
  }
  return (
    <main className={styles.main}>

      <DragDropContext onDragEnd={onDragEnd}>

        <div className="board" >
          {data.columnOrder.map((columnId) => {
            const column = data.columns[columnId];
            const _tasks = data.columns[columnId]['taskIds']

            const tasks = _tasks.map((id) => data.tasks[id])



            return <Column key={column.id} column={column} tasks={tasks} />
          })}

        </div>
      </DragDropContext>

    </main>

  )
}