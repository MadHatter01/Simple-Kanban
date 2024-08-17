'use client'
import styles from "./page.module.css";
import { sampleData } from "./data";
import Column from "./components/Column";
import { useState } from "react";

export default function Home() {
const [data,setData] = useState(Object.values(sampleData.tasks))
  return (
    <main className={styles.main}>
      <p>Hello</p>
      <Column tasks={data} />
    </main>

  )
}