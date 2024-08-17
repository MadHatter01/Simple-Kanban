'use client'
import styles from "./page.module.css";
import { sampleData } from "./data";
import Column from "./components/Column";
import { useState } from "react";

export default function Home() {
  const [data, setData] = useState(sampleData)
  return (
    <main className={styles.main}>
      <p>Hello</p>
      <div className="board">
        {data.columnOrder.map((columnId) => {
          const column = data.columns[columnId];
          const _tasks = data.columns[columnId]['taskIds']

          const tasks = _tasks.map((id) => data.tasks[id])



          return <Column key={column.id} column={column} tasks={tasks} />
        })}
      </div>

    </main>

  )
}