import {useState} from 'react';

import {taskListContext} from './context';

export interface Tasks {
    Tasks: string[];
}

export default function displayTasks(){
    const[taskList] = useState<Tasks>({
        Tasks: []
    });

    <taskListContext.Provider value={taskList}>

    </taskListContext.Provider>
}