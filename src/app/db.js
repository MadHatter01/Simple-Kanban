import Dexie from "dexie";

const db = new Dexie('simple-kanban');

db.version(1).stores({
    tasks: '++id, content, columnId'
});


const addTask = async (task) =>{
    try{
        await db.tasks.add(task);
    }
    catch(error){
        console.error('Failed', error)
    }
}

addTask({content:'File application', columnId:'column-1'})

db.open().catch((error)=>{
    console.error("Failed to open database", error);
});

export default db;