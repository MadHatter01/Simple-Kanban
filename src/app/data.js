
export const sampleData = {
    tasks:{
        'task-1':{id:'task-1', content:'Do laundry'},
        'task-2':{id:'task-2', content:'Do Dishes'},
        'task-3':{id:'task-3', content:'Do Cleaning'},

    },
    columns:{
        'column-1':{
            id:'col-1',
            title:'To Do',
            taskIds:['task-1','task-2','task-3']
        },
        'column-2':{
            id:'col-2',
            title:'In Progress',
            taskIds:[]
        },
        'column-3':{
            id:'col-3',
            title:'Done',
            taskIds:[]
        },
        'column-4':{
            id:'col-4',
            title:'Blocked',
            taskIds:[]
        }
    },
    columnOrder: ['column-1', 'column-2', 'column-3', 'column-4']
}